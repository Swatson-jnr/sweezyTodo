import { Bell, Calendar, Search } from "lucide-react";
import React from "react";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="bg-[#F8F8FB]">
      <div className="flex flex-wrap justify-between items-center px-4 py-3 gap-3">
        {/*.... DASHBOARD........... */}
        <div className="font-semibold text-2xl sm:text-3xl">
          <h1>
            Dash<span className="text-[#FF6767]">board</span>
          </h1>
        </div>

        {/* ........Search bar.......... */}
        <div className="flex relative w-full sm:w-auto sm:flex-1 sm:max-w-md">
          <input
            type="search"
            className="w-full sm:w-72 h-9 bg-white border rounded px-3 text-sm outline-none"
            placeholder="Search your task here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-[#FF6767] p-1 rounded-r-md border absolute right-0 md:right-37 top-0 h-9 w-10 flex items-center justify-center">
            <Search color="black" size={18} />
          </button>
        </div>

        {/* .............buttons.................. */}
        <div className="flex gap-2">
          <button className="flex items-center justify-center bg-[#FF6767] rounded-md w-10 h-10">
            <Bell color="white" size={18} />
          </button>
          <button className="flex items-center justify-center bg-[#FF6767] rounded-md w-10 h-10">
            <Calendar color="white" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
