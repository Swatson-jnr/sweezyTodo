import { useState } from "react";
import Modal from "../modals/Modal";
import { apiClient } from "../api/Client";
import { toast } from "react-toastify";

const AddTodo = ({ activeModal, setActiveModal, getAllTodos }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Moderate");

  const addTodo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { title, description, priority };
      const response = await apiClient.post(`/api/todo/add`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(response.data.message);
      setTitle("");
      setDescription("");
      setActiveModal(null);
      await getAllTodos();
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={activeModal === "add"} onClose={() => setActiveModal(null)}>
      <div className="border-2 rounded shadow-xl border-gray-300 p-5 mx-auto my-10 w-full max-w-lg md:w-190">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-semibold border-b-2 border-[#ff6767] text-lg">
            Add Task
          </h1>
        </div>

        <form onSubmit={addTodo} className="flex flex-col gap-4">
          {/* ...............Title............ */}
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="font-medium">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Todo Title"
              className="border rounded w-full py-2 px-3 outline-none"
              required
            />
          </div>

          {/* ..........Priority............... */}
          <div className="flex flex-col gap-1">
            <label htmlFor="priority" className="font-medium">
              Priority
            </label>
            <select
              className="border rounded w-full py-2 px-3 outline-none"
              onChange={(e) => setPriority(e.target.value)}
              value={priority}
              required
            >
              <option value="Extreme">Extreme</option>
              <option value="Moderate">Moderate</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* ..............Description............. */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              className="border rounded w-full py-2 px-3 outline-none h-32 sm:h-40 resize-none"
              required
            />
          </div>

          {/* ...........Buttons........... */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
            <button
              type="submit"
              className="bg-[#ff6767] cursor-pointer text-white font-semibold py-2 px-4 rounded w-full sm:w-auto text-center"
            >
              {loading ? "Adding..." : "Add Task"}
            </button>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="bg-gray-400 cursor-pointer text-white font-semibold py-2 px-4 rounded w-full sm:w-auto text-center"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddTodo;
