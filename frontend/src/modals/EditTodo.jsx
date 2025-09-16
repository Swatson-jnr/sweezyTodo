import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { apiClient } from "../api/Client";
import { toast } from "react-toastify";

const EditTodo = ({
  activeModal,
  setActiveModal,
  todoId,
  todoData,
  getAllTodos,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);
  const editTodo = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { title, description, priority };
    try {
      const response = await apiClient.patch(`/api/todo/${todoId}`, data, {
        headers: {
          "Content-Type": "application/json",
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

  useEffect(() => {
    if (todoData) {
      setTitle(todoData.title || "");
      setDescription(todoData.description || "");
      setPriority(todoData.priority || "");
    }
  }, [todoData]);

  return (
    <Modal isOpen={activeModal === "edit"} onClose={() => setActiveModal(null)}>
      <div className="border-2 rounded shadow-xl border-gray-300 p-5 mx-auto my-10 w-full max-w-lg md:w-190">
        {/* ..................Header.............*/}
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-semibold text-lg sm:text-xl border-b-2 border-[#ff6767] pb-1">
            Edit Task
          </h1>
        </div>

        <form onSubmit={editTodo} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="font-medium text-sm">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              placeholder="Enter Todo Title"
              className="border rounded w-full py-2 px-3 outline-none focus:ring-2 focus:ring-[#ff6767]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="priority" className="font-medium text-sm">
              Priority
            </label>
            <select
              className="border rounded w-full py-2 px-3 outline-none"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              name="priority"
              required
            >
              <option value="Extreme">Extreme</option>
              <option value="Moderate">Moderate</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="font-medium text-sm">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              rows={4}
              placeholder="Enter Description"
              className="border rounded w-full py-2 px-3 outline-none resize-none focus:ring-2 focus:ring-[#ff6767]"
            />
          </div>

          {/* ...............Buttons............... */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
            <button
              type="submit"
              className="bg-[#ff6767] cursor-pointer text-white font-semibold py-2 px-4 rounded w-full sm:w-1/2 text-center hover:bg-red-600 transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Edit Task"}
            </button>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="bg-gray-300 cursor-pointer text-gray-700 font-semibold py-2 px-4 rounded w-full sm:w-1/2 text-center hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditTodo;
