import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext(null);

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [toast, setToast] = useState({ message: "", type: "info" });

  const notify = (message, type = "info") => {
    setToast({ message, type });
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => setToast({ message: "", type: "info" }), 3000);
  };

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      {toast.message && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded shadow-lg text-white transition
          ${toast.type === "success" ? "bg-green-600" :
             toast.type === "error" ? "bg-red-600" : "bg-blue-600"}`}>
          {toast.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
}
