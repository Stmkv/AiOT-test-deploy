from .keycloak_client import KeycloakHTTPClient


class KeycloakAdminRepository:
    def __init__(self, client: KeycloakHTTPClient, realm: str):
        self.client = client
        self.realm = realm

    async def get_admin_token(self, username: str, password: str) -> str:
        """Получает токен администратора"""
        data = {
            "grant_type": "password",
            "client_id": "admin-cli",
            "username": username,
            "password": password,
        }
        resp = await self.client.post(
            "/realms/master/protocol/openid-connect/token", data=data
        )
        return resp["access_token"]

    async def create_user(self, token: str, user: dict):
        """Создает пользователя"""
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }
        await self.client.post(
            f"/admin/realms/{self.realm}/users", json=user, headers=headers
        )

    async def get_user_by_email(self, token: str, email: str):
        """Получает пользователя по email"""
        headers = {"Authorization": f"Bearer {token}"}
        resp = await self.client.get(
            f"/admin/realms/{self.realm}/users?email={email}", headers=headers
        )
        users = resp
        return users[0] if users else None

    async def send_verify_email(self, token: str, user_id: str):
        """Отправляет письмо на email для верификации"""
        headers = {"Authorization": f"Bearer {token}"}
        await self.client.put(
            f"/admin/realms/{self.realm}/users/{user_id}/send-verify-email",
            headers=headers,
        )

    async def send_reset_password(self, token: str, user_id: str):
        """Отправляет письмо на email для сброса пароля"""
        headers = {"Authorization": f"Bearer {token}"}
        await self.client.put(
            f"/admin/realms/{self.realm}/users/{user_id}/execute-actions-email",
            json=["UPDATE_PASSWORD"],
            headers=headers,
        )
