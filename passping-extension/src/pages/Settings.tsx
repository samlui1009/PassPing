import { IoArrowBackCircle } from "react-icons/io5";
import { FaSave } from "react-icons/fa";

// Potential integration to be used for the toggle mechanism
// Refer to AniMori for implementation details
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'; // Import the toggle icons

import "../stylesheets/Settings.css";

type SettingsProps = {
  goBack: () => void;
};

function Settings({ goBack }: SettingsProps) {
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

        <form className="settings-form">
          <label htmlFor="reminder-date">Reminder Date:</label>

          {/* Set the minimum bound for the reminder date to be the 15th - Pass opens up on the 15th */}
          <input
            className="form-input"
            type="number"
            id="reminder-date"
            name="reminder-date"
            min="15"
            max="31"
            step="1"
          />
          <p className="addnl-notes">
            <b>NOTE:</b> Reminders will start on the set date for each month if
            your pass isn't loaded.
          </p>
          <label htmlFor="time">Reminder Time:</label>
          <input
            className="form-input"
            type="time"
            id="reminder-time"
            name="reminder-time"
            min="00:00"
            max="23:59"
          />
          <label htmlFor="nag-toggle">Nag Until Completed:</label>
          <input type="checkbox" id="nag-toggle" name="nag-toggle" />
          <p className="addnl-notes">
            <b>NOTE:</b> If enabled, you will receive pop-up reminders every day
            until your pass is loaded.
          </p>
          <div className="save-btn-div">
            <button type="submit" className="save-settings-btn">
              <FaSave className="icon"></FaSave>
              Save Your Settings
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Settings;
