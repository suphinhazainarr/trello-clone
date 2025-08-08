import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the boardId from the URL
import {
  getBoardById, // Service to fetch the board data
  createList,
  createCard,
  updateList,
  deleteList,
  reorderLists,
  updateCard,
  deleteCard,
  reorderCards,
} from "../services/boardService";
import {
  ChevronDown,
  SlidersHorizontal,
  Star,
  Users,
  Share2,
  MoreHorizontal,
  Trash2,
  Edit3,
  X,
  Save,
} from "lucide-react";
import { useNotification } from "./NotificationContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function BoardWorkspace() {
  const { boardId } = useParams(); // Get boardId from the URL, e.g., /board/12345
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const notify = useNotification();

  // State for creating new lists and cards
  const [newListTitle, setNewListTitle] = useState("");
  const [newCardTitle, setNewCardTitle] = useState("");
  const [selectedListId, setSelectedListId] = useState(""); // Tracks which "add card" input is active

  // Card modal state
  const [activeCard, setActiveCard] = useState(null);
  const [cardForm, setCardForm] = useState({ title: "", description: "", labels: "", dueDate: "" });

  // Fetch all board data when the component loads or the boardId changes
  useEffect(() => {
    const fetchBoardData = async () => {
      if (boardId) {
        setLoading(true);
        setError(null);
        try {
          const boardData = await getBoardById(boardId);
          setBoard(boardData);

          const listsData = (boardData.lists || []).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
          setLists(listsData);

          // Organize cards by listId for easy rendering
          const cardsByList = {};
          listsData.forEach(list => {
            const listCards = (list.cards || []).slice().sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
            cardsByList[list._id] = listCards;
          });
          setCards(cardsByList);
        } catch (err) {
          console.error("Failed to fetch board data:", err);
          setError("Board not found or you don't have access.");
          setBoard(null);
          notify("Failed to load board", "error");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBoardData();
  }, [boardId, notify]);

  // Handler to create a new list
  const handleCreateList = async () => {
    if (!newListTitle.trim() || !board) return;
    try {
      const newList = await createList(board._id, newListTitle, lists.length);
      setLists([...lists, newList]);
      setNewListTitle(""); // Reset input
      notify("List created!", "success");
    } catch (err) {
      console.error("Failed to create list:", err);
      notify("Failed to create list", "error");
    }
  };

  // Handler to create a new card in a specific list
  const handleCreateCard = async (listId) => {
    if (!newCardTitle.trim()) return;
    try {
      const newCard = await createCard(listId, newCardTitle, "", [], [], null, (cards[listId]?.length || 0));
      // Update the cards state for the specific list
      setCards(prevCards => ({
        ...prevCards,
        [listId]: [...(prevCards[listId] || []), newCard],
      }));
      setNewCardTitle(""); // Reset input
      setSelectedListId(""); // Deactivate input
      notify("Card created!", "success");
    } catch (err) {
      console.error("Failed to create card:", err);
      notify("Failed to create card", "error");
    }
  };

  // Rename a list (simple prompt)
  const handleRenameList = async (listId) => {
    const current = lists.find(l => l._id === listId);
    const title = window.prompt("Rename list", current?.title || "");
    if (title == null || !title.trim()) return;
    try {
      const updated = await updateList(listId, { title: title.trim() });
      setLists(prev => prev.map(l => (l._id === listId ? { ...l, title: updated.title } : l)));
      notify("List renamed", "success");
    } catch (e) {
      notify("Failed to rename list", "error");
    }
  };

  // Delete a list
  const handleDeleteList = async (listId) => {
    if (!window.confirm("Delete this list? Cards inside will also be removed from the board view.")) return;
    try {
      await deleteList(listId);
      setLists(prev => prev.filter(l => l._id !== listId));
      setCards(prev => {
        const copy = { ...prev };
        delete copy[listId];
        return copy;
      });
      notify("List deleted", "success");
    } catch (e) {
      notify("Failed to delete list", "error");
    }
  };

  // Delete a card
  const handleDeleteCard = async (listId, cardId) => {
    try {
      await deleteCard(cardId);
      setCards(prev => ({
        ...prev,
        [listId]: (prev[listId] || []).filter(c => c._id !== cardId),
      }));
      notify("Card deleted", "success");
    } catch (e) {
      notify("Failed to delete card", "error");
    }
  };

  // Card modal open
  const openCardModal = (listId, card) => {
    setActiveCard({ ...card, listId });
    setCardForm({
      title: card.title || "",
      description: card.description || "",
      labels: (card.labels || []).join(", "),
      dueDate: card.dueDate ? new Date(card.dueDate).toISOString().slice(0, 10) : "",
    });
  };

  // Card modal save
  const saveCardModal = async () => {
    if (!activeCard) return;
    try {
      const payload = {
        title: cardForm.title,
        description: cardForm.description,
        labels: cardForm.labels ? cardForm.labels.split(",").map(s => s.trim()).filter(Boolean) : [],
        dueDate: cardForm.dueDate || null,
      };
      const updated = await updateCard(activeCard._id, payload);
      setCards(prev => ({
        ...prev,
        [activeCard.listId]: (prev[activeCard.listId] || []).map(c => c._id === activeCard._id ? { ...c, ...updated } : c),
      }));
      setActiveCard(null);
      notify("Card updated", "success");
    } catch (e) {
      notify("Failed to update card", "error");
    }
  };

  // Drag end handler for lists and cards
  const onDragEnd = async (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;

    if (type === "LIST") {
      // Reorder lists locally
      const newLists = Array.from(lists);
      const [removed] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, removed);
      // Reindex positions
      const orderedIds = newLists.map((l) => l._id);
      setLists(newLists.map((l, idx) => ({ ...l, position: idx })));
      try {
        await reorderLists(board._id, orderedIds);
      } catch (e) {
        notify("Failed to persist list order", "error");
      }
      return;
    }

    // CARD drag
    const startListId = source.droppableId;
    const endListId = destination.droppableId;

    if (startListId === endListId) {
      // Reorder within the same list
      const newCards = Array.from(cards[startListId] || []);
      const [moved] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, moved);
      setCards(prev => ({ ...prev, [startListId]: newCards.map((c, idx) => ({ ...c, position: idx })) }));
      try {
        await reorderCards(startListId, null, newCards.map(c => c._id));
      } catch (e) {
        notify("Failed to persist card order", "error");
      }
    } else {
      // Move to another list
      const startCards = Array.from(cards[startListId] || []);
      const destCards = Array.from(cards[endListId] || []);
      const [moved] = startCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, moved);
      setCards(prev => ({
        ...prev,
        [startListId]: startCards.map((c, idx) => ({ ...c, position: idx })),
        [endListId]: destCards.map((c, idx) => ({ ...c, position: idx, listId: endListId })),
      }));
      try {
        await reorderCards(startListId, endListId, startCards.map(c => c._id), destCards.map(c => c._id));
      } catch (e) {
        notify("Failed to persist card move", "error");
      }
    }
  };

  if (loading) {
    // Skeletons for lists and cards
    return (
      <section className="flex-1 flex flex-col h-full rounded-2xl shadow-lg overflow-hidden relative">
        <div className="flex-1 bg-cover bg-center relative p-8">
          <div className="flex gap-6 overflow-x-auto pb-4 h-full">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-[#181c20] rounded-xl p-3 w-72 min-w-[18rem] shadow-lg flex flex-col h-fit animate-pulse"
              >
                <div className="h-6 bg-gray-700 rounded mb-4 w-2/3"></div>
                <div className="flex flex-col gap-2 mb-2">
                  {[1, 2].map((m) => (
                    <div
                      key={m}
                      className="bg-gray-800 rounded p-3 h-6 w-full"
                    ></div>
                  ))}
                </div>
                <div className="mt-auto">
                  <div className="h-10 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-8 bg-gray-800 rounded w-full"></div>
                </div>
              </div>
            ))}
            {/* Add another list skeleton */}
            <div className="bg-white/20 rounded-xl p-4 w-72 min-w-[18rem] flex flex-col justify-center items-center shadow-lg h-fit animate-pulse">
              <div className="h-6 bg-gray-700 rounded w-2/3 mb-4"></div>
              <div className="h-10 bg-gray-800 rounded w-full"></div>
            </div>
          </div>
        </div>
      </section>
    );
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board-droppable" direction="horizontal" type="LIST">
            {(provided) => (
              <div className="flex gap-6 overflow-x-auto pb-4 h-full" ref={provided.innerRef} {...provided.droppableProps}>
                {/* Render Lists */}
                {lists.map((list, listIndex) => (
                  <Draggable key={list._id} draggableId={list._id} index={listIndex}>
                    {(listProvided) => (
                      <div
                        ref={listProvided.innerRef}
                        {...listProvided.draggableProps}
                        className="bg-[#181c20] rounded-xl p-3 w-72 min-w-[18rem] shadow-lg flex flex-col h-fit"
                      >
                        <div className="font-bold mb-2 text-white flex items-center justify-between" {...listProvided.dragHandleProps}>
                          <span>{list.title}</span>
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleRenameList(list._id)} title="Rename" className="text-gray-400 hover:text-white"><Edit3 className="w-5 h-5" /></button>
                            <button onClick={() => handleDeleteList(list._id)} title="Delete" className="text-gray-400 hover:text-red-400"><Trash2 className="w-5 h-5" /></button>
                            <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
                          </div>
                        </div>

                        <Droppable droppableId={list._id} type="CARD">
                          {(cardsProvided) => (
                            <div className="flex flex-col gap-2 mb-2" ref={cardsProvided.innerRef} {...cardsProvided.droppableProps}>
                              {(cards[list._id] || []).map((card, cardIndex) => (
                                <Draggable key={card._id} draggableId={card._id} index={cardIndex}>
                                  {(cardProvided) => (
                                    <div
                                      ref={cardProvided.innerRef}
                                      {...cardProvided.draggableProps}
                                      {...cardProvided.dragHandleProps}
                                      className="bg-white rounded p-3 shadow text-gray-900 cursor-pointer flex items-center justify-between"
                                      onClick={() => openCardModal(list._id, card)}
                                    >
                                      <span className="truncate pr-2">{card.title}</span>
                                      <button
                                        className="text-gray-500 hover:text-red-500"
                                        onClick={(e) => { e.stopPropagation(); handleDeleteCard(list._id, card._id); }}
                                        title="Delete card"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {cardsProvided.placeholder}
                            </div>
                          )}
                        </Droppable>

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
                    )}
                  </Draggable>
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

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Card Details Modal */}
      {activeCard && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#0d1117] text-white w-full max-w-xl rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Card</h3>
              <button className="text-gray-400 hover:text-white" onClick={() => setActiveCard(null)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300">Title</label>
                <input
                  className="mt-1 w-full bg-[#111827] border border-gray-700 rounded px-3 py-2"
                  value={cardForm.title}
                  onChange={(e) => setCardForm(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Description</label>
                <textarea
                  className="mt-1 w-full bg-[#111827] border border-gray-700 rounded px-3 py-2 min-h-[120px]"
                  value={cardForm.description}
                  onChange={(e) => setCardForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Labels (comma separated)</label>
                <input
                  className="mt-1 w-full bg-[#111827] border border-gray-700 rounded px-3 py-2"
                  value={cardForm.labels}
                  onChange={(e) => setCardForm(prev => ({ ...prev, labels: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Due date</label>
                <input
                  type="date"
                  className="mt-1 w-full bg-[#111827] border border-gray-700 rounded px-3 py-2"
                  value={cardForm.dueDate}
                  onChange={(e) => setCardForm(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 flex items-center gap-2" onClick={() => setActiveCard(null)}>
                <X className="w-4 h-4" /> Cancel
              </button>
              <button className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 flex items-center gap-2" onClick={saveCardModal}>
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}