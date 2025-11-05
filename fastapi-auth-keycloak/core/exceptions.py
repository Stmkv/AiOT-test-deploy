class KeycloakError(Exception):
    """Базовая ошибка Keycloak"""


class KeycloakConflictError(KeycloakError):
    """Пользователь уже существует"""


class KeycloakUnauthorizedError(KeycloakError):
    """Ошибка авторизации администратора"""


class KeycloakForbiddenError(KeycloakError):
    """Недостаточно прав"""


class KeycloakNotFoundError(KeycloakError):
    """Ресурс не найден"""


class KeycloakServerError(KeycloakError):
    """Ошибка на стороне Keycloak"""
