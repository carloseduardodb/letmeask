import React from "react";

const ButtonTheme = () => {
  return (
    <div className="absolute top-5 right-10 flex gap-2">
      <button
        style={{ height: 30, width: 30 }}
        className="bg-white rounded-full border-green-400 border-4"
      ></button>
      <button
        style={{ height: 30, width: 30 }}
        className="bg-gray-800 rounded-full border-2"
      ></button>
      <button
        style={{ height: 30, width: 30 }}
        className="bg-gradient-to-tr to-purple-600 from-blue-700 border-2 rounded-full"
      ></button>
    </div>
  );
};

export default ButtonTheme;
