# Reactive Roots
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)



---
## See It Live
🚀 [Live Site](https://reactive-roots.vercel.app/)  
*Note: Backend may take 30s to wake up on first load.*

**Test Account:**  
**Username:** `demo`  
**Password:** `Welcome!`

## Video Demo
[![Watch the Demo](https://i.postimg.cc/FHSbX3Fr/Screenshot-2026-05-01-121352.png)](https://www.loom.com/share/6e5c810f4f664247a4c200d77fd2c057)
*Click the image above to watch a 90-second technical walkthrough.*

---

## About

Reactive Roots is a browser-based re-creation of the woodcutting skill from my all-time favorite game Old School RuneScape. I built it as a way to explore my interest in game engine design while showcasing full-stack development skills acquired through LaunchCode.

### Why Woodcutting?
Woodcutting is a self-contained skill with clear rules around timers, success rates, and level gating. That made it ideal for modeling as a standalone engine.

### Mimicry vs. Homage
Reactive Roots faithfully replicates the level requirements, timers, and success rates from the actual game. What's lost in translation are elements like multiplayer, player movement, and physics, deliberately out of scope for a standalone engine.

---

## Features

![Reactive Roots game interface](https://i.postimg.cc/G3gFt6dL/Screenshot-2026-04-29-223839.png)

- **Game Engine** - Core game engine utilizing React's `useRef` hook to update state and implementing guard clauses to guide player interaction
- **Web Pages** - Web pages with React's `Outlet` component to conditionally render header and footer components based on active route
- **Account Persistence** - MVC structure in Spring Boot built with Java, queries a MySQL database that persists player account progress across sessions via REST API endpoints

---

## Core Concepts

RESTful API Design, Game Loop Logic, State Management, CRUD Operations, Containerization

---

## Deployment
- **Frontend:** React/Vite hosted on **Vercel**
- **Backend:** Containerized with **Docker** and deployed on **Render** (Spring Boot)
- **Database:** MySQL hosted on **Filess.io**
- **Networking:** Implemented CORS and stateful sessions to bridge secure cross-domain requests between hosting environments.

---

## 🛠️ Installation

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

1.  **Database Preparation:** Create a local MySQL schema named `reactive-roots`.
2.  **Environment Variables:** In your IDE's Run Configuration, set the following variables:
    *   `DB_USERNAME`: Your local MySQL username.
    *   `DB_PASSWORD`: Your local MySQL password.
    *   `DB_URL` (Optional): Only needed if your MySQL is not on `localhost:3306`.
3.  **Run:** Execute `ReactiveRootsApplication.java`.
    *   The backend will automatically connect and generate the necessary tables via Hibernate.
    *   Verify the console shows the application is running on port `8080`.

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
| User | GET | `/api/users/profile/{username}` | Fetches experience, level, username, and date created |
| User | DELETE | `/api/users/{userId}` | Deletes user account |

---

## Unsolved Problems

The app is stable with no known problems. If you experience a bug, please report on issue on this repository.

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