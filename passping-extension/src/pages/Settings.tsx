import { IoArrowBackCircle } from "react-icons/io5";

function Settings() {
  return (
    <>
      <div>
        <button className="back-btn">
          <IoArrowBackCircle className="back-icon"></IoArrowBackCircle>
        </button>
        <h1>Settings</h1>
        <form>
            <label htmlFor="reminder-date">Reminder Date:</label>
            <input type="number" id="reminder-date" name="reminder-date" />
            <p>Reminders will start on the set date for each month if your pass isn't loaded.</p>
            <label htmlFor="time">Reminder Time:</label>
            <input type="time" id="reminder-time" name="reminder-time" min="00:00" max="23:59"/>
            <label htmlFor="nag-toggle">Nag Until Completed</label>
            <input type="checkbox" id="nag-toggle" name="nag-toggle" />
            <button type="submit">Save Settings</button>
        </form>
      </div>
    </>
  );
}

export default Settings;
