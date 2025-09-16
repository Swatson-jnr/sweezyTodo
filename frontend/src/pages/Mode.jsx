import { useState } from "react";
import Modal from "../modals/Modal";
// import Modal from "./Modal";

const Mode = () => {
  const [activeModal, setActiveModal] = useState(null);
  // "add" | "edit" | "delete" | null

  return (
    <div className="p-6 space-x-4">
      <button
        onClick={() => setActiveModal("add")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Open Add Modal
      </button>

      <button
        onClick={() => setActiveModal("edit")}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Open Edit Modal
      </button>

      <button
        onClick={() => setActiveModal("delete")}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Open Delete Modal
      </button>

      {/* ADD MODAL */}
      <Modal
        isOpen={activeModal === "add"}
        onClose={() => setActiveModal(null)}
      >
        <h2 className="text-xl font-bold mb-4">Add Item</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Enter item"
            className="border p-2 rounded w-full"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </form>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        isOpen={activeModal === "edit"}
        onClose={() => setActiveModal(null)}
      >
        <h2 className="text-xl font-bold mb-4">Edit Item</h2>
        <form className="space-y-4">
          <input
            type="text"
            defaultValue="Current value"
            className="border p-2 rounded w-full"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Update
          </button>
        </form>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        isOpen={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
      >
        <h2 className="text-xl font-bold mb-4">Delete Item</h2>
        <p>Are you sure you want to delete this item?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={() => setActiveModal(null)}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Confirm Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Mode;
