import { useMemo, useEffect } from "react";
import Hero from "./components/layout/Hero";
import PanelHeader from "./components/layout/PanelHeader";
import Navbar from "./components/layout/Navbar";
import DashboardPage from "./pages/DashboardPage";
import BooksPage from "./pages/BooksPage";
import RequestsPage from "./pages/RequestsPage";
import MediaPage from "./pages/MediaPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { BookLoopProvider, useBookLoop } from "./context/BookLoopContext";

function AppShell() {
  const {
    activeTab,
    setActiveTab,
    activePage,
    setActivePage,
    notice,
    currentUser,
    isAuthenticated,
    logout,
  } = useBookLoop();

  // Redirect Logic
  useEffect(() => {
    if (!isAuthenticated && activePage !== "register") {
      setActivePage("login");
    } else if (isAuthenticated && activePage === "login") {
      setActivePage("dashboard");
    }
  }, [isAuthenticated, activePage, setActivePage]);

  const sectionTitle = useMemo(() => {
    if (activeTab === "dashboard") return "Dashboard";
    if (activeTab === "books") return "Book Catalog";
    if (activeTab === "requests") return "Request Lane";
    return "Media Studio";
  }, [activeTab]);

  return (
    <div className="page-shell">
      <div className="bg-layer" aria-hidden="true" />
      <Navbar
        isAuthenticated={isAuthenticated}
        activePage={activePage}
        setActivePage={setActivePage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        logout={logout}
      />

      {/* Auth නොමැති විට Login / Register එක විතරක් පෙන්වයි */}
      {!isAuthenticated ? (
        <main className="auth-container">
          {activePage === "register" ? <RegisterPage /> : <LoginPage />}
        </main>
      ) : (
        /* Authenticated වූ විට පමණක් Hero සහ Panel/Dashboard පෙන්වයි */
        <>
          <Hero />
          <section className="panel">
            <PanelHeader title={sectionTitle} notice={notice} />
            {activeTab === "dashboard" && <DashboardPage />}
            {activeTab === "books" && <BooksPage />}
            {activeTab === "requests" && <RequestsPage />}
            {activeTab === "media" && <MediaPage />}
          </section>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BookLoopProvider>
      <AppShell />
    </BookLoopProvider>
  );
}