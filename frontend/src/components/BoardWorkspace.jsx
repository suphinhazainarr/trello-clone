import React, { useState } from "react";
import {
  createBoard,
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
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState({});
  const [boardTitle, setBoardTitle] = useState("");
  const [listTitle, setListTitle] = useState("");
  const [cardTitle, setCardTitle] = useState("");
  const [selectedListId, setSelectedListId] = useState("");

  // Create board
  const handleCreateBoard = async () => {
    if (!boardTitle) return;
    const newBoard = await createBoard(boardTitle);
    setBoard(newBoard);
    setLists([]);
    setCards({});
    setBoardTitle("");
  };

  // Create list
  const handleCreateList = async () => {
    if (!listTitle || !board) return;
    const newList = await createList(board._id, listTitle, lists.length);
    setLists([...lists, newList]);
    setCards({ ...cards, [newList._id]: [] });
    setListTitle("");
  };

  // Create card
  const handleCreateCard = async () => {
    if (!cardTitle || !selectedListId) return;
    const newCard = await createCard(selectedListId, cardTitle);
    setCards({
      ...cards,
      [selectedListId]: [...(cards[selectedListId] || []), newCard],
    });
    setCardTitle("");
  };

  return (
    <section className="flex-1 flex flex-col h-full rounded-2xl shadow-lg overflow-hidden relative">
      {/* Board header */}
      <div className="flex items-center justify-between px-8 pt-6 pb-2 z-10 relative">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg text-white">
            {board ? board.title : "No Board"}
          </span>
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
      {/* Board background */}
      <div
        className="flex-1 bg-cover bg-center relative p-8"
        style={{
          backgroundImage:
            "linear-gradient(rgba(24,28,32,0.4),rgba(24,28,32,0.4)),url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')",
        }}
      >
        {/* Create Board */}
        {!board && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Board title"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 mr-2"
            />
            <button
              onClick={handleCreateBoard}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Board
            </button>
          </div>
        )}

        {/* Lists and Cards */}
        {board && (
          <div className="flex gap-6 overflow-x-auto pb-4">
            {lists.map((list) => (
              <div
                key={list._id}
                className="bg-[#181c20] rounded-xl p-4 w-72 min-w-[18rem] shadow-lg flex flex-col"
              >
                <div className="font-bold mb-2 text-white flex items-center justify-between">
                  <span>{list.title}</span>
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </div>
                {/* Cards */}
                <div className="flex flex-col gap-2 mb-2">
                  {(cards[list._id] || []).map((card) => (
                    <div
                      key={card._id}
                      className="bg-white rounded p-3 shadow text-gray-900"
                    >
                      {card.title}
                    </div>
                  ))}
                </div>
                {/* Add Card */}
                <div className="mt-auto">
                  <input
                    type="text"
                    placeholder="Add a card"
                    value={selectedListId === list._id ? cardTitle : ""}
                    onChange={(e) => {
                      setSelectedListId(list._id);
                      setCardTitle(e.target.value);
                    }}
                    className="px-2 py-1 rounded border border-gray-300 mr-2 w-full mb-2"
                  />
                  <button
                    onClick={handleCreateCard}
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 w-full"
                    disabled={selectedListId !== list._id || !cardTitle}
                  >
                    + Add a card
                  </button>
                </div>
              </div>
            ))}
            {/* Add another list */}
            <div className="bg-white/60 rounded-xl p-4 w-72 min-w-[18rem] flex flex-col justify-center items-center shadow-lg">
              <input
                type="text"
                placeholder="List title"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                className="px-4 py-2 rounded border border-gray-300 mb-2 w-full"
              />
              <button
                onClick={handleCreateList}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              >
                + Add another list
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}