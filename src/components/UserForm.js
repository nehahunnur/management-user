import React, { useState, useEffect } from "react";

const UserForm = ({ user, onAdd, onUpdate, onClose }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        email: user.email,
        department: user.department,
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      onUpdate(user.id, userData); // Update existing user
    } else {
      onAdd(userData); // Add new user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
        />
      </label>
      <label>
        Department:
        <input
          type="text"
          value={userData.department}
          onChange={(e) =>
            setUserData({ ...userData, department: e.target.value })
          }
          required
        />
      </label>
      <button type="submit">{user ? "Update" : "Add"} User</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default UserForm;
