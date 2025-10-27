# Figma clone

Fullstack application. Figma clone.

## Frontend

React, local ui lib  
[frontend](/frontend/) in here  
[uikit](/uikit/) in here

## Backend

Java, Spring boot  
[/backend](/backend/)

### DB

- Postgresql. Store general info
- MinIO. Object store for handling images and user scetches

## API

- Get list of available scetches. `GET` `/api/v1/scetches`
- Get scetch. `GET` `/api/v1/scetch/{id}`.
- Save scetch. `PUT` `/api/v1/scetch/{id}`. `body: change[]`. Figure out how we should update file. Probably don't update whole file on each update.
- Delete scetch. `DELETE` `/api/v1/scetch/{id}`
- Change visibility `POST` `/api/v1/scetch/change-visibility/{id}` `body: { visibility: 'type' }`
- Sign in.

## Other

- Let's say 10 editors per file max.
- Unlimited viewers per file.
- 100k concurrent viewers\editors.
- No scaling. Don't care.
