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

  // Include state for is NEXT MONTH loaded?
  // const [isNextMonthLoaded, setIsNextMonthLoaded] = useState(false);

  //  This should give back as an example: 4 for April
  const desiredMonthKey = new Date().toLocaleString("en-US", {
    month: "2-digit",
  });
  //  Verify this by printing directly to console.log to confirm it
  console.log(desiredMonthKey);

  // We need the date to determine if snooze should still be active
  // const currentDate = new Date();

  chrome.storage.sync.get(["loadedMonth", "snoozedUntil"], (data) => {
    console.log("Data from storage:", data.loadedMonth);
    if (data.loadedMonth === desiredMonthKey) {
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
    // We shouldn't be using localStorage here - We need to use the Chrome settings
    // localStorage.setItem("loadedMonth", desiredMonthKey);

    chrome.storage.sync.set({ loadedMonth: desiredMonthKey }, () => {
      console.log("Loaded month saved:", desiredMonthKey);
    });
    setIsLoaded(true);
  };

  const handleClickToUpassWebsite = (url: string | URL | undefined) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // TODO: This component needs to have Status bars for the current month, as well as for next month
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
        <button className="snooze-btn">
          <FaBell className="icon"></FaBell>Snooze Until Tomorrow
        </button>
      </div>
    </>
  );
}

export default Menu;
