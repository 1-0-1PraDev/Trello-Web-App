import { useTheme } from "../context/ThemeContext";
import "../styles/themetoggler.css";
import { IconDarkTheme, IconLightTheme } from "./Icons";

const ThemeToggler: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="theme-toggler">
      <div
        className={`light-btn ${theme === "light" ? "active" : ""}`}
        onClick={() => toggleTheme("light")}
      >
        <IconLightTheme />
        <span>Light</span>
      </div>
      <div
        className={`dark-btn ${theme === "dark" ? "active" : ""}`}
        onClick={() => toggleTheme("dark")}
      >
        <IconDarkTheme />
        <span>Dark</span>
      </div>
    </div>
  );
};

export default ThemeToggler;
