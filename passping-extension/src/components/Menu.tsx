import { useState } from "react";

import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaBell, FaExternalLinkAlt } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

import "../stylesheets/Menu.css";

function Menu() {
  // Starting state for now is that the U-Pass is NOT loaded
  const [isLoaded, setIsLoaded] = useState(false);
 
  // Starting state for the "Remind Me Later" button is that it is NOT snoozed 
  // const [isSnoozed, setIsSnoozed] = useState(false);

  // Key format: "YYYY-MM", e.g. "2024-09" for September 2024
  const currentMonthKey = `${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}`;

  // We need the date to determine if snooze should still be active   
  // const currentDate = new Date();

  chrome.storage.sync.get(["loadedMonth", "snoozedUntil"], (data) => {
    if (data.loadedMonth === currentMonthKey) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }

    // TODO: How do we handle this logic? 
    // if (data.snoozedUntil) {
    //     setIsSnoozed(true);
    // } else {
    //     setIsSnoozed(false);
    // }
  });

  const handleMarkAsLoaded = () => {
    localStorage.setItem("loadedMonth", currentMonthKey);
    setIsLoaded(true);
  };

  const handleClickToUpassWebsite = (url: string | URL | undefined) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="status-div">
        {!isLoaded && (
          <>
            <FaRegCircleXmark className="icon"></FaRegCircleXmark>
            <span>Not Loaded</span>
          </>
        )}
        {isLoaded && (
          <>
            <IoCheckmarkDoneCircleSharp className="icon"></IoCheckmarkDoneCircleSharp>
            <span>Loaded</span>
          </>
        )}
      </div>
      <div className="menu-div">
        <button className="mark-loaded-btn" onClick={handleMarkAsLoaded} disabled={isLoaded}>
          <div className="icon-div">
            <IoMdCheckmarkCircle className="icon"></IoMdCheckmarkCircle>
          </div>
          Mark as Loaded
        </button>
        <button
          className="menu-btn"
          onClick={() =>
            handleClickToUpassWebsite("https://upassbc.translink.ca/")
          }
        >
          <FaExternalLinkAlt className="icon"></FaExternalLinkAlt>Open U-Pass
          Website
        </button>
        <button className="snooze-btn">
          <FaBell className="icon"></FaBell>Snooze Until Tomorrow
        </button>
      </div>
    </>
  );
}

export default Menu;
