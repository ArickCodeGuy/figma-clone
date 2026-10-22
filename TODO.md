# TODO

## Preparation

- [x] Figure out req (11-07-2025 @arickcodeguy)
- [x] Prepare for development (01-08-2025 @arickcodeguy)
  - [x] Backend (18-07-2025 @arickcodeguy)
    - [x] Get it to run (11-07-2025 @arickcodeguy)
    - [x] Connect to db (18-07-2025 @arickcodeguy)
    - [x] Write mock for first api. `GET` `api/v1/user/sketches` (18-07-2025 @arickcodeguy)
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
      - [x] Call `GET` sketches. (27-07-2025 @arickcodeguy)
      - [x] Display sketches in row of `KCards`. (30-07-2025 @arickcodeguy)
    - [x] Sketch page (01-08-2025 @arickcodeguy)
      - [x] Draw empty canvas (01-08-2025 @arickcodeguy)

## First Iteration

- [x] uikit
  - [x] Fix ui icon build (10-02-2026 @arickcodeguy)
  - [x] Storybook themes (10-3-2026 @arickcodeguy)
  - [x] KModal (27-09-2025 @arickcodeguy)
  - [x] KInput (27-09-2025 @arickcodeguy)
  - [x] KSceleton (27-09-2025 @arickcodeguy)
  - [x] KAccordion (25-12-2025 @arickcodeguy)
  - [x] KTitle (25-12-2025 @arickcodeguy)
  - [x] KList (03-12-2025 @arickcodeguy)
  - [x] Fix KTitle. Add margin-bottom (10-02-2026 @arickcodeguy)
  - [x] Fix Accordion. `useState` error (10-02-2026 @arickcodeguy)
  - [x] KSelect (12-10-2026 @arickcodeguy)
  - [x] KCheckbox (12-10-2026 @arickcodeguy)
- [x] Footer, Header (30-10-2025 @arickcodeguy)
- [ ] Front
  - [x] Define basic shapes (20-11-2025 @arickcodeguy)
  - [x] Define shapes layout. Shapes draw priority (20-11-2025 @arickcodeguy)
  - [x] Left sidebar
    - [x] Hand. Move (18-02-2026 @arickcodeguy)
    - [x] Zoom (25-02-2026 @arickcodeguy)
    - [x] Cursor. Choose. Move figure (12-10-2026 @arickcodeguy)
    - [x] Create figures
      - [x] Line (12-10-2026 @arickcodeguy)
      - [x] Circle (18-02-2026 @arickcodeguy)
      - [x] Rectangle (19-02-2026 @arickcodeguy)
    - [x] Keybinds (18-02-2026 @arickcodeguy)
    - [x] Edit figures
      - [x] Line (13-10-2026 @arickcodeguy)
      - [x] Circle (13-10-2026 @arickcodeguy)
      - [x] Rectangle (13-10-2026 @arickcodeguy)
  - [x] Modals
    - [x] Redux state for modal (17-10-2026 @arickcodeguy)
    - [x] Auth modal. Send auth, login requests (17-10-2026 @arickcodeguy)
    - [x] Sketch heading edit or create modal (17-10-2026 @arickcodeguy)
    - [x] After login or if logged in - fetch sketches (19-10-2026 @arickcodeguy)
    - [x] Create sketches locally (19-10-2026 @arickcodeguy)
    - [x] Create sketches on backend (19-10-2026 @arickcodeguy)
  - [x] Save sketch state as string (14-10-2026 @arickcodeguy)
  - [x] Layout class for storing and updating state (18-02-2026 @arickcodeguy)
- [x] Backend
  - [x] Swagger on backend (10-08-2025 @arickcodeguy)
  - [x] Sketch content API (16-10-2026 @arickcodeguy)
  - [x] Auth with JWT (16-10-2026 @arickcodeguy)
  - [x] Fetch list of sketches (16-10-2026 @arickcodeguy)
  - [x] Fetch content of exact sketch (16-10-2026 @arickcodeguy)
  - [x] Generate .d.ts files for API (16-10-2026 @arickcodeguy)

## Second Iteration

- [ ] `KInputColor`
- [ ] `KInputFile`
- [ ] `KAlert`
- [ ] Add actions to `Sketch` component
  - [ ] Edit
  - [ ] Delete
- [ ] Layout
  - [ ] Display Sketch layout
  - [ ] Hide and show `Shape`
  - [ ] Drag and Drop for `Shape` in layout
- [x] Use env params to connect to db (22-10-2026 @arickcodeguy)

### Postpone

- Frontend
  - [ ] uikit. Testing. Jest
  - [ ] Vitest integration testing
