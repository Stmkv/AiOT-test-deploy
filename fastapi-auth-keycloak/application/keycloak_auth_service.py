from schemas.auth import InterspectResponse
from infrastructure.keycloak_auth_repository import KeycloakAuthRepository
from schemas.auth import LoginResponse, RefreshResponse


class KeycloakAuthService:
    def __init__(self, repo: KeycloakAuthRepository):
        self.repo = repo

    async def login(self, username: str, password: str) -> LoginResponse:
        return await self.repo.login(username, password)

    async def refresh_token(self, refresh_token: str) -> RefreshResponse:
        return await self.repo.refresh(refresh_token)

    async def logout(self, refresh_token: str):
        await self.repo.revoke(refresh_token)
        return {"message": "Logged out"}

    async def check_token(self, token: str) -> InterspectResponse:
        resp = await self.repo.introspect(token)
        return resp
