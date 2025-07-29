import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Helper to get token from localStorage
const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

// Create a board
export const createBoard = async (title) => {
  const res = await axios.post(`${API_URL}/boards`, { title }, getAuthHeader());
  return res.data;
};

// Create a list
export const createList = async (boardId, title, position = 0) => {
  const res = await axios.post(`${API_URL}/lists`, { boardId, title, position }, getAuthHeader());
  return res.data;
};

// Create a card
export const createCard = async (listId, title, description = "", assignedTo = [], labels = [], dueDate = null, position = 0) => {
  const res = await axios.post(
    `${API_URL}/cards`,
    { listId, title, description, assignedTo, labels, dueDate, position },
    getAuthHeader()
  );
  return res.data;
};

// Get all boards for current user
export const fetchBoards = async () => {
  const res = await axios.get(API_URL, getAuthHeader());
  return res.data;
};
