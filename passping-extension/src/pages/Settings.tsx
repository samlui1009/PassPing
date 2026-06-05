import { useState, useEffect } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaSave } from "react-icons/fa";

import "../stylesheets/Settings.css";

type SettingsProps = {
  goBack: () => void;
};

type StoredSettings = {
  reminderDate?: number;
  reminderTime?: string;
};

function Settings({ goBack }: SettingsProps) {
  const [reminderDate, setReminderDate] = useState<number>(16); // Default to the 16th
  const [reminderTime, setReminderTime] = useState<string>("09:00"); // Default to 9 AM

  //   Feature to come later  
  //   Permits the user to set the name of their school, which will be used in the reminder message.
  //   const [schoolName, setSchoolName] = useState<string>("");

  const [savedVisible, setSavedVisible] = useState<boolean>(false);

  // Show whether clicking Save Settings will also show the Settings Saved! delivery message
  const toggleSavedVisibility = () => {
    setSavedVisible(true);
  };

  useEffect(() => {
    if (savedVisible) {
        const timer = setTimeout(() => {
            setSavedVisible(false);
        }, 10000); // Hide the message after 5 seconds
    
        return () => clearTimeout(timer); // Clear the timer if the component unmounts
    }

    chrome.storage.sync.get(
      ["reminderDate", "reminderTime"],
      (data: StoredSettings) => {
        setReminderDate(data.reminderDate ?? 16);
        setReminderTime(data.reminderTime ?? "09:00");
      }
    );
  }, [savedVisible]);

  const saveSettings = (e: React.SubmitEvent) => {
    e.preventDefault();

    chrome.storage.sync.set({
      reminderDate,
      reminderTime,
    });

    console.log("Settings saved:", {
      reminderDate,
      reminderTime,
    });
  };

  return (
    <>
      <div>
        <div className="settings-header">
          <button className="back-btn" onClick={goBack}>
            <IoArrowBackCircle className="back-icon"></IoArrowBackCircle>
            Go Back to Home
          </button>
        </div>

        <div className="divider"></div>
        <h1 className="settings-title">Settings</h1>

        <form className="settings-form" onSubmit={saveSettings}>
          <label htmlFor="reminder-date">Reminder Date</label>

          {/* Set the minimum bound for the reminder date to be the 16th - Pass opens up on the 16th */}
          <input
            className="form-input"
            type="number"
            id="reminder-date"
            name="reminder-date"
            min="16"
            max="31"
            step="1"
            value={reminderDate}
            onChange={(e) => setReminderDate(parseInt(e.target.value))}
          />
          <p className="addnl-notes">
            <b>NOTE:</b> Reminders will start on your set date for each month if
            your pass isn't loaded. The default is the 16th as pass reloads are only available from that point onward.
          </p>
          <label htmlFor="time">Reminder Time</label>
          <input
            className="form-input"
            type="time"
            id="reminder-time"
            name="reminder-time"
            min="00:00"
            max="23:59"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          />
          <p className="addnl-notes">
            <b>NOTE:</b> Set the time of day for reminders to be sent.
            The default is 9 AM PST.
          </p>
          <div className="save-btn-div">
            <button
              type="submit"
              className="save-settings-btn"
              onClick={toggleSavedVisibility}
            >
              <FaSave className="icon"></FaSave>
              Save Your Settings
            </button>
          </div>
        </form>

        {savedVisible && (
          <div className="saved-msg-div">
            <h3 className="saved-message">Settings Saved!</h3>
            <p className="saved-confirmation">Your settings have now been updated to:</p>
            <span className="saved-confirmation">New Reminder Date: {reminderDate}</span>
            <span className="saved-confirmation">New Reminder Time: {reminderTime}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default Settings;
