import React, { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import ProfileHeader from "../components/ProfileHeader";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../context/UserContext";
import { Modal } from "../components/Modal";

function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const {
    getNotification,
    notification,
    isNotificationCheck,
    clearNotification,
  } = useGlobalContext();
  useEffect(() => {
    getNotification();
  }, []);
  return (
    // <div className="bg-[hsl(0,_19%,_89%)] min-h-[calc(100vh_-_50px)] m-auto">
    <div className=" min-h-[calc(100vh_-_50px)] m-auto relative">
      {!isNotificationCheck && notification && (
        <Modal
          title="notifications"
          children={notification}
          buttons={[
            {
              name: "OK",
              handleClick: clearNotification,
              className: "btn-danger",
            },
          ]}
        />
      )}
      <ProfileHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="min-h-full flex self-stretch">
        <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="mt-[4rem] md:ml-[3rem] p-4 w-full min-h-full mx-2 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;
