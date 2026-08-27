# 💻 BookLoop - Frontend Web Application

## 👤 Student Information

- **Student Name:** Amarathunga Veedagamage Dilmi Kaushalya
- **Student Number:** 241722010
- **GCP Project ID:** project-fb5ef45c-cd3d-4991-92d
- **Slack Handle:** dilmi kaushalya
- **Public Deployed URL:** https://project-fb5ef45c-cd3d-49-b8cc6.web.app/

------------------------------------------------------------------------

## 📌 Project Overview

This repository contains the single-page **Frontend Web Application** for the **BookLoop** enterprise platform. Built using React and Vite, it serves as the user-facing portal connecting clients directly to the backend microservices ecosystem through the GCP Load Balancer and API Gateway layer.

------------------------------------------------------------------------

## 🎯 Objectives

- Provide an intuitive client dashboard for managing book catalogs, user profiles, and media uploads.
- Route API communications through GCP HTTP Load Balancer endpoints directly into the API Gateway backend.
- Maintain global state management across view routes using React Context API (`BookLoopContext`).
- Enable seamless deployment and hosting via Firebase Hosting infrastructure.

------------------------------------------------------------------------

## 📊 Key Features

- **Book Catalog Portal:** View and search inventory catalog listings (`BooksPage.jsx`, `bookService.js`).
- **User Management & Auth:** Login, profile settings, and session tracking (`LoginPage.jsx`, `ProfilePage.jsx`, `userService.js`).
- **Media Upload Management:** Interface for uploading image files to Google Cloud Storage Buckets (`MediaPage.jsx`, `mediaService.js`).
- **Book Requests Management:** Submit and process book request updates (`RequestsPage.jsx`, `requestService.js`).

------------------------------------------------------------------------

## 📁 Project Structure

```text
bookloop-frontend/
│
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Card.jsx
│   │   │   └── ListEmpty.jsx
│   │   └── layout/
│   │       ├── Hero.jsx
│   │       ├── Navbar.jsx
│   │       ├── PanelHeader.jsx
│   │       └── Tabs.jsx
│   ├── context/
│   │   └── BookLoopContext.jsx
│   ├── pages/
│   │   ├── BooksPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── MediaPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── RequestsPage.jsx
│   │   └── UsersPage.jsx
│   ├── services/
│   │   ├── bookService.js
│   │   ├── httpClient.js
│   │   ├── mediaService.js
│   │   ├── requestService.js
│   │   └── userService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
│
├── .firebaserc
├── firebase.json
├── index.html
├── package.json
├── vite.config.js
└── README.md

```

---

## 🛠 Technologies Used

* **React (v18+)**
* **Vite**
* **JavaScript (ES6+)**
* **HTML5 & CSS3**
* **Bootstrap (v5.3.8)**
* **Firebase Hosting (Cloud Hosting Deployment)**
* **GCP HTTPS Load Balancer Integration**

---

## 🚀 Setup & Getting Started Instructions

### Prerequisites

* Node.js (v18+ recommended) installed
* npm or yarn package manager installed

### Local Execution

1. **Clone the repository:**
```bash
git clone [https://github.com/dil2003-av/bookloop-frontend.git](https://github.com/dil2003-av/bookloop-frontend.git)
cd bookloop-frontend

```


2. **Install dependencies:**
```bash
npm install

```


3. **Run development server:**
```bash
npm run dev

```


4. **Access local application:**
Open browser and navigate to `http://localhost:5173`

---

## 📈 Platform Integration & Deployment

* **Hosting Platform:** Firebase Hosting
* **Live Production URL:** https://project-fb5ef45c-cd3d-49-b8cc6.web.app/
* **Backend Communication:** Connects via GCP Load Balancer to API Gateway routed services.

---

## 📌 Conclusion

The Frontend Web Application completes the end-to-end architecture of BookLoop, hosting a modern client experience on Firebase connected to high-availability Spring Boot backend services on Google Cloud Platform.
