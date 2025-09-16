import { Check, Circle, Loader, SquarePen, Trash } from "lucide-react";
import { apiClient } from "../api/Client";
import { toast } from "react-toastify";
import { useState } from "react";
import loader from "../assets/loader.mp4";

const TodoCard = ({
  title,
  description,
  onEdit,
  onDelete,
  todoId,
  getAllTodos,
}) => {
  const [loading, setLoading] = useState(false);
  const markAsDone = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.post(
        `api/todo/completed/${todoId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      await getAllTodos();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="border-2 rounded p-4 border-gray-300 flex flex-col h-full max-w-full sm:max-w-[28rem] md:max-w-[32rem] lg:max-w-[36rem]">
        <div className="flex justify-between flex-wrap gap-2">
          <div className="flex items-center">
            <Circle color="blue" size={20} />
            <h1 className="font-bold ml-2">{title}</h1>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Trash
              onClick={onDelete}
              color="white"
              size={22}
              className="bg-[#ff6767] p-1 rounded cursor-pointer"
            />
            <SquarePen
              onClick={onEdit}
              color="white"
              size={22}
              className="bg-[#ff6767] p-1 rounded cursor-pointer"
            />
            {loading ? (
              <video src={loader} className="w-9" loop autoPlay muted />
            ) : (
              <>
                <Check
                  color="white"
                  onClick={markAsDone}
                  size={22}
                  className="bg-[#ff6767] p-1 rounded font-bold cursor-pointer"
                />
              </>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-[#747474] mt-2 break-words mb-9">{description}</p>

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between text-sm gap-2 mt-4 sm:mt-auto">
          <h1>
            <span className="font-bold">Priority:</span> Medium
          </h1>
          <h1>
            <span className="font-bold">Status:</span> Pending
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
