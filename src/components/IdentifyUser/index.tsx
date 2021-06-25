import React from "react";

type IdentifyUserTypes = {
  name: string;
  author: boolean;
  avatar: string;
};

const IdentifyUser: React.FC<IdentifyUserTypes> = ({
  name,
  author,
  avatar,
}) => {
  console.log(avatar);
  return (
    <div
      className={`flex items-center ${
        !author ? "opacity-95 hover:opacity-100" : ""
      }`}
    >
      <span className="p-0.5 bg-blue-400 rounded-full">
        <img
          src={avatar}
          width={32}
          alt="Sua imagem de usuário do google"
          className="rounded-full"
        />
      </span>
      <h3
        className={`ml-2 text-sm ${
          author ? "font-bold text-p-black" : "text-p-gray-dark"
        }`}
      >
        {name}
      </h3>
    </div>
  );
};

export default IdentifyUser;
