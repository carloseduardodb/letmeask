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
      <span className="px-4 py-1.5 border border-blue-700 rounded-r-lg text-sm truncate">
        Sala {code}
      </span>
    </button>
  );
};

export default RoomCode;
