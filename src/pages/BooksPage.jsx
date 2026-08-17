import { useState, useEffect } from "react";
import Card from "../components/common/Card";
import ListEmpty from "../components/common/ListEmpty";
import { useBookLoop } from "../context/BookLoopContext";
import { uploadMedia } from "../services/mediaService";

export default function BooksPage() {
  const {
    busy,
    books = [],
    bookForm = {},
    setBookForm,
    editingBookId,
    loadBooks,
    submitBook,
    startEditBook,
    deleteBook,
    currentUser,
  } = useBookLoop();

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (currentUser?.id && !editingBookId) {
      setBookForm((prev) => ({ ...prev, ownerId: currentUser.id }));
    }
  }, [currentUser, editingBookId, setBookForm]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageUrl = await uploadMedia(file);
      setBookForm((prev) => ({ ...prev, coverImageUrl: imageUrl }));
    } catch (error) {
      console.error("Upload error:", error);
      alert("Image upload failed! Check server connection.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    submitBook();
  };

  const handleDelete = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBook(bookId);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 1. Form Section (Top) */}
      <form onSubmit={onSubmit} className="card">
        <h3>{editingBookId ? "Edit Book Details" : "Add a New Book"}</h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          <label>
            Book Title
            <input
              placeholder="e.g. Madol Doova"
              value={bookForm.title || ""}
              onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
              required
            />
          </label>

          <label>
            Author
            <input
              placeholder="e.g. Martin Wickramasinghe"
              value={bookForm.author || ""}
              onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
              required
            />
          </label>

          <label>
            Category
            <select
              value={bookForm.category || "Novel"}
              onChange={(e) => setBookForm({ ...bookForm, category: e.target.value })}
            >
              <option value="Novel">Novel</option>
              <option value="Educational">Educational</option>
              <option value="Technology">Technology</option>
              <option value="Fiction">Fiction</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            Condition
            <select
              value={bookForm.condition || "GOOD"}
              onChange={(e) => setBookForm({ ...bookForm, condition: e.target.value })}
            >
              <option value="NEW">Brand New</option>
              <option value="LIKE_NEW">Like New</option>
              <option value="GOOD">Good</option>
              <option value="FAIR">Fair / Used</option>
            </select>
          </label>
        </div>

        <label style={{ marginTop: "12px" }}>
          Description
          <textarea
            rows={3}
            placeholder="Brief description about the book..."
            value={bookForm.description || ""}
            onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
          />
        </label>

        <label style={{ marginTop: "12px" }}>
          Cover Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>

        {uploading && <p className="muted">Uploading image...</p>}
        {bookForm.coverImageUrl && !uploading && (
          <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={bookForm.coverImageUrl}
              alt="Cover Preview"
              style={{ width: "60px", height: "80px", objectFit: "cover", borderRadius: "6px" }}
            />
            <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: "bold" }}>
              ✓ Image attached
            </span>
          </div>
        )}

        <input type="hidden" value={bookForm.ownerId || currentUser?.id || ""} />

        <div className="row" style={{ marginTop: "16px" }}>
          <button disabled={busy || uploading} type="submit">
            {editingBookId ? "Save Changes" : "Add Book"}
          </button>
          <button disabled={busy} type="button" className="ghost" onClick={loadBooks}>
            Refresh
          </button>
        </div>
      </form>

      {/* 2. Book Collection Display Section (Bottom) */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3>Book Collection</h3>
          <span className="muted" style={{ fontSize: "14px" }}>
            Total: {books.length}
          </span>
        </div>

        {/* Large Card Grid Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {books.map((book) => (
            <article
              key={book.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "14px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <div>
                {/* Large Cover Image */}
                {book.coverImageUrl ? (
                  <img
                    src={book.coverImageUrl}
                    alt={book.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      marginBottom: "12px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      background: "#f3f4f6",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "48px",
                      marginBottom: "12px",
                    }}
                  >
                    📖
                  </div>
                )}

                <strong style={{ fontSize: "16px", display: "block", color: "#111827", lineHeight: "1.3" }}>
                  {book.title}
                </strong>
                <p style={{ margin: "4px 0 8px 0", fontSize: "13px", color: "#6b7280" }}>
                  By {book.author}
                </p>

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
                  <span className="badge" style={{ fontSize: "11px" }}>{book.category}</span>
                  <span className="badge" style={{ fontSize: "11px", backgroundColor: "#f3f4f6", color: "#374151" }}>
                    {book.condition}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
                <button
                  disabled={busy}
                  className="ghost"
                  style={{ flex: 1, padding: "8px", fontSize: "13px" }}
                  onClick={() => startEditBook(book)}
                >
                  Edit
                </button>
                <button
                  disabled={busy}
                  className="warn"
                  style={{ flex: 1, padding: "8px", fontSize: "13px" }}
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>

        {!books.length && <ListEmpty message="No books available in the catalog yet." />}
      </Card>
    </div>
  );
}