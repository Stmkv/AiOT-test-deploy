## Как запустить сервисы

1. Сбилдить и запустить образы

```
docker compose up --build
```

2. Зайти в админ панель Keycloak

- Realm settings-**Frontend URL** = [http://localhost:8080](%E2%80%B8http://localhost:8080) - изменить при деплое на сервер
- Realm settings-Email-Authentication - установить пароль для smtp сервера
