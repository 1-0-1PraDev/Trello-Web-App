import { useState, useEffect } from "react";
import "../styles/taskboard.css";
import { useAuth } from "../context/AuthContext";
import UpdateProfile from "./UpdateProfile";
import TaskBoard from "./TaskBoard";
import ProfileImage from "./ProfileImage";
import {
  IconDoubleArrowLeft,
  IconDoubleArrowRight,
  IconHome,
  IconSetting,
} from "./Icons";
import ThemeToggler from "./ThemeToggler";
import { useTheme } from "../context/ThemeContext";

const TaskBoardMain: React.FC = () => {
  const [activeTab, setActiveTab] = useState("taskboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);


  const handleProfileUpdate = () => {
    setActiveTab("taskboard");
  };

  return (
    <div className="main-container">
      <div className={`sidebar ${isSidebarOpen && "sidebar-active"}`}>
        <div
          className="sidebar-toggle-menu"
          onClick={() => setIsSidebarOpen((prevState) => !prevState)}
        >
          {isSidebarOpen ? <IconDoubleArrowLeft /> : <IconDoubleArrowRight />}
        </div>
        <div className="user-profile-bx">
          <div className="user_icon">
            <ProfileImage />
          </div>
          <div className="user_details">
            <h2>{user?.firstname}</h2>
            <p>Team planer</p>
          </div>
        </div>

        <div className="divider"></div>

        <div className="navigation">
          <h4>Menu</h4>
          <ul className="navbar">
            <li 
              onClick={() => setActiveTab("taskboard")} 
              className={`${activeTab === "taskboard" ? "active" : ""}`}
            >
              <IconHome />
              <a href="#">Home</a>
            </li>

            <li 
              onClick={() => setActiveTab("update profile")}
              className={`${activeTab === "update profile" ? "active" : ""}`}  
            >
              <IconSetting />
              <a href="#">Settings</a>
            </li>
          </ul>
        </div>

        <div className="wrapper">
          <ThemeToggler />
        </div>
      </div>

      <>
        {(() => {
          switch (activeTab) {
            case "taskboard":
              return <TaskBoard />;
              break;

            case "update profile":
              return <UpdateProfile onProfileUpdate={handleProfileUpdate} />;
              break;

            default:
              break;
          }
        })()}
      </>
    </div>
  );
};

export default TaskBoardMain;
