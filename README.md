# 🐝 DevHive

**DevHive** is a collaborative productivity platform for developers to work together using the Pomodoro technique. In this app, developers can join shared rooms, focus in sync, and chat during breaks — fostering both deep work and community spirit.

---

![Screenshot](.frontend/public/room.png) 

## 🚀 Purpose

DevHive helps developers:
- Focus using the Pomodoro method.
- Collaborate in real-time with other developers.
- Stay connected with chat during breaks.
- Keep distractions away during focus periods.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion  
- **State Management:** Zustand  
- **Backend:** Node.js + Express  
- **Realtime:** WebSockets (Socket.IO)  
- **Database:** MongoDB + Mongoose

---

## 📦 Setup

```bash
# Clone the repo
git clone https://github.com/your-username/devhive.git
cd devhive

# Install dependencies
npm install

# Create .env file
cp .env.example .env.local
# Fill in environment variables (Mongo URI, WebSocket URL, etc.)

# Start development
cd frontend
npm dev

# Run backend server (WebSocket + Express)
cd backend
npm run server

## 🔮 Upcoming Features

🧠 Core Functionality
- [x] 🧩 WebSocket integration per room
- [x] 💬 Realtime chat
- [x] 👥 Online users indicator
- [ ] 🔄 Synced Pomodoro timers

⚙️ Room Customization
- [ ] 🎛️ Chat Settings card
- [ ] 🧾 Preferences panel
- [ ] 📁 GitHub Repo Selector

📊 Insights & Tracking
- [ ] 📅 Weekly Summary card
- [ ] 📈 Session analytics stored in DB

🧪 After MVP
- [ ] 🤝 Collaboration & matchmaking
- [ ] 📝 Personal note-taking
- [ ] 📢 Shareable public updates