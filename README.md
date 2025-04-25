# 🪨📄✂️🦎🖖 Wooclap Tech Case — Exercise 2

## 🎮 Real-time Rock-Paper-Scissors-Lizard-Spock

This project is a real-time 2-players game built with **React**, **Socket.IO**, and **Node.js**, as part of the Wooclap technical assessment.

Players join from separate tabs/devices, pick one of the 5 actions, and receive synchronized results in real-time using WebSockets.

---

## ✅ Features

- 🔁 Real-time multiplayer with Socket.IO
- ⏳ Waiting screen until both players are connected
- 🎮 Choice of 5 actions: Rock, Paper, Scissors, Lizard, Spock
- 🧠 Waiting state when one player chooses
- 🏁 Synchronized result screen when both have picked
- 🔄 “New round” resets the game for both players
- 🧩 Custom React hook (`useGameSocket`) handling all logic
- 🧪 Unit-tested using React Testing Library + Jest

---

## 📁 Project Structure

``` txt
wooclap-fullstack/
├── backend/
│   ├── index.js               # Express + Socket.IO server
│   └── package.json           # Backend dependencies
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ActionSelection.js
│   │   │   ├── ResultScreen.js
│   │   │   └── WaitingRoom.js
│   │   ├── hooks/
│   │   │   └── useGameSocket.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── socket.js
│   └── package.json           # Frontend dependencies
│
├── package.json               # Root: defines workspaces + shared scripts
├── README.md                 
└── .gitignore
```

## ⚙️ Tech Stack

| Layer     | Tech stack                             |
|-----------|----------------------------------------|
| Frontend  | React (CRA), TailwindCSS, Socket.IO-client |
| Backend   | Express + Socket.IO                    |
| Testing   | Jest + React Testing Library           |

---

## 🚀 Getting Started

This is a **monorepo** using plain **npm workspaces**
All you need is **Node ≥ 18** and **npm ≥ 9**.

### 📦 Prerequisites

| Tool | Version |
|------|---------|
| Node | ≥ 18    |
| npm  | ≥ 9     |

---

### 📥 Installation


`git clone https://github.com/ClaraChaouat/wooclap-2.git`

`cd wooclap-2`

#### Install both frontend and backend dependencies

`npm install`

`npm run install:all`

#### Start the project

`npm run dev`

Run Socket.IO server on http://localhost:3001
Run frontend using React (CRA) on http://localhost:3000.

### 🧪 Run Tests (fontend only)

`npm test`

To start playing, open two http://localhost:3000 windows.



