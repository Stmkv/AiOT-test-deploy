from infrastructure.keycloak_user_repository import KeycloakUserRepository


class KeycloakUserService:
    def __init__(self, repo: KeycloakUserRepository):
        self.repo = repo

    async def get_profile(self, token: str):
        return await self.repo.get_profile(token)
