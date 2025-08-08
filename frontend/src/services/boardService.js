import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Helper to get token from localStorage
const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

// Create a board
export const createBoard = async ({ title, description, background, visibility, workspace }) => {
  const res = await axios.post(
    `${API_URL}/boards`,
    { title, description, background, visibility, workspace },
    getAuthHeader()
  );
  return res.data;
};

// Create a list
export const createList = async (boardId, title, position = 0) => {
  const res = await axios.post(`${API_URL}/lists`, { boardId, title, position }, getAuthHeader());
  return res.data;
};

// Update a list
export const updateList = async (listId, payload) => {
  const res = await axios.put(`${API_URL}/lists/${listId}`, payload, getAuthHeader());
  return res.data;
};

// Delete a list
export const deleteList = async (listId) => {
  const res = await axios.delete(`${API_URL}/lists/${listId}`, getAuthHeader());
  return res.data;
};

// Reorder lists
export const reorderLists = async (boardId, orderedListIds) => {
  const res = await axios.patch(`${API_URL}/lists/reorder`, { boardId, orderedListIds }, getAuthHeader());
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

// Update a card
export const updateCard = async (cardId, payload) => {
  const res = await axios.put(`${API_URL}/cards/${cardId}`, payload, getAuthHeader());
  return res.data;
};

// Delete a card
export const deleteCard = async (cardId) => {
  const res = await axios.delete(`${API_URL}/cards/${cardId}`, getAuthHeader());
  return res.data;
};

// Reorder / move cards
export const reorderCards = async (sourceListId, destinationListId, orderedCardIdsInSource, orderedCardIdsInDestination = []) => {
  const res = await axios.patch(
    `${API_URL}/cards/reorder`,
    { sourceListId, destinationListId, orderedCardIdsInSource, orderedCardIdsInDestination },
    getAuthHeader()
  );
  return res.data;
};

// Get all boards for current user
export const fetchBoards = async () => {
  const res = await axios.get(`${API_URL}/boards`, getAuthHeader());
  return res.data;
};

// Get a single board by its ID
export const getBoardById = async (boardId) => {
  const res = await axios.get(`${API_URL}/boards/${boardId}`, getAuthHeader());
  return res.data;
};