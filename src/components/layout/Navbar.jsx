export default function Navbar({
  isAuthenticated,
  activePage,
  setActivePage,
  activeTab,
  setActiveTab,
  currentUser,
  logout,
}) {
  // "users" වෙනුවට "profile" ලෙස වෙනස් කර ඇත
const tabItems = [
  ["dashboard", "Dashboard"],
  ["books", "Books"],
  ["requests", "Requests"],
];

  return (
    <header className="top-nav-wrap">
      <div className="top-nav">
        <button
          className="brand"
          onClick={() => setActivePage(isAuthenticated ? "dashboard" : "login")}
        >
          BookLoop
        </button>

        <div className="top-nav-actions">
          {!isAuthenticated && (
            <>
              <button
                className={activePage === "login" ? "tab active" : "tab"}
                onClick={() => setActivePage("login")}
              >
                Login
              </button>
              <button
                className={activePage === "register" ? "tab active" : "tab"}
                onClick={() => setActivePage("register")}
              >
                Register
              </button>
            </>
          )}

          {isAuthenticated && (
            <>
              <nav className="tabs inline-tabs">
                {tabItems.map(([key, label]) => (
                  <button
                    key={key}
                    className={activeTab === key ? "tab active" : "tab"}
                    onClick={() => {
                      setActivePage("dashboard");
                      setActiveTab(key);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </nav>

              <span className="nav-user">
                {currentUser?.name || currentUser?.email}
              </span>
              <button className="warn" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}