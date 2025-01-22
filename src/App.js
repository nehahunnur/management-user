import React, { useState, useEffect } from "react";
import { fetchUsers, addUser, updateUser, deleteUser } from "./services/api";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await fetchUsers();
        setUsers(userData);
      } catch (error) {
        setError("Failed to fetch users. Please try again later.");
      }
    };

    getUsers();
  }, []);

  // Handle adding a user
  const handleAddUser = async (newUser) => {
    try {
      const addedUser = await addUser(newUser);
      setUsers([...users, addedUser]);
      setShowForm(false);
    } catch (error) {
      setError("Failed to add user. Please try again later.");
    }
  };

  // Handle updating a user
  const handleUpdateUser = async (userId, updatedUser) => {
    try {
      const updatedUserData = await updateUser(userId, updatedUser);
      setUsers(
        users.map((user) => (user.id === userId ? updatedUserData : user))
      );
      setShowForm(false);
    } catch (error) {
      setError("Failed to update user. Please try again later.");
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      setError("Failed to delete user. Please try again later.");
    }
  };

  // Show the form for adding or editing a user
  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div>
      <h1>User Management</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!showForm ? (
        <>
          <button onClick={() => setShowForm(true)}>Add User</button>
          <UserList
            users={users}
            onEdit={(user) => {
              setEditingUser(user);
              setShowForm(true);
            }}
            onDelete={handleDeleteUser}
          />
        </>
      ) : (
        <UserForm
          user={editingUser}
          onAdd={handleAddUser}
          onUpdate={handleUpdateUser}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default App;
