import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../../hooks/useTheme";

const ButtonTheme = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <div className="absolute top-5 right-5 flex gap-2">
      <button
        onClick={toggleTheme}
        className={`${
          theme === "light"
            ? "bg-white text-gray-900"
            : "bg-gray-800 text-p-white"
        } rounded-full p-3`}
      >
        {theme === "dark" && <FaMoon size={20} />}
        {theme === "light" && <FaSun size={20} />}
      </button>
    </div>
  );
};

export default ButtonTheme;
