import { useState, useEffect } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaSave } from "react-icons/fa";

import "../stylesheets/Settings.css";

import { getDates } from "../helpers/DateHelpers";

type SettingsProps = {
  goBack: () => void;
};

type StoredSettings = {
  reminderDate: number;
  reminderTime: string;
  reminderFrequency: number;
};

function Settings({ goBack }: SettingsProps) {

  const [reminderDate, setReminderDate] = useState<number>(16); 
  const [reminderTime, setReminderTime] = useState<string>("09:00"); 
  const [reminderFrequency, setReminderFrequency] = useState<number>(1); 

  const { currentMonthMaxDate } = getDates();

  const [savedVisible, setSavedVisible] = useState<boolean>(false);

  const toggleSavedVisibility = () => {
    setSavedVisible(true);
  };

  useEffect(() => {
    chrome.storage.sync.get(
        ["reminderDate", "reminderTime", "reminderFrequency"],
        (data: StoredSettings) => {
          setReminderDate(data.reminderDate ?? 16);
          setReminderTime(data.reminderTime ?? "09:00");
          setReminderFrequency(data.reminderFrequency ?? 1);
        }
    );  
  }, []);

  useEffect(() => {
    if (savedVisible) {
        const timer = setTimeout(() => {
            setSavedVisible(false);
        }, 10000); 
        return () => clearTimeout(timer); 
    }
  }, [savedVisible]);

  const saveSettings = (e: React.SubmitEvent) => {
    e.preventDefault();
    chrome.storage.sync.set({
      reminderDate,
      reminderTime,
      reminderFrequency
    });
    console.log("Settings saved:", {
      reminderDate,
      reminderTime,
      reminderFrequency
    });
  };

  return (
    <>
      <div>
        <div className="settings-header">
          <button className="back-btn" onClick={goBack}>
            <IoArrowBackCircle className="back-icon"></IoArrowBackCircle>
            &nbsp;
            Return to Home
          </button>
        </div>

        <div className="divider"></div>

        <form className="settings-form" onSubmit={saveSettings}>
          <label className="form-label" htmlFor="reminder-date">Reminder Date</label>

          <input
            className="form-input"
            type="number"
            id="reminder-date"
            name="reminder-date"
            min="16"
            max={currentMonthMaxDate}
            step="1"
            value={reminderDate}
            onChange={(e) => setReminderDate(parseInt(e.target.value))}
          />
          <p className="addnl-notes">
            Reminders will start on your set date for each month if
            your pass isn't loaded. The default is the 16th as reloads are only available from that point onward.
          </p>

          <label className="form-label" htmlFor="time">Reminder Time</label>
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
            Set the time of day for reminders to be sent.
            The default is 9 AM PST.
          </p>

          <label className="form-label" htmlFor="time">Reminder Frequency</label>
          <input
            className="form-input"
            type="number"
            id="reminder-freq"
            name="reminder-freq"
            min="1"
            max="4"
            value={reminderFrequency}
            onChange={(e) => setReminderFrequency(parseInt(e.target.value))}
          />
          <p className="addnl-notes">
            Set your preferred reminder frequency. The default is once per hour, 
            capped to a max of once every 4 hours.
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
            <p className="saved-confirmation">Your settings have now been updated.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Settings;
