from pydantic import BaseModel, EmailStr

from schemas.token import TokenResponse, TokenIntrospection


class BaseRequest(BaseModel): ...


class LoginRequest(BaseRequest):
    username: str
    password: str


class RefreshRequest(BaseRequest):
    refresh_token: str


class AccessRequest(BaseRequest):
    access_token: str


class RegisterRequest(BaseRequest):
    first_name: str
    last_name: str
    middle_name: str
    username: str
    email: EmailStr
    password: str
    password_confirm: str


class ResetPasswordRequest(BaseRequest):
    email: EmailStr


class BaseResponse(BaseModel):
    success: bool


class RegisterResponse(BaseResponse): ...


class LoginResponse(TokenResponse): ...


class RefreshResponse(TokenResponse): ...


class InterspectResponse(TokenIntrospection): ...
