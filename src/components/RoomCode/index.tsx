import React from "react";
import { FiCopy } from "react-icons/fi";

type RoomCodeType = {
  code: string;
};

const RoomCode: React.FC<RoomCodeType> = ({ code }) => {
  function copyRoomCodeToClipBoard() {
    navigator.clipboard.writeText(code);
  }
  return (
    <button
      onClick={copyRoomCodeToClipBoard}
      className="flex items-center w-full"
    >
      <span className="bg-blue-700 p-2.5 px-3 rounded-l-lg">
        <FiCopy size={18} color="#fff" />
      </span>
      <span
        className="
          px-4 py-2 flex items-center border border-blue-700 rounded-r-lg 
          text-sm truncate dark:text-p-white-light dark:bg-blue-500 dark:hover:bg-blue-600
          "
      >
        <p>{code}</p>
      </span>
    </button>
  );
};

export default RoomCode;
