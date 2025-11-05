from typing import Any
from .keycloak_client import KeycloakHTTPClient
from schemas.auth import (
    LoginResponse,
    RefreshResponse,
    InterspectResponse,
)


class KeycloakAuthRepository:
    def __init__(
        self, client: KeycloakHTTPClient, realm: str, client_id: str, client_secret: str
    ):
        self.client = client
        self.realm = realm
        self.client_id = client_id
        self.client_secret = client_secret

    async def login(self, username: str, password: str) -> LoginResponse:
        data = {
            "grant_type": "password",
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "username": username,
            "password": password,
        }
        resp = await self.client.post(
            f"/realms/{self.realm}/protocol/openid-connect/token", data=data
        )
        return LoginResponse.model_validate(resp)

    async def refresh(self, refresh_token: str) -> RefreshResponse:
        data = {
            "grant_type": "refresh_token",
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "refresh_token": refresh_token,
        }
        resp = await self.client.post(
            f"/realms/{self.realm}/protocol/openid-connect/token", data=data
        )
        return RefreshResponse.model_validate(resp)

    async def revoke(self, refresh_token: str):
        data = {
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "token": refresh_token,
        }
        await self.client.post(
            f"/realms/{self.realm}/protocol/openid-connect/revoke", data=data
        )

    async def introspect(self, token: str) -> InterspectResponse:
        data = {
            "token": token,
            "client_id": self.client_id,
            "client_secret": self.client_secret,
        }
        resp = await self.client.post(
            f"/realms/{self.realm}/protocol/openid-connect/token/introspect",
            data=data,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
        return InterspectResponse.model_validate(resp)
