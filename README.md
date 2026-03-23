# Reactive Roots

---

## About

Reactive Roots is a browser-based re-creation of the woodcutting skill from my all-time favorite game Old School RuneScape. I built it as a way to explore my interest in game engine design while showcasing full-stack development skills acquired through LaunchCode.

### Why Woodcutting?
Woodcutting is a self-contained skill with clear rules around timers, success rates, and level gating. That made it ideal for modeling as a standalone engine.

### Mimicry vs. Homage
Reactive Roots faithfully replicates the level requirements, timers, and success rates from the actual game. What's lost in translation are elements like multiplayer, player movement, and physics, deliberately out of scope for a standalone engine.

---

## Features

- **Game Engine** - Core game engine utilizing React's `useRef` hook to update state and implementing guard clauses to guide player interaction
- **Web Pages** - Web pages with React's `Outlet` component to conditionally render header and footer components based on active route
- **Account Persistence** - MVC structure in Spring Boot built with Java, queries a MySQL database that persists player account progress across sessions via REST API endpoints

---

## Technologies

React, JavaScript, HTML, CSS, Java, Spring Boot, MySQL, Git

---

## Installation

### Dependencies
- Java JDK 21.0.9 or newer
- Node.js 22.17.0 or newer
- MySQL 9.5.0 or newer

### Retrieving Files
- Fork and clone this repo to your local machine

### Database Setup
- Start your MySQL server and connect via your preferred client
- Create new schema named `reactive-roots`

### Backend Setup
> ⚠️ Complete this section before moving on to frontend setup

- Ensure that `reactive-roots-backend/src/main/resources/application.properties` url in line 3 links to the correct MySQL port (`3306` by default)
- Ensure that `@CrossOrigin` in controllers in `reactive-roots-backend/src/main/java/com.example.reactive-roots/controllers` maps to your React port (`5173` if using Vite)
- Locate your IDE's environment variables settings, usually in **Run → Edit Configurations**
- Include this line in your environment variables field, substituting your credentials: `DB_USERNAME=your-username;DB_PASSWORD=your-password;debug=true`
- Point the working directory towards `final-project-u2-reactive-roots/reactive-roots-backend`
- Run `ReactiveRootsApplication.java` — check console to verify app is running
- Once the app is running, Spring Boot will auto-generate schema tables

### Frontend Setup
- Install dependencies with `npm install`
- `cd` into `reactive-roots-frontend`, run `npm run dev`, then enter `o`
- Your browser should open to `http://localhost:5173/` which renders Reactive Roots' home page

---

## Resource Links

**Wireframes (Figma):** https://www.figma.com/design/MKc1OaGuihPMyEXqYpdB6m/ReactiveRoots?node-id=0-1&t=toFQQ9ggHQPDFnwj-1

**Entity Relationship Diagram (Lucidchart):** https://lucid.app/publicSegments/view/b65adef7-e75f-48c0-87ca-d1442cc1aeab

---

## API Endpoints

| Category | Method | Endpoint | Description |
|---|---|---|---|
| Authorization | POST | `/api/auth/register` | Registers a new user account |
| Authorization | POST | `/api/auth/login` | Compares user inputs with database records |
| Level Requirements | GET | `/api/levels` | Fetches level requirement table |
| Player Stats | PUT | `/api/stats/{userId}/sync` | Saves experience, level, and inventory to user account |
| User | GET | `/api/users/profile/{userId}` | Fetches experience, level, username, and date created |
| User | DELETE | `/api/users/{userId}` | Deletes user account |

---

## Unsolved Problems

Players are sometimes able to chop trees that have already despawned. To resolve, I will include `isTreeAvailable()` from `Tree.jsx` in `handleStartGlobalChop()` to verify that the desired tree is live before the user can start chopping it.

---

## Future Features

- **Achievement System** - This would introduce milestones to work towards, including unlocking more powerful axes, appealing to players motivated by progression markers
- **Axe Progression** - I could implement this by extending the `onGainExp()` milestone check against a new axe progression data table, then adding records for chop success rates of higher-tier axes in the chop chance data

---

## Asset Credits

**Fonts**
- RuneStar's open-source repo for RuneScape fonts (Creative Commons Zero v1.0 Universal License)
  - https://github.com/RuneStar/fonts

**Images**
- Images sourced from royalty-free site https://pixabay.com/ where possible
- Images such as the bronze axe and login screen background were generated with ChatGPT's image creation feature

---

## License

Reactive Roots is a non-commercial fan project and is not affiliated with or endorsed by Jagex (the makers of RuneScape).
See Jagex's Fan Content Policy for more details: https://legal.jagex.com/docs/policies/fan-content-policy