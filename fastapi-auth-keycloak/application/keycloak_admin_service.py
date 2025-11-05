from core.exceptions import KeycloakConflictError, KeycloakNotFoundError
from infrastructure.keycloak_admin_repository import KeycloakAdminRepository
from schemas.auth import RegisterRequest, RegisterResponse


class KeycloakAdminService:
    def __init__(
        self, repo: KeycloakAdminRepository, admin_username: str, admin_password: str
    ):
        self.repo = repo
        self.admin_username = admin_username
        self.admin_password = admin_password

    async def register_user(self, user_register_request: RegisterRequest):
        token = await self.repo.get_admin_token(
            self.admin_username, self.admin_password
        )
        user = await self.repo.get_user_by_email(token, user_register_request.email)
        if user:
            raise KeycloakConflictError(
                "Пользователь с такой почтой уже зарегистрирован"
            )

        payload = {
            "username": user_register_request.username,
            "email": user_register_request.email,
            "firstName": user_register_request.first_name,
            "lastName": user_register_request.last_name,
            "enabled": True,
            "emailVerified": False,
            "attributes": {
                "middleName": user_register_request.middle_name,
            },
            "credentials": [
                {
                    "type": "password",
                    "value": user_register_request.password,
                    "temporary": False,
                }
            ],
        }
        await self.repo.create_user(token, payload)
        user = await self.repo.get_user_by_email(
            token,
            user_register_request.email,
        )
        if user:
            await self.repo.send_verify_email(token, user["id"])
        return RegisterResponse(success=True)

    async def send_password_reset(self, email: str):
        token = await self.repo.get_admin_token(
            self.admin_username, self.admin_password
        )
        user = await self.repo.get_user_by_email(token, email)
        if not user:
            raise KeycloakNotFoundError("Пользователь с таким email не зарегистрирован")
        await self.repo.send_reset_password(token, user["id"])
        return {"message": "Password reset email sent."}
