import React from "react";
import { TiThMenu } from "react-icons/ti";
import { useGlobalContext } from "../context/UserContext";
const LandingNav = () => {
  const { toggleNav } = useGlobalContext();
  return (
    <header className="fixed left-0 right-0 top-0 z-20 bg-[var(--primary-500)] text-white flex justify-between   items-center px-3">
      <div className="pt-4 w-[250px] mb-2">
        {/* <img src="./assets/logo.png" alt="" className="img" /> */}
        <h3 className="">AssalamTelecom</h3>
      </div>
      <div onClick={() => toggleNav()} className="">
        <TiThMenu className="text-4xl" />
      </div>
      {/* <div className="none">big nav</div> */}
    </header>
  );
};

export default LandingNav;
