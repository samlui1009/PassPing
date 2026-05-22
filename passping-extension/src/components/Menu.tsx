import { useState, useEffect } from "react";

import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaBell, FaExternalLinkAlt } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

import "../stylesheets/Menu.css";

import { handleOnClickToUpassWebsite } from "../helpers/MenuHelpers";

function Menu() {
  const now = new Date();

  // NOTE: getDay() is the day of the week - getDate() is the ACTUAL numerical date. 
  const canLoad = now.getDate() >= 16;

  // Starting state for now is that pending U-Pass is NOT loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Starting state for the "Remind Me Later" button is that it is NOT snoozed
  const [isSnoozed, setIsSnoozed] = useState(false);

  // Starting state for displaying a transient message that should be displayed to the user at the very bottom of the extension
  const [isSnoozedMessage, setIsSnoozedMessage] = useState(false);

  // We have TODAY'S date, in the preferred format that we want
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // We also have TOMORROW'S date
  const nextDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );

  // This is for detecting the TARGET MONTH
  // Convert this as a STRING - This is for the target MONTH check
  const targetMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const targetMonthAsString = `${String(targetMonth.getMonth() + 1).padStart(
    2,
    "0"
  )}-${targetMonth.getFullYear()}`;

  useEffect(() => {
    chrome.storage.sync.get(["loadedMonth", "snoozedUntil"], (data) => {
      if (data.loadedMonth === targetMonthAsString) {
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
      }

      // First, check if it is a String
      if (typeof data.snoozedUntil === "string") {
        // Then, convert it into a Date object
        const snoozedUntil = new Date(data.snoozedUntil);
        if (today < snoozedUntil) {
          setIsSnoozed(true);
          setIsSnoozedMessage(true);
        } else {
          setIsSnoozed(false);
          chrome.storage.sync.remove("snoozedUntil");
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetMonthAsString, isSnoozedMessage]);

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
      chrome.storage.sync.set({ snoozedUntil: nextDay.toString() }, () => {
        setIsSnoozed(true);
        setIsSnoozedMessage(true);
      });
    } else if (isLoaded || isSnoozed) {
      console.log("Already snoozed until tomorrow or pass is already loaded.");
    }
  };

  const handleDisableSnoozedButtonState = () => {
    if (isLoaded || isSnoozed) {
      return true; // Disable if loaded
    } else {
      return false; // Enable otherwise
    }
  };

  return (
    <>
      <div>
        <div className="status-div">
          {!isLoaded && canLoad && (
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
          disabled={!canLoad || isLoaded}
        >
          <div className="icon-div">
            <IoMdCheckmarkCircle className="icon"></IoMdCheckmarkCircle>
          </div>
          Mark Pending Pass as Loaded
        </button>
        <button
          className="menu-btn"
          onClick={() =>
            handleOnClickToUpassWebsite("https://upassbc.translink.ca/")
          }
        >
          <FaExternalLinkAlt className="icon"></FaExternalLinkAlt>Open U-Pass
          Website
        </button>

        <div>
          <button
            className="snooze-btn"
            onClick={handleSnoozeUntil}
            disabled={!canLoad || handleDisableSnoozedButtonState()}
          >
            <FaBell className="icon"></FaBell>Snooze Until Tomorrow
          </button>
        </div>

        {isSnoozedMessage && isSnoozed && !isLoaded && (
          <div className="snoozed-msg-ctn">
            <h3 className="snoozed-message">Snoozed until tomorrow!</h3>
            <p>You will be reminded again tomorrow to check if the next month's U-Pass has been loaded.</p>
          </div>
        )}

        {!canLoad && (
            <div className="too-early-msg-ctn">
                <h3>It's too early to load next months' U-Pass! Come back on the 16th. 🚍</h3>
            </div>
        )}

      </div>

    </>
  );
}

export default Menu;
