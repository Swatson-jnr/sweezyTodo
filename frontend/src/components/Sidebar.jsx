import React, { useActionState, useEffect, useState } from "react";
import {
  Menu,
  X,
  Home,
  BarChart3,
  Tractor,
  LogOut,
  User2,
  ClipboardCheck,
  Puzzle,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { apiClient } from "../api/Client";

const Sidebar = ({ isOpen, onClose, className = "" }) => {
  const [userData, setUserData] = useState([]);

  //....... menu items and their routes........
  const menuItems = [{ icon: Puzzle, label: "Dashboard", href: "/" }];
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Successfully logged out");
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

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {/* ..............Overlay for mobile................... */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* ..........Sidebar.................... */}
      <div
        className={`
    fixed top-0 left-0 h-full w-64 bg-[#ff6767] text-white z-50 
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:static lg:z-auto
    ${className}
    flex flex-col
  `}
      >
        {/*............ Header............. */}
        <div className="flex items-center justify-between p-4 ">
          <div className="flex flex-col items-center justify-center w-[80%] mx-auto">
            <div className="bg-gray-500 p-5 rounded-full">
              <User2 size={30} />
            </div>
            <h1 className="font-bold">{userData.name || "User"}</h1>
            <h1 className="font-semibold">{userData.email}</h1>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* ............Menu................ */}
        <nav className="mt-8 flex-1">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-[16px] font-semibold mr-7 transition-colors duration-200 
     ${
       isActive
         ? "bg-white text-[#ff6767] rounded ml-2"
         : "text-white hover:bg-white hover:text-[#ff6767]"
     }`
              }
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* ...............SignOut at bottom....................... */}
        <div className="p-4 mt-auto">
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold px-2 py-3 rounded-2xl cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
