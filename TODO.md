# TODO

## Preparation

- [x] Figure out req (11-07-2025 @arickcodeguy)
- [x] Prepare for development (01-08-2025 @arickcodeguy)
  - [x] Backend (18-07-2025 @arickcodeguy)
    - [x] Get it to run (11-07-2025 @arickcodeguy)
    - [x] Connect to db (18-07-2025 @arickcodeguy)
    - [x] Write mock for first api. `GET` `api/v1/user/scetches` (18-07-2025 @arickcodeguy)
  - [x] Uikit (27-07-2025 @arickcodeguy)
    - [x] Add button (11-07-2025 @arickcodeguy)
    - [x] Storybook (11-07-2025 @arickcodeguy)
    - [x] Testing. Playwright (22-07.2025 @arickcodeguy)
    - [x] Build package (11-07-2025 @arickcodeguy)
    - [x] Export types, component props (11-07-2025 @arickcodeguy)
    - [x] Import to frontend (11-07-2025 @arickcodeguy)
    - [x] Import icon pack (27-07-2025 @arickcodeguy)
  - [x] Frontend (01-08-2025 @arickcodeguy)
    - [x] Set up router (30-07-2025 @arickcodeguy)
    - [x] Main page (01-08-2025 @arickcodeguy)
      - [x] Default classes. `row`, `col`, `container` styles (19-07-2025 @arickcodeguy)
      - [x] Card component (27-07-2025 @arickcodeguy)
      - [x] Call `GET` scetches. (27-07-2025 @arickcodeguy)
      - [x] Display scetches in row of `KCards`. (30-07-2025 @arickcodeguy)
    - [x] Scetch page (01-08-2025 @arickcodeguy)
      - [x] Draw empty canvas (01-08-2025 @arickcodeguy)

## First iteration

- [ ] Vitest integration testing
- [ ] Fix ui icon build
- [ ] Storybook themes
- [ ] Footer, Header
- [ ] Front
  - [ ] Draw rooler background
  - [ ] Mousetouch, mousemove event listeners to change position
  - [ ] Define basic shapes
  - [ ] Define shapes layout. Shapes draw priority
  - [ ] Keybinds
  - [ ] Sidebar
    - [ ] Base layout. May be some new components
    - [ ] Hand. Move on canvas
    - [ ] Figures list
    - [ ] Current chosen figure info
      - [ ] Figure styles.
- [ ] Backend
  - [ ] Swagger on backend
  - [ ] Auth
    - [ ] Choose solution
    - [ ] API
      - [ ] Create user
      - [ ] Delete user
      - [ ] Change password
    - [ ] Now serve scetches for created user
  - [ ] Set up MinIO
    - [ ] Connect
    - [ ] Schema
    - [ ] Controller
    - [ ] Upload content
    - [ ] Retrieve content
  - [ ] Save scetches content
  - [ ] Serve scetches content

### Postpone

- [ ] Look for other repos using Spring boot and fix possible architecture mistakes
- [ ] Use env params to connect to db
- [ ] uikit. Testing. Jest
