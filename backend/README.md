# Figma Clone Backend

Java + Spring Boot

## Deps

- Spring Boot
- Maven
- Postgresql
- Swagger

## Functional Requirements

- JWT for authorization
- Store sketches as strings of JSON sent from frontend. Frontend will validate that.

## Run

1. Copy `.env.example` to `.env` and fill in the database and `JWT_SECRET`
2. Run from `./backend` (`.env` is read from the working directory): `./mvnw spring-boot:run`

Environment variables with the same names override `.env`.
