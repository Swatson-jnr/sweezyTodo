import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Menu, Plus } from "lucide-react";
import list from "../assets/list.png";
import TodoCard from "../components/TodoCard";
import Tile from "../components/Tile";
import CompletedCard from "../components/CompletedCard";
import { apiClient } from "../api/Client";
import { Navigate } from "react-router-dom";
import panda from "../assets/panda.png";
import hand from "../assets/hand.png";
import DeleteTodo from "../modals/DeleteTodo";
import AddTodo from "../modals/AddTodo";
import EditTodo from "../modals/EditTodo";
import DeleteCompleted from "../modals/DeleteCompleted";
const Home = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);

  const getAllTodos = async () => {
    try {
      const response = await apiClient.get("/api/todo/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllTodos(response.data.todos.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const response = await apiClient.get("api/user/data", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserData(response.data.userData);
    } catch (error) {
      console.log(error);
    }
  };

  const completedTodos = allTodos.filter((todo) => todo.completed === true);
  const Todos = allTodos.filter((todo) => todo.completed === false);
  const filteredTodos = Todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getAllTodos();
    getUserData();
  }, []);

  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* ..........Sidebar.......... */}
        <div
          className={`bg-white shadow-md transition-all duration-300 ${
            sidebarOpen ? "w-64" : "w-0"
          } overflow-hidden`}
        >
          {sidebarOpen && (
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          )}
        </div>

        {/* ...........Main Content.................... */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-white">
          <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* .......Toggle Sidebar........... */}
          <button
            className="mb-4 flex items-center gap-2 text-green-700 font-semibold ml-4 sm:ml-6"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <Menu className="w-5 h-5 cursor-pointer" />
          </button>

          <h1 className="mb-6 ml-4 sm:ml-6 text-2xl sm:text-3xl font-bold flex items-center">
            Welcome, {userData.name}
            <img src={hand} alt="" className="ml-3 w-6 h-6 sm:w-7 sm:h-7" />
          </h1>

          {/* ............Cards Container.......... */}

          <div className="flex flex-col md:flex-row justify-center items-start gap-4 sm:gap-6 px-4 sm:px-6">
            {/* Left Column */}
            <div className="flex flex-col gap-4 w-full md:w-3/5 shadow p-4 sm:p-5 rounded border border-gray-300">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <img src={list} alt="" className="w-8 h-8 sm:w-9 sm:h-8" />
                  <h1 className="text-[#ff6767] font-medium text-sm sm:text-base">
                    To-Do
                  </h1>
                </div>
                <div
                  className="flex cursor-pointer items-center gap-1"
                  onClick={() => setActiveModal("add")}
                >
                  <Plus color="#ff6767" />
                  <h1 className="text-sm sm:text-base">Add Task</h1>
                </div>
              </div>

              {/* ...........Todo Cards........... */}

              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo, index) => (
                  <TodoCard
                    key={index}
                    title={todo.title}
                    priority={todo.priority}
                    todoId={todo._id}
                    getAllTodos={getAllTodos}
                    createdAt={todo.createdAt}
                    description={todo.description}
                    onEdit={() => {
                      setSelectedTodo(todo);
                      setActiveModal("edit");
                    }}
                    onDelete={() => {
                      setSelectedTodo(todo);
                      setActiveModal("delete");
                    }}
                  />
                ))
              ) : (
                <div className="flex flex-col justify-center items-center h-60 sm:h-80">
                  <img
                    src={panda}
                    alt="No todos"
                    className="mb-4 w-24 sm:w-32"
                  />
                  <h1 className="text-gray-700 text-base sm:text-lg font-semibold">
                    You have no Todos available
                  </h1>
                </div>
              )}
            </div>

            {/* ...............Right side of the dashboard........... */}

            <div className="flex flex-col gap-6 w-full md:w-2/5 shadow p-4 sm:p-5 rounded border border-gray-300">
              {/* ...........Summary Tiles..................... */}
              <div className="flex flex-col gap-4 border-b pb-4">
                <Tile
                  title={"Number of All Todos"}
                  amount={allTodos.length}
                  onRefresh={getAllTodos}
                />
                <Tile
                  title={"Number of Completed Todos"}
                  amount={completedTodos.length}
                  onRefresh={getAllTodos}
                />
              </div>

              {/* ..............Completed Todos.................. */}
              <div className="flex flex-col gap-2">
                {completedTodos.length > 0 ? (
                  completedTodos.map((todo, index) => (
                    <CompletedCard
                      key={index}
                      title={todo.title}
                      description={todo.description}
                      onDelete={() => {
                        setSelectedTodo(todo);
                        setActiveModal("delete");
                      }}
                    />
                  ))
                ) : (
                  <p className="text-gray-600 text-sm sm:text-base">
                    No completed todos yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ............Modals............... */}
      <AddTodo
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        getAllTodos={getAllTodos}
        setAllTodos={setAllTodos}
      />
      {Todos.map((todo, index) => (
        <div key={index}>
          <EditTodo
            todoId={selectedTodo?._id}
            todoData={selectedTodo}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            getAllTodos={getAllTodos}
          />
          <DeleteTodo
            todoId={selectedTodo?._id}
            activeModal={activeModal}
            getAllTodos={getAllTodos}
            setActiveModal={setActiveModal}
          />
        </div>
      ))}

      {completedTodos.map((completed) => (
        <DeleteCompleted
          key={completed._id}
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          getAllTodos={getAllTodos}
          todoId={selectedTodo?._id}
        />
      ))}
    </>
  );
};

export default Home;
