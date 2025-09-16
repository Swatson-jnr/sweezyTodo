import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0  backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl inline-block shadow-2xl border border-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-gray-500 float-right mb-2 cursor-pointer ml-3"
          onClick={onClose}
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
