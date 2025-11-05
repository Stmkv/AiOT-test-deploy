import httpx

from core.exceptions import (
    KeycloakConflictError,
    KeycloakForbiddenError,
    KeycloakNotFoundError,
    KeycloakServerError,
    KeycloakUnauthorizedError,
)


class KeycloakHTTPClient:
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip("/")

    async def _request(self, method: str, url: str, **kwargs):
        try:
            async with httpx.AsyncClient(timeout=10) as client:
                resp = await client.request(method, f"{self.base_url}{url}", **kwargs)
            return self._handle_response(resp)

        except httpx.ReadTimeout:
            raise KeycloakServerError("Keycloak не ответил вовремя (timeout)")
        except httpx.ConnectError:
            raise KeycloakServerError("Не удалось подключиться к Keycloak")
        except httpx.HTTPError as e:
            raise KeycloakServerError(f"Ошибка соединения с Keycloak: {e}")

    async def post(self, url: str, **kwargs):
        return await self._request("POST", url, **kwargs)

    async def get(self, url: str, **kwargs):
        return await self._request("GET", url, **kwargs)

    async def put(self, url: str, **kwargs):
        return await self._request("PUT", url, **kwargs)

    def _handle_response(self, resp: httpx.Response):
        if 200 <= resp.status_code < 300:
            if not resp.text:
                return None
            try:
                return resp.json()
            except Exception:
                return resp.text

        status = resp.status_code
        text = resp.text or resp.reason_phrase
        if status == 401:
            raise KeycloakUnauthorizedError("Неверно введен логин или пароль")
        elif status == 403:
            raise KeycloakForbiddenError("Недостаточно прав")
        elif status == 404:
            raise KeycloakNotFoundError("Ресурс не найден")
        elif status == 409:
            raise KeycloakConflictError("Пользователь с таким логином уже существует")
        elif status >= 500:
            raise KeycloakServerError(f"Ошибка Keycloak {status}: {text}")
        else:
            raise KeycloakServerError(f"Неизвестная ошибка Keycloak ({status}): {text}")
