console.log("PassPing background listener loaded");

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const targetMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
const targetMonthAsString = targetMonth.toLocaleDateString("en-CA", {
  month: "long",
  year: "numeric",
});

// We use this listener to set default values for the reminder date and time when the extension is installed.
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(
    ["reminderDate", "reminderTime", "reminderFrequency"],
    (data) => {
      if (
        data.reminderDate == null &&
        data.reminderTime == null &&
        data.reminderFrequency == null
      ) {
        chrome.storage.sync.set(
          {
            reminderDate: 16,
            reminderTime: "09:00",
            reminderFrequency: 1,
          },
          () => {
            console.log("Default settings saved on install.");
            console.log("Default reminder date:", reminderDate);
            console.log("Default reminder time:", reminderTime);
            console.log("Default reminder frequency: ", reminderFrequency);
          }
        );
      }
      reminderFrequency = reminderFrequency * 60;
    }
  );
  // This is our U-Pass alarm that gets fired. For development purposes, it's set to fire every minute starting immediately.
  // Upon deployment, fire the alarm every 3 hours (180 minutes)
  // The alarm will trigger a notification reminding users to reload their U-Pass for the next month
  // Because the alarm is set to fire in units of minutes, that means we need to multiply by 60 to convert hours to minutes for the reminder frequency. For example, if the user sets a reminder frequency of 3 hours, we need to set the alarm to fire every 180 minutes (3 hours * 60 minutes/hour).
  chrome.alarms.create("upassReloadReminder", {
    when: today.getTime(),
    periodInMinutes: reminderFrequency,
  });
});

// This is the alarm listener that listens for the "upassReloadReminder" alarm and logs a message when it fires.
// It checks for the current date and time against the user's specified reminder date and time before proceeding to send a notification.
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "upassReloadReminder") {
    console.log("U-Pass renewal alarm has been fired!");

    chrome.storage.sync.get(
      ["reminderDate", "reminderTime", "loadedMonth", "snoozedUntil"],
      (data) => {
        const reminderDate = data.reminderDate;
        const reminderTime = data.reminderTime;

        // const now = new Date();
        // const today = now.getDate();

        console.log("Current day:", today);
        console.log("Reminder day:", reminderDate);

        // Check 0: Is the current date LESS than the 16th? If so, do nothing and break here. We can't proceed as next months' pass isn't valid yet.
        if (today.getDate() < 16) {
          console.log("Next months' U-Pass is not available yet. Do nothing.");
          return;
        }

        console.log("Current date is past the 16th — ready for next checks!");

        // Check 1: Is it the right date yet?
        if (today.getDate() < reminderDate.getDate()) {
          console.log(
            "It is not yet the users' set reminder date. Do nothing."
          );
          return;
        }

        console.log("Date condition met — ready for next checks!");

        // Check 2: Is it the right time yet?
        const currentTime = today.toLocaleTimeString("en-US", {
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

        console.log(
          "Tomorrow's date for snooze comparison:",
          data.snoozedUntil
        );

        if (data.snoozedUntil) {
          console.log(
            "Notification is snoozed until a future date. Do nothing."
          );
          return;
        }

        // Simpler check implemented here
        // Check 3a: Is next months' pass already loaded?

        // Determine the target month based on the current date and the user's specified reminder date.
        const targetDate = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          1
        );
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

        // Check 4: Did the user click "Snooze/Remind Me Later" on the notification? If so, we should wait 24 hours later before firing the notification again.
        // const snoozedUntil = data.snoozedUntil;
        // if (snoozedUntil != null) {
        //     console.log("The snooze feature is active. Notifications to be snoozed until: ", snoozedUntil);
        // }
        // if (today < snoozedUntil) {
        //     console.log("Current date is before snoozed until date. Do nothing.");
        //     return;
        // } else {
        //     console.log("Current date is past snoozed until date. Ready to trigger notification!");
        // }

        console.log(
          "All conditions satisfied! Triggering the notification now!"
        );

        triggerReloadNotification();
      }
    );
  }
});

// Helper function - Creates the Reload U-Pass notification that should be fired once all conditionals are met.
// Notification is working fine and is displaying exactly what we need.
function triggerReloadNotification() {
  chrome.notifications.create(
    "pass-reload-notification",
    {
      type: "basic",
      iconUrl: "icons/bus_notification.png",
      title: "U-Pass Reload Notification",
      message: "It's time to load next months' U-Pass!",
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
