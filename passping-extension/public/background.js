console.log("PassPing background loaded");

// This is our U-Pass alarm that gets fired.
// For development purposes, it's set to fire every minute starting immediately.
// You can change the timing as needed for production use.
// The alarm will trigger a notification reminding users to reload their U-Pass for the next month.
chrome.alarms.create("upassReloadReminder", {
  when: Date.now(), // Start immediately
  periodInMinutes: 1, // Repeat every 1 minute now for dev purposes, then do 5 hours (300 minutes): Adjust as needed for production based off user feedback
});

// This is the alarm listener that listens for the "upassReloadReminder" alarm and logs a message when it fires.
// It checks for the current date and time against the user's specified reminder date and time before proceeding to send a notification.
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "upassReloadReminder") {
    console.log("Alarm fired!");

    chrome.storage.sync.get(
      ["reminderDate", "reminderTime", "loadedMonth", "snoozedUntil"],
      (data) => {
        const reminderDate = data.reminderDate;
        const reminderTime = data.reminderTime;
        const snoozedUntil = data.snoozedUntil;

        const now = new Date();
        const today = now.getDate();

        console.log("Current day:", today);
        console.log("Reminder day:", reminderDate);

        // Check 0: Is the current date LESS than the 15th? If so, do nothing and break here. We can't proceed as next months' pass isn't valid yet.
        if (today < 15) {
          console.log("Next months' U-Pass is not available yet. Do nothing.");
          return;
        }

        // Check 1: Is it the right date yet?
        if (today < reminderDate) {
          console.log(
            "It is not yet the users' set reminder date. Do nothing."
          );
          return;
        }

        console.log("Date condition met — ready for next checks!");

        // Check 2: Is it the right time yet?
        const currentTime = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // Set to true for 12-hour format with AM/PM
        });

        console.log("Current time:", currentTime);
        console.log("Reminder time:", reminderTime);

        if (currentTime < reminderTime) {
          console.log(
            "It is not yet the users' set time for reewal notifications. Do nothing."
          );
          return;
        }

        console.log("Time condition met — ready for next checks!");

        // Simpler check implemented here
        // Check 3a: Is next months' pass already loaded?

        // Determine the target month based on the current date and the user's specified reminder date.
        const targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const targetMonthKey = `${String(targetDate.getMonth() + 1).padStart(
          2,
          "0"
        )}-${targetDate.getFullYear()}`;
        const loadedMonth = data.loadedMonth;

        console.log("Target month key:", targetMonthKey);
        console.log("Loaded month key:", loadedMonth);

        if (loadedMonth === targetMonthKey) {
          console.log(
            "The target month has already been loaded. No action required."
          );
          return;
        }

        console.log(
          "Target month not loaded yet. Proceeding to the next check!"
        );

        // THIS IS A TODO AFTER WE FIGURE OUT THE LOGIC
        // Check 4: Did the user click "Snooze/Remind Me Later" on the notification? If so, we should wait 24 hours later before firing the notification again.

        console.log("Today's date:", now);
        console.log(
          "Tomorrow's date for snooze comparison:",
          data.snoozedUntil
        );

        if (now < data.snoozedUntil) {
          console.log(
            "Notification is snoozed until a future date. Do nothing."
          );
          return;
        }
        console.log(
          "Snooze period has passed. Ready to trigger notification if all other conditions are met!"
        );
        console.log(
          "All conditions satisfied! Triggering the notification now!"
        );
        triggerReloadNotification();
      }
    );
  }
});

// So far, the above code is passing the date and time checks
// Without Phase 4 (Snooze button implementation), notifications are getting fired appropriately!

// Helper function - Creates the Reload U-Pass notification that should be fired once all conditionals are met.
// Notification is working fine and is displaying exactly what we need.
function triggerReloadNotification() {
  chrome.notifications.create(
    "pass-reload-notification",
    {
      type: "basic",
      iconUrl: "icons/bus_notification.png",
      title: "U-Pass Reload Notification",
      message: "Time to load next months' U-Pass!",
      priority: 2,
      requireInteraction: true,
      silent: false,
    },
    (notificationId) => {
      console.log("Notification callback fired:", notificationId);

      if (chrome.runtime.lastError) {
        console.error("Notification error:", chrome.runtime.lastError.message);
      }
    }
  );
}
