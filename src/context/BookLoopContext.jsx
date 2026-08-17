import { createContext, useContext, useState, useEffect } from "react";
import { userService } from "../services/userService";
import { bookService } from "../services/bookService";
import { requestService } from "../services/requestService";
import { mediaService } from "../services/mediaService";

const BookLoopContext = createContext(null);
const STORAGE_KEY = "bookloop_current_user";

const initialUser = {
  name: "",
  email: "",
  password: "",
  phone: "",
  role: "READER",
};

const initialBook = {
  title: "",
  author: "",
  category: "",
  description: "",
  condition: "GOOD",
  coverImageUrl: "",
  ownerId: "",
};

const initialRequest = {
  requesterId: "",
  bookId: "",
};

export function BookLoopProvider({ children }) {
  // Page load වෙන විට කිසිම පරණ session එකක් auto-load නොවන සේ null / "login" ලෙස set කිරීම
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activePage, setActivePage] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);

  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState({
    type: "info",
    message: "Welcome to BookLoop.",
  });

  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState(initialUser);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const [books, setBooks] = useState([]);
  const [bookForm, setBookForm] = useState(initialBook);
  const [editingBookId, setEditingBookId] = useState(null);
  const [bookIdToDelete, setBookIdToDelete] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("");

  const [requests, setRequests] = useState([]);
  const [requestForm, setRequestForm] = useState(initialRequest);
  const [requestIdForStatus, setRequestIdForStatus] = useState("");
  const [requestStatus, setRequestStatus] = useState("PENDING");

  const [mediaFile, setMediaFile] = useState(null);
  const [uploadedMedia, setUploadedMedia] = useState(null);
  const [mediaId, setMediaId] = useState("");
  const [mediaRecord, setMediaRecord] = useState(null);

  const runTask = async (task, successMessage) => {
    setBusy(true);
    try {
      const result = await task();
      if (successMessage) {
        setNotice({ type: "success", message: successMessage });
      }
      return result;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        error.message ||
        "Request failed";
      setNotice({ type: "error", message: String(message) });
      throw error;
    } finally {
      setBusy(false);
    }
  };

  const loadBooks = () =>
    runTask(async () => {
      const data = await bookService.getAll();
      setBooks(data);
    }, "Books loaded");

  const loadRequests = () =>
    runTask(async () => {
      const data = await requestService.getAll();
      setRequests(data);
    }, "Requests loaded");

  // User log වුණු පසු පමණක් Data Fetch කිරීම
  useEffect(() => {
    if (currentUser) {
      loadBooks();
      loadRequests();
    }
  }, [currentUser?.id]);

  const login = (email, password) =>
    runTask(async () => {
      const allUsers = await userService.getAll();
      const user = allUsers.find(
        (item) => item.email === email && item.password === password
      );

      if (!user) {
        throw new Error("Invalid email or password.");
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      setCurrentUser(user);
      setActivePage("dashboard");
      setActiveTab("dashboard");
    }, "Login successful");

  const registerAccount = (payload) =>
    runTask(async () => {
      await userService.create(payload);
      setActivePage("login");
    }, "Registration successful. Please log in.");

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentUser(null);
    setActivePage("login");
    setActiveTab("dashboard");
    setNotice({ type: "info", message: "You are logged out." });
  };

  const loadUsers = () =>
    runTask(async () => {
      const data = await userService.getAll();
      setUsers(data);
    }, "Users loaded");

  const submitUser = () =>
    runTask(async () => {
      if (editingUserId) {
        const updated = await userService.update(editingUserId, userForm);
        setUsers((prev) =>
          prev.map((item) => (item.id === editingUserId ? updated : item))
        );
        setEditingUserId(null);
      } else {
        const created = await userService.create(userForm);
        setUsers((prev) => [created, ...prev]);
      }
      setUserForm(initialUser);
    }, editingUserId ? "User updated" : "User created");

  const startEditUser = (user) => {
    setEditingUserId(user.id);
    setUserForm({
      name: user.name || "",
      email: user.email || "",
      password: user.password || "",
      phone: user.phone || "",
      role: user.role || "READER",
    });
  };

  const deleteUser = () =>
    runTask(async () => {
      if (!userIdToDelete) {
        throw new Error("Enter a user id to delete.");
      }
      await userService.remove(userIdToDelete);
      setUsers((prev) =>
        prev.filter((item) => String(item.id) !== String(userIdToDelete))
      );
      setUserIdToDelete("");
    }, "User deleted");

  const loadBooksByOwner = () =>
    runTask(async () => {
      if (!ownerFilter) {
        throw new Error("Enter an owner id.");
      }
      const data = await bookService.getByOwner(ownerFilter);
      setBooks(data);
    }, "Owner books loaded");

  const submitBook = () =>
    runTask(async () => {
      if (editingBookId) {
        const updated = await bookService.update(editingBookId, bookForm);
        setBooks((prev) =>
          prev.map((item) => (item.id === editingBookId ? updated : item))
        );
        setEditingBookId(null);
      } else {
        const created = await bookService.create(bookForm);
        setBooks((prev) => [created, ...prev]);
      }
      setBookForm(initialBook);
    }, editingBookId ? "Book updated" : "Book created");

  const startEditBook = (book) => {
    setEditingBookId(book.id);
    setBookForm({
      title: book.title || "",
      author: book.author || "",
      category: book.category || "",
      description: book.description || "",
      condition: book.condition || "GOOD",
      coverImageUrl: book.coverImageUrl || "",
      ownerId: book.ownerId || "",
    });
  };

  const deleteBook = (bookId) =>
    runTask(async () => {
      const idToRemove = bookId || bookIdToDelete;
      if (!idToRemove) {
        throw new Error("Enter a book id to delete.");
      }
      await bookService.remove(idToRemove);
      setBooks((prev) =>
        prev.filter((item) => String(item.id) !== String(idToRemove))
      );
      setBookIdToDelete("");
    }, "Book deleted");

  const createRequest = () =>
    runTask(async () => {
      const created = await requestService.create({
        requesterId: Number(requestForm.requesterId),
        bookId: requestForm.bookId,
      });
      setRequests((prev) => [created, ...prev]);
      setRequestForm(initialRequest);
    }, "Request created");

  const updateRequestStatus = () =>
    runTask(async () => {
      if (!requestIdForStatus) {
        throw new Error("Enter a request id.");
      }
      const updated = await requestService.updateStatus(
        requestIdForStatus,
        requestStatus
      );
      setRequests((prev) =>
        prev.map((item) =>
          String(item.requestId) === String(requestIdForStatus) ? updated : item
        )
      );
    }, "Request status updated");

  const uploadMedia = () =>
    runTask(async () => {
      if (!mediaFile) {
        throw new Error("Choose a file before upload.");
      }
      const uploaded = await mediaService.upload(mediaFile);
      setUploadedMedia(uploaded);
      setBookForm((prev) => ({ ...prev, coverImageUrl: uploaded }));
    }, "Media uploaded");

  const getMediaById = () =>
    runTask(async () => {
      if (!mediaId) {
        throw new Error("Enter media id.");
      }
      const media = await mediaService.getById(mediaId);
      setMediaRecord(media);
    }, "Media loaded");

  const value = {
    activeTab,
    setActiveTab,
    activePage,
    setActivePage,
    currentUser,
    isAuthenticated: Boolean(currentUser),
    login,
    registerAccount,
    logout,
    busy,
    notice,

    users,
    userForm,
    setUserForm,
    editingUserId,
    userIdToDelete,
    setUserIdToDelete,
    loadUsers,
    submitUser,
    startEditUser,
    deleteUser,

    books,
    bookForm,
    setBookForm,
    editingBookId,
    ownerFilter,
    setOwnerFilter,
    bookIdToDelete,
    setBookIdToDelete,
    loadBooks,
    loadBooksByOwner,
    submitBook,
    startEditBook,
    deleteBook,

    requests,
    requestForm,
    setRequestForm,
    requestIdForStatus,
    setRequestIdForStatus,
    requestStatus,
    setRequestStatus,
    loadRequests,
    createRequest,
    updateRequestStatus,

    mediaFile,
    setMediaFile,
    uploadedMedia,
    mediaId,
    setMediaId,
    mediaRecord,
    uploadMedia,
    getMediaById,
  };

  return <BookLoopContext.Provider value={value}>{children}</BookLoopContext.Provider>;
}

export function useBookLoop() {
  const context = useContext(BookLoopContext);
  if (!context) {
    throw new Error("useBookLoop must be used within BookLoopProvider");
  }
  return context;
}