import React, { useEffect, useState } from "react";
import api from "../../../api/api";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleUserDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      try {
        await api.delete(`/admin/users/${id}`);
        setUsers(users.filter((u) => u._id !== id));
      } catch (err) {
        console.error("Failed to delete user", err);
      }
    }
  };

  return (
    <div className="admin-users-container">
      <h2 className="admin-users-heading">👥 All Registered Users</h2>

      {users.length === 0 ? (
        <p className="admin-users-empty">No users found.</p>
      ) : (
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id}>
                <td>{i + 1}</td>
                <td>{u.email}</td>
                <td>{u.isAdmin ? "Admin" : "User"}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleUserDelete(u._id)}
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                      padding: "0.6rem 1.4rem",
                      borderRadius: "8px",
                      border: "1px solid #444",
                      background: "linear-gradient(145deg, #2e2e2e, #3b3b3b)",
                      color: "#fff",
                      cursor: "pointer",
                      transition: "all 0.3s ease-in-out",
                      boxShadow: "0 5px 10px rgba(0, 0, 0, 0.25)",
                      outline: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(145deg, #3b3b3b, #4a4a4a)";
                      e.currentTarget.style.transform = "scale(1.03)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 20px rgba(0, 0, 0, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(145deg, #2e2e2e, #3b3b3b)";
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 5px 10px rgba(0, 0, 0, 0.25)";
                    }}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
