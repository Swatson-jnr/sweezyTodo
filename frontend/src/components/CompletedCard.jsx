import { Circle, ClipboardCheck, Trash } from "lucide-react";

const CompletedCard = ({ title, description, onDelete }) => {
  return (
    <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mb-4">
      {/* .........Header............. */}
      <div className="flex items-center gap-2 mb-2">
        <ClipboardCheck color="#A1A3AB" size={20} />
        <h1 className="text-[#ff6767] font-bold text-base sm:text-lg">
          Task Completed
        </h1>
      </div>

      {/* ...........Card.......... */}
      <div className="border-2 rounded p-4 border-gray-300 flex flex-col gap-2 w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Circle color="green" size={20} />
            <h1 className="font-bold text-sm sm:text-base break-words">
              {title}
            </h1>
          </div>
          <div>
            <Trash
              onClick={onDelete}
              color="white"
              size={22}
              className="bg-[#ff6767] p-1 rounded cursor-pointer"
            />
          </div>
        </div>

        <p className="text-[#747474] text-sm sm:text-base break-words">
          {description}
        </p>

        <div className="flex justify-end text-sm mt-auto">
          <span className="font-semibold text-green-600">Completed</span>
        </div>
      </div>
    </div>
  );
};

export default CompletedCard;
