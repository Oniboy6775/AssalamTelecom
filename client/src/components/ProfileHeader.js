import React from "react";
import { useNavigate } from "react-router-dom";
import { FaAlignLeft, FaHome } from "react-icons/fa";
import { useGlobalContext } from "../context/UserContext";

function ProfileHeader() {
  const { toggleSideBar, isAdmin, isAgent, logoutUser } = useGlobalContext();
  const navigate = useNavigate();
  const logout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="bg-[var(--primary-500)] fixed left-0 right-0 flex justify-between p-2  z-40">
      <div onClick={toggleSideBar} className="btn btn-danger">
        <FaAlignLeft className="btn-danger text-2xl" />
      </div>
      {isAdmin ? (
        <button className=" btn" onClick={() => navigate("/profile")}>
          ADMIN
        </button>
      ) : (
        <button className="btn" onClick={() => navigate("/profile")}>
          {isAgent ? "Agent" : <FaHome className="text-2xl" />}{" "}
        </button>
      )}

      <button className="btn-danger btn" onClick={logout}>
        logout
      </button>
    </div>
  );
}

export default ProfileHeader;
