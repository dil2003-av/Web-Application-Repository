import { useState, useEffect } from "react";
import { useBookLoop } from "../context/BookLoopContext";

export default function ProfilePage() {
  const { currentUser, updateUser } = useBookLoop();
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    if (currentUser) {
      setProfile({
        id: currentUser.id || "",
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        role: currentUser.role || "USER",
      });
    }
  }, [currentUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (updateUser) {
        await updateUser(profile.id, profile);
      }
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile: " + (error.message || "Something went wrong"));
    }
  };

  if (!currentUser) {
    return <div style={{ padding: "20px" }}>No user logged in.</div>;
  }

  return (
    <div className="profile-container" style={{ padding: "20px" }}>
      <div className="card" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h2>My Profile</h2>
        <p className="muted">Your personal account details.</p>

        <form onSubmit={handleUpdate}>
          <label>
            User ID
            <input type="text" value={profile.id} disabled />
          </label>

          <label>
            Full Name
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </label>

          <label>
            Email Address
            <input type="email" value={profile.email} disabled />
          </label>

          <label>
            Phone Number
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              required
            />
          </label>

          <label>
            Role
            <input type="text" value={profile.role} disabled />
          </label>

          <button type="submit" style={{ marginTop: "16px" }}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}