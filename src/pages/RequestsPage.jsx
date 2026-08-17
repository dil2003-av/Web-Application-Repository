import { useEffect } from "react";
import Card from "../components/common/Card";
import ListEmpty from "../components/common/ListEmpty";
import { useBookLoop } from "../context/BookLoopContext";

export default function RequestsPage() {
  const {
    busy,
    books = [],
    loadBooks,
    requests = [],
    requestForm,
    setRequestForm,
    requestIdForStatus,
    setRequestIdForStatus,
    requestStatus,
    setRequestStatus,
    createRequest,
    loadRequests,
    updateRequestStatus,
    currentUser,
  } = useBookLoop();

  // Active user ID එක automatically set කිරීම සහ Books load කිරීම
  useEffect(() => {
    if (currentUser?.id) {
      setRequestForm((prev) => ({ ...prev, requesterId: currentUser.id }));
    }
    // Requests Page එකට ආ සැනින් Available Books load කිරීම
    if (loadBooks) loadBooks();
    if (loadRequests) loadRequests();
  }, [currentUser, setRequestForm]);

  // Current Logged-in User ට අදාළ Requests පමණක් Filter කිරීම
  const myRequests = requests.filter(
    (req) => String(req.requesterId) === String(currentUser?.id)
  );

  // ID එක අනුව Book Object එක සොයා ගැනීමට Helper Function එකක්
  const getBookDetails = (bookId) => {
    return books.find((b) => String(b.id) === String(bookId));
  };

  const onCreate = (event) => {
    event.preventDefault();
    if (!requestForm.bookId) {
      alert("Please select a book first!");
      return;
    }
    createRequest();
  };

  return (
    <div className="grid two-col">
      {/* Create Request Form */}
      <form onSubmit={onCreate} className="card">
        <h3>Create Request</h3>

        <label>
          Requester Name / ID
          <input
            value={currentUser ? `${currentUser.name || "User"} (ID: ${currentUser.id})` : ""}
            disabled
          />
        </label>

        <label>
          Select Book
          <select
            value={requestForm.bookId || ""}
            onChange={(e) => setRequestForm({ ...requestForm, bookId: e.target.value })}
            required
          >
            <option value="">-- Choose a Book --</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} (by {book.author})
              </option>
            ))}
          </select>
        </label>

        {/* තෝරාගත් පොතේ Preview එකක් පෙන්වීම */}
        {requestForm.bookId && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "#f9fafb",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              fontSize: "13px",
            }}
          >
            {(() => {
              const selected = getBookDetails(requestForm.bookId);
              return selected ? (
                <div>
                  <strong>Category:</strong> {selected.category} | <strong>Condition:</strong> {selected.condition}
                </div>
              ) : null;
            })()}
          </div>
        )}

        <div className="row" style={{ marginTop: "16px" }}>
          <button disabled={busy} type="submit">
            Create Request
          </button>
          <button disabled={busy} type="button" className="ghost" onClick={loadRequests}>
            Refresh
          </button>
        </div>
      </form>

      {/* My Requests Card */}
      <Card>
        <h3>My Requests</h3>

        <div className="row" style={{ marginBottom: "16px", gap: "8px" }}>
          <input
            placeholder="Request ID"
            value={requestIdForStatus}
            onChange={(e) => setRequestIdForStatus(e.target.value)}
          />
          <select
            value={requestStatus}
            onChange={(e) => setRequestStatus(e.target.value)}
          >
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
          <button disabled={busy} onClick={updateRequestStatus}>
            Update
          </button>
        </div>

        <div className="list">
          {myRequests.map((request) => {
            const requestedBook = getBookDetails(request.bookId);
            return (
              <article
                key={request.requestId}
                className="list-item"
                style={{
                  padding: "12px",
                  marginBottom: "8px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>Request #{request.requestId}</strong>
                  <p style={{ margin: "4px 0", fontSize: "14px", color: "#374151" }}>
                    📖 <strong>{requestedBook ? requestedBook.title : `Book ID: ${request.bookId}`}</strong>
                    {requestedBook && <span style={{ color: "#6b7280" }}> by {requestedBook.author}</span>}
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>
                    Date: {request.requestDate ? new Date(request.requestDate).toLocaleDateString() : "N/A"}
                  </p>
                </div>

                <div>
                  <span
                    className="badge"
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      backgroundColor:
                        request.status === "APPROVED"
                          ? "#dcfce7"
                          : request.status === "REJECTED"
                          ? "#fee2e2"
                          : "#fef9c3",
                      color:
                        request.status === "APPROVED"
                          ? "#15803d"
                          : request.status === "REJECTED"
                          ? "#b91c1c"
                          : "#a16207",
                    }}
                  >
                    {request.status}
                  </span>
                </div>
              </article>
            );
          })}

          {!myRequests.length && <ListEmpty message="No requests found for your account." />}
        </div>
      </Card>
    </div>
  );
}