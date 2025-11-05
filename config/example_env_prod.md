# PostgreSQL

| Name                  | Properties         | Description                                |
| --------------------- | ------------------ | ------------------------------------------ |
| `POSTGRES_DB`       | **Required** | Имя базы данных               |
| `POSTGRES_USER`     | **Required** | Имя пользователя            |
| `POSTGRES_PASSWORD` | **Required** | Пароль для подключения |

# Keycloak

| Name                        | Properties         | Description                                                                      |
| --------------------------- | ------------------ | -------------------------------------------------------------------------------- |
| `KEYCLOAK_ADMIN`          | **Required** | Логин админа                                                          |
| `KEYCLOAK_ADMIN_PASSWORD` | **Required** | Пароль админа                                                        |
| `KC_DB`                   | **Required** | База данных, к которой подключается keycloak       |
| `KC_DB_URL`               | **Required** | URL БД, к которой подключается keycloak                    |
| `KC_DB_USERNAME`          | **Required** | Имя БД, к которой подключается keycloak                 |
| `KC_DB_PASSWORD`          | **Required** | Пароль БД, к которой подключается keycloak           |
| `KC_DB_SCHEMA`            | **Required** | Имя схемы БД, в которой keycloak создаст модели |

# Auth-service

| Name                        | Properties         | Description                                        |
| --------------------------- | ------------------ | -------------------------------------------------- |
| `KEYCLOAK_URL`            | **Required** | Адрес keycloak                                |
| `KEYCLOAK_REALM`          | **Required** | Используемый realm                     |
| `KEYCLOAK_CLIENT_ID`      | **Required** | client id                                          |
| `KEYCLOAK_CLIENT_SECRET`  | **Required** | client secret                                      |
| `KEYCLOAK_ADMIN_USERNAME` | **Required** | Имя администратора keycloak       |
| `KEYCLOAK_ADMIN_PASSWORD` | **Required** | Пароль администратора keycloak |
| `EMAIL__SMTP_PASSWORD`    | **Required** | пароль smtp сервера                   |
