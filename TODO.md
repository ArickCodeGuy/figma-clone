# TODO

## Preparation

- [x] Figure out req (11-07-2025 @arickcodeguy)
- [ ] Prepare for development
  - [x] Backend (18-07-2025 @arickcodeguy)
    - [x] Get it to run (11-07-2025 @arickcodeguy)
    - [x] Connect to db (18-07-2025 @arickcodeguy)
    - [x] Write mock for first api. `GET` `api/v1/user/scetches` (18-07-2025 @arickcodeguy)
  - [x] Uikit
    - [x] Add button (11-07-2025 @arickcodeguy)
    - [x] Storybook (11-07-2025 @arickcodeguy)
    - [x] Testing. Playwright (22-07.2025 @arickcodeguy)
    - [x] Build package (11-07-2025 @arickcodeguy)
    - [x] Export types, component props (11-07-2025 @arickcodeguy)
    - [x] Import to frontend (11-07-2025 @arickcodeguy)
    - [x] Import icon pack (27-07-2025 @arickcodeguy)
  - [ ] Frontend
    - [x] Set up router (30-07-2025 @arickcodeguy)
    - [x] Main page
      - [x] Default classes. `row`, `col`, `container` styles (19-07-2025 @arickcodeguy)
      - [x] Card component (27-07-2025 @arickcodeguy)
      - [x] Call `GET` scetches. (27-07-2025 @arickcodeguy)
      - [x] Display scetches in row of `KCards`. (30-07-2025 @arickcodeguy)
    - [ ] Scetch page
      - [ ] Draw empty canvas

## First iteration

- [ ] Canvas
  - [ ] Mousetouch, mousemove event listeners to change position
  - [ ] Define basic objects
  - [ ] Define objects layout. Objects draw priority.
  - [ ] Sidebar
    - [ ] Hand. Move on canvas
    - [ ] Figures list
    - [ ] Current chosen figure info
      - [ ] Figure styles.
- [ ] Back
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
- [ ] Swagger on backend
- [ ] uikit. Testing. Jest
