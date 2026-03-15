console.log("PassPing background loaded");

chrome.runtime.onMessage.addListener((message) => {
  console.log("Message received:", message);
  console.log("message.type is:", message.type);

  if (message.type === "TEST_NOTIFICATION") {
    console.log("Inside TEST_NOTIFICATION block");

    try {
      chrome.notifications.create(
        "test-notification",
        {
          type: "basic",
          iconUrl: "icons/bus_icon.png",
          title: "Test Notification",
          message: "Notifications are working!",
          priority: 2,
          requireInteraction: true,
          silent: false
        },
        (notificationId) => {
          console.log("Notification callback fired:", notificationId);

          if (chrome.runtime.lastError) {
            console.error("Notification error:", chrome.runtime.lastError.message);
          }
        }
      );
    } catch (error) {
      console.error("create() threw an error:", error);
    }
  } else {
    console.log("Message type did not match TEST_NOTIFICATION");
  }
});
