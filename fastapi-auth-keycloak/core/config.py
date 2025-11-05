from pathlib import Path

from pydantic import ConfigDict
from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent.parent


class Email(BaseSettings):
    smtp_password: str


class Settings(BaseSettings):
    keycloak_url: str
    keycloak_realm: str
    keycloak_client_id: str
    keycloak_client_secret: str
    keycloak_admin_username: str
    keycloak_admin_password: str
    email: Email

    model_config = ConfigDict(
        env_file=str(BASE_DIR / ".env"),
        env_nested_delimiter="__",
        extra="ignore",
    )


settings = Settings()
