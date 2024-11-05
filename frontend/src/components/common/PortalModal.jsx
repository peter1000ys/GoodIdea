import React from "react";
import ReactDOM from "react-dom";

const PortalModal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`bg-white p-6 rounded shadow-lg max-w-3xl w-full relative ${className}`}
      >
        <button
          onClick={onClose}
          className="absolute text-2xl top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <big>&times;</big>
        </button>
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("portal-root")
  );
};

export default PortalModal;