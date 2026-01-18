# Focus Deen

A **personal productivity & habit tracking system** built with **Next.js App Router**, designed to track daily study, programming, and religious habits (Namaz, Quran) with powerful weekly and monthly insights.

This project was built as:

* ✅ **Portfolio project** (to demonstrate full‑stack skills)
* ✅ **Freelancing-ready system** (real-world CRUD + dashboards)
* ✅ **Personal habit system** (used for real self‑tracking)

---

## ✨ Features

### 📅 Daily Logs

* Add daily logs with:

  * Study hours
  * Programming hours
  * Namaz completion (0–5)
  * Quran reading status
* Edit & delete logs
* Dedicated **Daily Log Details page**

### 📊 Weekly Dashboard

* Automatic week range calculation
* Weekly stats:

  * Total logs
  * Study hours
  * Programming hours
  * Total productive hours
  * Perfect days (5/5 Namaz)
  * Namaz completion percentage
* Click any day to view full details

### 🗓️ Monthly Dashboard

* Monthly overview of all logs
* Aggregated statistics for the entire month
* Clean, card-based layout for readability

### 🔐 Authentication

* Secure authentication using **Clerk**
* User‑specific data isolation

### 🧠 Smart UX Decisions

* Editable dates (not forced read‑only)
* Confirmation dialogs before delete
* Empty state handling
* Consistent UI across pages

---

## 🛠️ Tech Stack

### Frontend

* **Next.js 14 (App Router)**
* **React**
* **Tailwind CSS**
* **shadcn/ui**
* **Lucide Icons**

### Backend

* **Next.js Server Actions**
* **Prisma ORM**
* **PostgreSQL (Neon)**
* **Prisma Adapter (pg)**

### Auth & Infra

* **Clerk Authentication**
* **Vercel Deployment**
* **pnpm**

---

## 📂 Key Pages

* `/` → Dashboard
* `/weekly` → Weekly overview
* `/monthly` → Monthly overview
* `/[logId]` → Daily log details (update & delete)

---

## 🧩 Database Models (Simplified)

* **User**
* **DailyLog**

  * date
  * studyHours
  * programmingHours
  * namazCompleted
  * quranRead

---

## 🚀 Deployment

The project is deployed on **Vercel** with:

* Environment‑based Prisma setup
* Production‑safe database connection handling
* Successful production builds after resolving Prisma + Turbopack issues

---

## 🎯 What This Project Demonstrates

* End‑to‑end full‑stack development
* Real production debugging & deployment
* Clean data modeling & aggregation
* Dashboard‑driven UX
* Scalable project structure

This is **V1** of the project and intentionally kept focused. No unnecessary features were added beyond the core value.

---

## 📌 Future Ideas (Optional, Not Implemented)

* Charts & visual analytics
* Streak tracking
* Data export
* Mobile‑first refinements

---

## 👤 Author

**Ridwan**
Full‑stack Next.js & MERN Developer
University of Dhaka

---

## 📝 License

This project is for learning, portfolio, and personal use.
