import { useState } from "react";
import Modal from "./Modal";
import { apiClient } from "../api/Client";
import { toast } from "react-toastify";

const DeleteTodo = ({ activeModal, setActiveModal, todoId, getAllTodos }) => {
  const [loading, setLoading] = useState(false);

  const deleteTodo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.delete(`api/todo/delete/${todoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(response.data.message);
      setActiveModal(null);
      await getAllTodos();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        isOpen={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
      >
        <h2 className="text-xl font-semibold mb-4 font-lead-font">
          Delete Todo
        </h2>
        <p className="mb-3">Are you sure you want to delete this Task?</p>
        <div className="flex justify-between gap-3 mt-2">
          <button
            className="bg-green-700 px-2 py-1 text-white cursor-pointer rounded"
            onClick={() => setActiveModal(null)}
          >
            Cancel
          </button>
          <button
            className="bg-red-900 px-2 py-1 text-white cursor-pointer rounded"
            onClick={deleteTodo}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteTodo;
