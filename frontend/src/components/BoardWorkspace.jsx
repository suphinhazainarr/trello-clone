import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the boardId from the URL
import {
  getBoardById, // Service to fetch the board data
  createList,
  createCard,
} from "../services/boardService";
import {
  ChevronDown,
  SlidersHorizontal,
  Star,
  Users,
  Share2,
  MoreHorizontal,
} from "lucide-react";

export default function BoardWorkspace() {
  const { boardId } = useParams(); // Get boardId from the URL, e.g., /board/12345
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for creating new lists and cards
  const [newListTitle, setNewListTitle] = useState("");
  const [newCardTitle, setNewCardTitle] = useState("");
  const [selectedListId, setSelectedListId] = useState(""); // Tracks which "add card" input is active

  // Fetch all board data when the component loads or the boardId changes
  useEffect(() => {
    const fetchBoardData = async () => {
      if (boardId) {
        setLoading(true);
        setError(null);
        try {
          // NOTE: Your backend should populate lists and cards for this to work in one go
          // If not, you'll need separate API calls to fetch lists and then cards.
          const boardData = await getBoardById(boardId);
          setBoard(boardData);
          
          // Assuming the backend populates lists with their cards
          const listsData = boardData.lists || [];
          setLists(listsData);

          // Organize cards by listId for easy rendering
          const cardsByList = {};
          listsData.forEach(list => {
            cardsByList[list._id] = list.cards || [];
          });
          setCards(cardsByList);

        } catch (err) {
          console.error("Failed to fetch board data:", err);
          setError("Board not found or you don't have access.");
          setBoard(null);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBoardData();
  }, [boardId]);

  // Handler to create a new list
  const handleCreateList = async () => {
    if (!newListTitle.trim() || !board) return;
    try {
      const newList = await createList(board._id, newListTitle, lists.length);
      setLists([...lists, newList]);
      setNewListTitle(""); // Reset input
    } catch (err) {
      console.error("Failed to create list:", err);
    }
  };

  // Handler to create a new card in a specific list
  const handleCreateCard = async (listId) => {
    if (!newCardTitle.trim()) return;
    try {
      const newCard = await createCard(listId, newCardTitle);
      // Update the cards state for the specific list
      setCards(prevCards => ({
        ...prevCards,
        [listId]: [...(prevCards[listId] || []), newCard],
      }));
      setNewCardTitle(""); // Reset input
      setSelectedListId(""); // Deactivate input
    } catch (err) {
      console.error("Failed to create card:", err);
    }
  };

  if (loading) {
    return <div className="flex-1 p-8 text-white text-center">Loading board...</div>;
  }

  if (error) {
    return <div className="flex-1 p-8 text-red-400 text-center">{error}</div>;
  }

  if (!board) {
    return <div className="flex-1 p-8 text-white text-center">Select or create a board to get started.</div>;
  }

  return (
    <section className="flex-1 flex flex-col h-full rounded-2xl shadow-lg overflow-hidden relative">
      {/* Board Header */}
      <div className="flex items-center justify-between px-8 pt-6 pb-2 z-10 relative">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg text-white">{board.title}</span>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-5 h-5 text-gray-400" />
          <Star className="w-5 h-5 text-gray-400" />
          <Users className="w-5 h-5 text-gray-400" />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Board Background and Content */}
      <div
        className="flex-1 bg-cover bg-center relative p-8"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(${board.background})` }}
      >
        <div className="flex gap-6 overflow-x-auto pb-4 h-full">
          {/* Render Lists */}
          {lists.map((list) => (
            <div key={list._id} className="bg-[#181c20] rounded-xl p-3 w-72 min-w-[18rem] shadow-lg flex flex-col h-fit">
              <div className="font-bold mb-2 text-white flex items-center justify-between">
                <span>{list.title}</span>
                <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
              </div>
              
              {/* Render Cards */}
              <div className="flex flex-col gap-2 mb-2">
                {(cards[list._id] || []).map((card) => (
                  <div key={card._id} className="bg-white rounded p-3 shadow text-gray-900 cursor-pointer">
                    {card.title}
                  </div>
                ))}
              </div>

              {/* Add a Card Form */}
              <div className="mt-auto">
                <input
                  type="text"
                  placeholder="Enter a title for this card..."
                  value={selectedListId === list._id ? newCardTitle : ""}
                  onChange={(e) => {
                    setSelectedListId(list._id);
                    setNewCardTitle(e.target.value);
                  }}
                  className="px-3 py-2 rounded border-gray-300 w-full mb-2 bg-[#22272b] text-white border-none placeholder-gray-400"
                />
                <button
                  onClick={() => handleCreateCard(list._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                  disabled={selectedListId !== list._id || !newCardTitle.trim()}
                >
                  + Add a card
                </button>
              </div>
            </div>
          ))}

          {/* Add another list Form */}
          <div className="bg-white/20 hover:bg-white/30 rounded-xl p-4 w-72 min-w-[18rem] flex flex-col justify-center items-center shadow-lg h-fit">
            <input
              type="text"
              placeholder="Enter list title..."
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              className="px-3 py-2 rounded border-none w-full mb-2 bg-[#22272b] text-white placeholder-gray-400"
            />
            <button
              onClick={handleCreateList}
              className="bg-blue-600/80 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
              disabled={!newListTitle.trim()}
            >
              + Add another list
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}