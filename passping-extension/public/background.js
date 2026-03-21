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

        const currentHour = now.getHours();

        console.log("Current hour:", currentHour);
        console.log("Reminder hour:", reminderTime);

        if (currentHour < reminderTime) {
            console.log("Too early in the day. Do nothing.");
            return;
        }

        console.log("Time condition met — ready for next checks!");
        
        // Check 3: Is the current month already loaded?

        const [, currentMonth] = [now.getMonth() + 1]; // getMonth() returns 0-11, so we add 1
        const loadedMonth = data.loadedMonth;

        console.log("Current month:", currentMonth);

        if (currentMonth === loadedMonth) {
            console.log("Current month already loaded. Do nothing.");
            return;
        }

        // THIS IS A TODO AFTER WE FIGURE OUT THE LOGIC
        // Check 4: Did the user click "Snooze/Remind Me Later" on the notification? If so, we should wait until the next alarm to check again.

        // If ALL checks have passed, then we print out a console log message and send a message to the content script to trigger the notification.
        console.log("All conditions satisfied! Triggering the notificiation now!");

        chrome.runtime.sendMessage({ action: "triggerNotification" });
      });
    }
  });

// This is the notification that should get fired when the alarm goes off. It will alert users to reload their U-Pass for the next month.
chrome.runtime.onMessage.addListener((message) => {

  if (message.action !== "triggerNotification") {
    console.log("Received message with unrecognized action:", message.action);
    return;
  } else {
        try {
            chrome.notifications.create(
            "pass-reload-notification",
            {
                type: "basic",
                iconUrl: "icons/bus_notification.png",
                title: "U-Pass Reload Notification",
                message: "It's time for you to load next month's U-Pass!",
                priority: 2,
                requireInteraction: true,
                silent: false,
            },
            (notificationId) => {
                console.log("Notification callback fired:", notificationId);
    
                if (chrome.runtime.lastError) {
                  console.error(
                  "Notification error:",
                  chrome.runtime.lastError.message
                );
            }
          }
        );
    } catch (error) {
        console.error("Error creating notification:", error);
    }
}});
