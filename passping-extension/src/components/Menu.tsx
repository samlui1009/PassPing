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
  const [isSnoozed, setIsSnoozed] = useState(false);

  const now = new Date();

  // We have TODAY'S date
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Convert this as a STRING - This is for the target MONTH check
  const targetMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const targetMonthAsString = `${String(targetMonth.getMonth() + 1).padStart(
    2,
    "0"
  )}-${targetMonth.getFullYear()}`;

  // We also have TOMORROW'S date
  const nextDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );

  useEffect(() => {
    chrome.storage.sync.get(["loadedMonth", "snoozedUntil"], (data) => {
      if (data.loadedMonth === targetMonthAsString) {
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
      }

      if (typeof data.snoozedUntil === "string") {
        const snoozedUntil = new Date(data.snoozedUntil);
        if (today < snoozedUntil) {
          setIsSnoozed(true);
        } else {
          setIsSnoozed(false);
          chrome.storage.sync.remove("snoozedUntil");
        }
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetMonthAsString]);

  const handleMarkAsLoaded = () => {
    chrome.storage.sync.set({ loadedMonth: targetMonthAsString }, () => {
      console.log("Loaded month saved");
      setIsLoaded(true);
    });
  };

  // Persistence is achieved now - snoozedUntil is now in the same format as today  
  const handleSnoozeUntil = () => {
      if (!isLoaded && !isSnoozed) {
        console.log("Snoozed until tomorrow");
        setIsSnoozed(true);
      } else if (!isLoaded && isSnoozed) {
        console.log("Already snoozed until tomorrow.");
      } 
        chrome.storage.sync.set({ snoozedUntil: nextDay.toString() }, () => {
            console.log("Snoozed until tomorrow : ", nextDay.toString());
        setIsSnoozed(true);
    });
  };

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

        <div>
          <button 
            className="snooze-btn"
            onClick={handleSnoozeUntil}
            disabled={isSnoozed}
            >
            <FaBell className="icon"></FaBell>Snooze Until Tomorrow
          </button>
        </div>
      </div>
    </>
  );
}

export default Menu;
