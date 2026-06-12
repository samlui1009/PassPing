import { useState, useEffect } from "react";

import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaBell, FaExternalLinkAlt } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

import "../stylesheets/Menu.css";

import {
  handleOnClickToUpassWebsite,
  handleDisableSnoozedButtonState,
  handleSnoozedUntil,
  handleMarkAsLoaded,
} from "../helpers/MenuHelpers";
import { getDates } from "../helpers/DateHelpers";

function Menu() {
  const { today, tomorrow, targetMonthAsString } = getDates();

  // Starting state for now is that pending U-Pass is NOT loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Starting state for the "Remind Me Later" button is that it is NOT snoozed
  const [isSnoozed, setIsSnoozed] = useState(false);

  // Starting state for displaying a transient message that should be displayed to the user at the very bottom of the extension
  const [isSnoozedMessage, setIsSnoozedMessage] = useState(false);

  // Recall: getDate() returns back the NUMERICAL date
  const canLoad = today.getDate() >= 16;

  useEffect(() => {
    chrome.storage.sync.get(["loadedMonth"], (data) => {
      if (data.loadedMonth === targetMonthAsString) {
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
      }
    });
  });

  useEffect(() => {
    chrome.storage.sync.get(["snoozedUntil"], (data) => {
      // First, check if it is a String
      if (typeof data.snoozedUntil === "string") {
        // Then, convert it into a Date object
        // TODO:  But what time zone is this in?
        const snoozedUntil = new Date(data.snoozedUntil);
        console.log("Retrieved snoozedUntil from storage:", snoozedUntil);

        if (today < snoozedUntil) {
          setIsSnoozed(true);
          setIsSnoozedMessage(true);
        } else {
          setIsSnoozed(false);
          chrome.storage.sync.remove("snoozedUntil");
        }
      }
    });
  }, [targetMonthAsString, isSnoozedMessage, today]);

  return (
    <>
      <div>
        {/* Applied conditional CSS styling to either a "Loaded" or "Not Loaded" state
        If it is LOADED, it displays as green. If it is NOT loaded, it displays as red. */}
        <div className={`status-div ${isLoaded ? "loaded" : "not-loaded"}`}>
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
          onClick={() => handleMarkAsLoaded(targetMonthAsString, setIsLoaded)}
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

        {/* This is the "Snooze Until Tomorrow" button. Upon clicking, it should handle the 
        handleSnoozeUntil method. This button should also be disabled IF it is NOT yet the 16th of the month, 
        or if any of the if/else conditions are triggered inside the handleDisableSnoozedButtonState method */}
        <div>
          <button
            className="snooze-btn"
            onClick={() =>
              handleSnoozedUntil(
                isLoaded,
                isSnoozed,
                setIsSnoozed,
                setIsSnoozedMessage,
                tomorrow
              )
            }
            disabled={
              !canLoad || handleDisableSnoozedButtonState(isLoaded, isSnoozed)
            }
          >
            <FaBell className="icon"></FaBell>Snooze Until Tomorrow
          </button>
        </div>

        {/* If the Snooze button is clicked, next months' U-Pass is NOT loaded, and we wish to display the "Is Snoozed" message,
        display the following message at the bottom of extension. */}
        {isSnoozedMessage && isSnoozed && !isLoaded && (
          <div className="snoozed-msg-ctn">
            <h3 className="snoozed-message">Snoozed until tomorrow!</h3>
            <p>
              You will be reminded again tomorrow to load next month's U-Pass.
            </p>
          </div>
        )}

        {/* If we CANNOT load the U-Pass (As in, the date is too early), display this warning message at the bottom of extension. */}
        {!canLoad && (
          <div className="too-early-msg-ctn">
            <p
              style={{
                fontSize: "15px",
                gap: "2px",
                maxWidth: "325px",
              }}
            >
              It's too early to load next months' U-Pass!
              <br>
              </br>
              Come back on your set reminder date. 🚍
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Menu;
