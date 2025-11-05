from pydantic import BaseModel, Field


class TokenResponse(BaseModel):
    access_token: str
    expires_in: int
    refresh_expires_in: int
    refresh_token: str
    token_type: str
    not_before_policy: int = Field(alias="not-before-policy")
    session_state: str
    scope: str


class TokenResponseAccount(BaseModel):
    roles: list[str] | None = []


class TokenResponseRealmAccess(BaseModel):
    roles: list[str] | None = []


class TokenResponseResourceAccess(BaseModel):
    account: TokenResponseAccount | None = None


class TokenIntrospection(BaseModel):
    active: bool
    exp: int | None = None
    iat: int | None = None
    jti: str | None = None
    iss: str | None = None
    aud: str | None = None
    sub: str | None = None
    typ: str | None = None
    azp: str | None = None
    sid: str | None = None
    acr: str | None = None
    realm_access: TokenResponseRealmAccess | None = None
    resource_access: TokenResponseResourceAccess | None = None
    scope: str | None = None
    email_verified: bool | None = None
    name: str | None = None
    preferred_username: str | None = None
    middle_name: str | None = None
    given_name: str | None = None
    family_name: str | None = None
    email: str | None = None
    client_id: str | None = None
    username: str | None = None
    token_type: str | None = None
