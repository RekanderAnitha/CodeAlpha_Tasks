<<<<<<< HEAD
# CampusConnect - Modern College Alert Application

CampusConnect is a premium, mobile-first college management and alert application designed for students to stay synchronized with their campus life. Built with React, Tailwind CSS, and Firebase, it features a sophisticated UI/UX that blends functional utility with a refined aesthetic.

## 🚀 Key Features

### 🔐 Multi-Role Authentication
- Secure **Student Sign-Up** and **Login** powered by Firebase Authentication.
- **Admin Panel** for faculty and administrators to publish updates.
- Profile management with dynamic avatars.

### 📢 Real-time Alerts & Notices
- Instant updates for **Exams, Seminars, Fests, Holidays, and Circulars**.
- Category-based filtering for quick access to relevant information.
- Rich content support for detailed announcements.

### 📅 Smart Academic Tools
- **Weekly Timetable**: A clean, interactive schedule showing classes, faculty, and room assignments.
- **Attendance Tracker**: Manual tracking with visual progress rings and 75% eligibility warnings.
- **E-Library**: Centralized repository for lecture notes, lab manuals, and midterm prep (PDFs/Docs).

### 🎨 Premium UI/UX
- **Material Design 3** philosophy with rounded corners and modern elevation.
- **Smooth Animations** using `motion` for page transitions and staggered list entries.
- **Responsive Layout**: Optimized for mobile viewports using standard web technologies.

## 🛠 Tech Stack
- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Motion
- **Icons**: Lucide React
- **Backend/Database**: Firebase (Auth, Firestore, Storage)

## 📂 Project Structure
```text
/src
  /components
    /layout     - MainLayout, BottomNav
    /ui         - Reusable primitive components
  /context      - AuthContext (Session Management)
  /services     - firebase.ts (DB & Auth Initialization)
  /screens      - All app screens (Dashboard, Timetable, etc.)
  /lib          - Utility functions (cn helper)
```

## ⚙️ Installation & Setup
1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Configure Firebase**:
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
   - Enable Auth (Google/Email), Firestore, and Storage.
   - Add your config to `/firebase-applet-config.json`.
4. **Deploy Rules**: Use `firebase deploy --only firestore:rules`.
5. **Run the app**: `npm run dev`

## 🛡 Security Rules
The application implements the **Eight Pillars of Hardened Rules**:
- **Master Gate Pattern**: Relational sync between users and their data.
- **Identity Integrity**: Author/Owner UID verification on all writes.
- **Type Safety**: Runtime schema validation via Firestore rules.
- **Action-Based Updates**: Strict `affectedKeys().hasOnly()` gates.

---
*Created for the CampusConnect Internship Submission - 2026*
=======
# CodeAlpha_Tasks
Completed my internship tasks at CodeAlpha This repository includes projects built using React, TypeScript, Firebase, and Tailwind CSS. Worked on authentication, responsive UI, and real-time database integration while improving my frontend development skills. Excited to keep learning and building more projects!


This repository contains all the tasks completed during my CodeAlpha internship.

## Tasks
1. Campus Vault Web Application
2. Firebase Authentication Integration
3. Frontend Development Projects

## Technologies Used
- React
- TypeScript
- Firebase
- Tailwind CSS

## Tasks
1. Campus Vault Web Application
2. Firebase Authentication Integration
3. Frontend Development Projects

## Technologies Used
- React
- TypeScript
- Firebase
- Tailwind CSS
>>>>>>> a3568185c50e978bcbdf2aa6496ed82883d52d64
