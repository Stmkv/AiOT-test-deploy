from fastapi import APIRouter, Depends, HTTPException

from application.keycloak_admin_service import KeycloakAdminService
from application.keycloak_auth_service import KeycloakAuthService
from core.dependencies import get_keycloak_admin_service, get_keycloak_auth_service
from core.exceptions import (
    KeycloakConflictError,
    KeycloakNotFoundError,
    KeycloakServerError,
    KeycloakUnauthorizedError,
)
from schemas.auth import (
    AccessRequest,
    LoginRequest,
    RefreshRequest,
    RegisterRequest,
    RegisterResponse,
    ResetPasswordRequest,
    LoginResponse,
    RefreshResponse,
    InterspectResponse,
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post(
    "/login",
    response_model=LoginResponse,
)
async def login(
    data: LoginRequest,
    service: KeycloakAuthService = Depends(get_keycloak_auth_service),
) -> LoginResponse:
    try:
        return await service.login(data.username, data.password)
    except KeycloakUnauthorizedError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post(
    "/refresh",
    response_model=RefreshResponse,
)
async def refresh(
    data: RefreshRequest,
    service: KeycloakAuthService = Depends(get_keycloak_auth_service),
) -> RefreshResponse:
    try:
        return await service.refresh_token(data.refresh_token)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/logout")
async def logout(
    data: RefreshRequest,
    service: KeycloakAuthService = Depends(get_keycloak_auth_service),
):
    try:
        return await service.logout(data.refresh_token)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/register")
async def register(
    data: RegisterRequest,
    admin_service: KeycloakAdminService = Depends(get_keycloak_admin_service),
) -> RegisterResponse:
    try:
        return await admin_service.register_user(
            user_register_request=data,
        )
    except KeycloakConflictError as e:
        raise HTTPException(status_code=409, detail=str(e))
    except KeycloakServerError as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/reset-password")
async def reset_password(
    data: ResetPasswordRequest,
    admin_service: KeycloakAdminService = Depends(get_keycloak_admin_service),
):
    try:
        return await admin_service.send_password_reset(data.email)
    except KeycloakNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/introspect")
async def check_token(
    data: AccessRequest,
    admin_service: KeycloakAuthService = Depends(get_keycloak_auth_service),
) -> InterspectResponse:
    try:
        return await admin_service.check_token(data.access_token)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
