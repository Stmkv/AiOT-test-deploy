from fastapi import FastAPI

from api.v1.routers.auth import router as auth_router

app = FastAPI(title="Auth Service")

app.include_router(auth_router)
