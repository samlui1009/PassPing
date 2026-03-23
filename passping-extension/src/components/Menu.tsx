import { useState, useEffect } from "react";

import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaBell, FaExternalLinkAlt } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

import "../stylesheets/Menu.css";

function Menu() {
  // Starting state for now is that pending U-Pass is NOT loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Starting state for the "Remind Me Later" button is that it is NOT snoozed
  // const [isSnoozed, setIsSnoozed] = useState(false);

  const now = new Date();

  // Convert this as a STRING - This is for the target MONTH check   
  const targetMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const targetMonthAsString = `${String(targetMonth.getMonth() + 1).padStart(2, "0")}-${targetMonth.getFullYear()}`; 

  useEffect(() => {
    chrome.storage.sync.get(["loadedMonth"], (data) => {
      if (data.loadedMonth === targetMonthAsString) {
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
      }
    });
  }, [targetMonthAsString]);

  const handleMarkAsLoaded = () => {
    chrome.storage.sync.set({ loadedMonth: targetMonthAsString }, () => {
      console.log("Loaded month saved");
      setIsLoaded(true);
    });
  };


//   const handleMarkAsSnoozed = () => {

//   }

  const handleClickToUpassWebsite = (url: string | URL | undefined) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div>
        <div className="status-div">
          {!isLoaded && (
            <>
              <FaRegCircleXmark className="icon"></FaRegCircleXmark>
              <span>Next Month Not Loaded</span>
            </>
          )}
          {isLoaded && (
            <>
              <IoCheckmarkDoneCircleSharp className="icon"></IoCheckmarkDoneCircleSharp>
              <span>Next Month Loaded!</span>
            </>
          )}
        </div>
      </div>

      <div className="menu-div">
        <button
          className="mark-loaded-btn"
          onClick={handleMarkAsLoaded}
          disabled={isLoaded}
        >
          <div className="icon-div">
            <IoMdCheckmarkCircle className="icon"></IoMdCheckmarkCircle>
          </div>
          Mark Pending Pass as Loaded
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

        {/* We need to fix this up ;_; */}
        <div>
            <button className="snooze-btn">
            <FaBell className="icon"></FaBell>Snooze Until Tomorrow
            </button>
        </div>

      </div>
    </>
  );
}

export default Menu;
