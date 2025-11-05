from application.keycloak_admin_service import KeycloakAdminService
from application.keycloak_auth_service import KeycloakAuthService
from application.keycloak_user_service import KeycloakUserService
from core.config import settings
from infrastructure.keycloak_admin_repository import KeycloakAdminRepository
from infrastructure.keycloak_auth_repository import KeycloakAuthRepository
from infrastructure.keycloak_client import KeycloakHTTPClient
from infrastructure.keycloak_user_repository import KeycloakUserRepository


def get_keycloak_admin_service():
    client = KeycloakHTTPClient(settings.keycloak_url)
    repo = KeycloakAdminRepository(client, settings.keycloak_realm)
    return KeycloakAdminService(
        repo, settings.keycloak_admin_username, settings.keycloak_admin_password
    )


def get_keycloak_auth_service():
    client = KeycloakHTTPClient(settings.keycloak_url)
    repo = KeycloakAuthRepository(
        client,
        settings.keycloak_realm,
        settings.keycloak_client_id,
        settings.keycloak_client_secret,
    )
    return KeycloakAuthService(repo)


def get_keycloak_user_service():
    client = KeycloakHTTPClient(settings.keycloak_url)
    repo = KeycloakUserRepository(client, settings.keycloak_realm)
    return KeycloakUserService(repo)
