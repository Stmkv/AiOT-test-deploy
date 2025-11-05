from .keycloak_client import KeycloakHTTPClient


class KeycloakUserRepository:
    def __init__(self, client: KeycloakHTTPClient, realm: str):
        self.client = client
        self.realm = realm

    async def get_profile(self, token: str):
        headers = {"Authorization": f"Bearer {token}"}
        resp = await self.client.get(f"/realms/{self.realm}/protocol/openid-connect/userinfo", headers=headers)
        return resp
