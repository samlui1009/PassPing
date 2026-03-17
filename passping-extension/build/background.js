console.log("PassPing background worker loaded");

chrome.alarms.create("upassReloadReminder", {
  when: Date.now(), // Start immediately
  periodInMinutes: 0.5, // Repeat every minute - For development purposes
});

// For troubleshooting and testing - Verified that it works!
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("Setting up alarm for U-Pass reload reminder");
  if (alarm.name == "upassReloadReminder") {
    console.log("Alarm fired! YAY, IT WORKS!");
  }
});

// Notification
chrome.runtime.onMessage.addListener((message) => {
  // Only respond to the specific test message
  if (message?.type !== "TEST_NOTIFICATION") {
    return;
  }

  try {
    chrome.notifications.create(
      "pass-reload-notification",
      {
        type: "basic",
        iconUrl: "icons/bus_icon.png",
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
    console.error("create() threw an error:", error);
  }
});
