import Card from "../components/common/Card";
import ListEmpty from "../components/common/ListEmpty";
import { useBookLoop } from "../context/BookLoopContext";

export default function UsersPage() {
  const {
    busy,
    users,
    userForm,
    setUserForm,
    editingUserId,
    userIdToDelete,
    setUserIdToDelete,
    submitUser,
    loadUsers,
    deleteUser,
    startEditUser,
  } = useBookLoop();

  const onSubmit = (event) => {
    event.preventDefault();
    submitUser();
  };

  return (
    <div className="grid two-col">
      <form onSubmit={onSubmit} className="card">
        <h3>{editingUserId ? "Update User" : "Create User"}</h3>
        
        <label>
          Name
          <input
            value={userForm.name || ""}
            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
            required
          />
        </label>
        
        <label>
          Email
          <input
            type="email"
            value={userForm.email || ""}
            onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
            required
          />
        </label>
        
        <label>
          Password
          <input
            type="password"
            value={userForm.password || ""}
            onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
            required
          />
        </label>
        
        <label>
          Phone
          <input
            value={userForm.phone || ""}
            onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
            required
          />
        </label>
        
        <label>
          Role
          <select
            value={userForm.role || "USER"}
            onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
            required
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </label>
        
        <div className="row">
          <button disabled={busy} type="submit">
            {editingUserId ? "Save Changes" : "Create"}
          </button>
          <button disabled={busy} type="button" className="ghost" onClick={loadUsers}>
            Refresh
          </button>
        </div>
      </form>

      <Card>
        <h3>Users</h3>
        <div className="row">
          <input
            placeholder="User ID to delete"
            value={userIdToDelete || ""}
            onChange={(e) => setUserIdToDelete(e.target.value)}
          />
          <button disabled={busy} className="warn" onClick={deleteUser}>
            Delete
          </button>
        </div>
        
        <div className="list">
          {users && users.map((user) => (
            <article key={user.id} className="list-item">
              <div>
                <strong>
                  #{user.id} {user.name}
                </strong>
                <p>
                  {user.email} | {user.phone} | {user.role}
                </p>
              </div>
              <button
                disabled={busy}
                className="ghost"
                onClick={() => startEditUser(user)}
              >
                Edit
              </button>
            </article>
          ))}
          {(!users || !users.length) && <ListEmpty message="No users loaded yet." />}
        </div>
      </Card>
    </div>
  );
}