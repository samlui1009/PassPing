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
  
      chrome.storage.sync.get(["reminderDate", "reminderTime", "loadedMonth"], (data) => {
        const reminderDate = data.reminderDate;
        const reminderTime = data.reminderTime;
  
        const now = new Date();
        const today = now.getDate();
  
        console.log("Current day:", today);
        console.log("Reminder day:", reminderDate);
  
        // Check 1: Is it the right date yet?
        if (today < reminderDate) {
          console.log("Too early in the month. Do nothing.");
          return;
        }
   
        console.log("Date condition met — ready for next checks!");

        // Check 2: Is it the right time yet?

        const currentHourAsString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false // Set to true for 12-hour format with AM/PM
        });

        console.log("Current hour:", currentHourAsString);
        console.log("Reminder time:", reminderTime);

        if (currentHourAsString < reminderTime) {
            console.log("Too early in the day. Do nothing.");
            return;
        }

        console.log("Time condition met — ready for next checks!");
        
        // Check 3a: Is the current month already loaded?
        // Requires another Check 3b: Is our target month loaded?

        const targetDate = today < reminderDate ? new Date(now.getFullYear(), now.getMonth(), 1) : new Date(now.getFullYear(), now.getMonth() + 1, 1);

        const targetMonthKey = `${targetDate.getFullYear()}-${String(
            targetDate.getMonth() + 1
          ).padStart(2, "0")}`;
  
        const loadedMonth = data.loadedMonth;

        console.log("Target month key:", targetMonthKey);
        console.log("Loaded month key:", loadedMonth);

        if (loadedMonth === targetMonthKey) {
            console.log(
              "The target month has already been loaded. No action required."
            );
            return;
          }

          console.log("Target month not loaded yet.");
          console.log("All conditions satisfied! Triggering the notification now!");
  
          triggerReloadNotification();

        // THIS IS A TODO AFTER WE FIGURE OUT THE LOGIC
        // Check 4: Did the user click "Snooze/Remind Me Later" on the notification? If so, we should wait until the next alarm to check again.
      });
    }
  });

// So far, the above code is passing the date and time checks
// Without Phase 4 (Snooze button implementation), notifications are getting fired appropriately!

// Helper function - Creates the Reload U-Pass notification that should be fired once all conditionals are met.
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
