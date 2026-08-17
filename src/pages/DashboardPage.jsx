import Card from "../components/common/Card";
import { useBookLoop } from "../context/BookLoopContext";

export default function DashboardPage() {
  const { currentUser, books, requests, setActiveTab } = useBookLoop();

  // Active userගේ requests සහ ළඟදී එකතු වූ දත්ත සාරාංශය
  const myRequests = requests?.filter(
    (r) => String(r.requesterId) === String(currentUser?.id)
  ) || [];

  const pendingRequests = myRequests.filter((r) => r.status === "PENDING").length;
  const approvedRequests = myRequests.filter((r) => r.status === "APPROVED").length;

  return (
    <div className="dashboard-shell" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Welcome Banner */}
      <div 
        className="card welcome-card" 
        style={{ 
          background: "linear-gradient(135deg, #134e4a 0%, #064e3b 100%)", 
          color: "#ffffff", 
          padding: "24px", 
          borderRadius: "12px" 
        }}
      >
        <h2>Welcome back, {currentUser?.name || currentUser?.email || "User"}! 👋</h2>
        <p style={{ marginTop: "8px", opacity: 0.9 }}>
          Here is what is happening with your BookLoop account today.
        </p>
      </div>

      {/* Metrics / Overview Cards */}
      <div className="grid three-col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        <div className="card" style={{ padding: "20px", textAlign: "center" }}>
          <span style={{ fontSize: "14px", color: "#666" }}>Total Available Books</span>
          <h1 style={{ fontSize: "32px", margin: "8px 0", color: "#0f766e" }}>{books?.length || 0}</h1>
          <button className="link-btn" onClick={() => setActiveTab("books")}>
            Browse Books →
          </button>
        </div>

        <div className="card" style={{ padding: "20px", textAlign: "center" }}>
          <span style={{ fontSize: "14px", color: "#666" }}>My Total Requests</span>
          <h1 style={{ fontSize: "32px", margin: "8px 0", color: "#0f766e" }}>{myRequests.length}</h1>
          <button className="link-btn" onClick={() => setActiveTab("requests")}>
            View Requests →
          </button>
        </div>

        <div className="card" style={{ padding: "20px", textAlign: "center" }}>
          <span style={{ fontSize: "14px", color: "#666" }}>Pending Requests</span>
          <h1 style={{ fontSize: "32px", margin: "8px 0", color: "#d97706" }}>{pendingRequests}</h1>
          <span style={{ fontSize: "12px", color: "#16a34a" }}>{approvedRequests} Approved</span>
        </div>
      </div>

      {/* Profile Overview & Quick Actions */}
      <div className="grid two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <Card>
          <h3>My Account Overview</h3>
          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <p><strong>User ID:</strong> #{currentUser?.id || "N/A"}</p>
            <p><strong>Name:</strong> {currentUser?.name || "N/A"}</p>
            <p><strong>Email:</strong> {currentUser?.email || "N/A"}</p>
            <p><strong>Phone:</strong> {currentUser?.phone || "N/A"}</p>
            <p><strong>Role:</strong> <span className="badge">{currentUser?.role || "USER"}</span></p>
          </div>
          <button 
            style={{ marginTop: "16px" }} 
            onClick={() => setActiveTab("profile")}
          >
            Edit Profile
          </button>
        </Card>

        <Card>
          <h3>Recent Book Requests</h3>
          <div className="list" style={{ marginTop: "16px" }}>
            {myRequests.slice(0, 3).map((req) => (
              <article key={req.requestId} className="list-item" style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
                <div>
                  <strong>Request #{req.requestId}</strong>
                  <p>Book ID: {req.bookId} | Status: <b style={{ color: req.status === "APPROVED" ? "#16a34a" : "#d97706" }}>{req.status}</b></p>
                </div>
              </article>
            ))}
            {!myRequests.length && <p className="muted">No recent requests made.</p>}
          </div>
          {myRequests.length > 3 && (
            <button className="ghost" style={{ marginTop: "12px" }} onClick={() => setActiveTab("requests")}>
              View All
            </button>
          )}
        </Card>
      </div>
    </div>
  );
}