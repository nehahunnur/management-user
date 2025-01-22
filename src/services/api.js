import axios from "axios";

// Base URL for the API
const API_URL = "https://jsonplaceholder.typicode.com/users";

// Fetch users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Add a new user
export const addUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// Update an existing user
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/${userId}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
