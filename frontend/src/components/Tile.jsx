import { Eye, RefreshCcw } from "lucide-react";
import { useRef, useEffect } from "react";

const Tile = ({ title, amount, icon2, showEye, onRefresh }) => {
  const refreshRef = useRef(null);

  useEffect(() => {
    const refresh = refreshRef.current;
    if (refresh) {
      const handleClick = () => {
        refresh.classList.toggle("move");
        if (onRefresh) onRefresh(); // trigger parent refresh
      };
      refresh.addEventListener("click", handleClick);

      return () => {
        refresh.removeEventListener("click", handleClick);
      };
    }
  }, [onRefresh]);

  return (
    <div className="bg-white shadow w-full min-h-20 text-white px-4 py-3 rounded-xl flex flex-col gap-2">
      <div className="flex gap-2 flex-col justify-center items-start">
        <div className="flex items-center gap-2">
          <h1 className="text-[14px] text-black font-bold">
            {title || "Nothing Here"}
          </h1>

          {showEye && <Eye size={18} className="text-green-500" />}
          {icon2 && !showEye && <div className="text-gray-700">{icon2}</div>}
        </div>
      </div>
      <div className="flex gap-4 items-center justify-between">
        <h1 className="font-bold text-2xl text-black">{amount}</h1>
        <RefreshCcw
          size={20}
          className="cursor-pointer"
          ref={refreshRef}
          color="green"
        />
      </div>
    </div>
  );
};

export default Tile;
