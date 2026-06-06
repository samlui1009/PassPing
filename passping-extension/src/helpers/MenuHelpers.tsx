// Helper function: Designed to allow users to simply click into the U-Pass website for easy access 
export const handleOnClickToUpassWebsite = (url: string | URL | undefined) => {
    window.open(url, "_blank", "noopener,noreferrer");
};

// Helper function: Handles the Snoozed Until Tomorrow internal logic for Chrome storage
export const handleSnoozedUntil = (isLoaded: boolean, isSnoozed: boolean, 
    setIsSnoozed: React.Dispatch<React.SetStateAction<boolean>>, 
    setIsSnoozedMessage: React.Dispatch<React.SetStateAction<boolean>>,
    tomorrow: Date) => {
        if (!isLoaded && !isSnoozed) {
            console.log("Notifications have been snoozed until tomorrow!");
            chrome.storage.sync.set({
              snoozedUntil: tomorrow.toString()
            }, () => {
                setIsSnoozed(true);
                setIsSnoozedMessage(true);
            });
        } else if (isLoaded || isSnoozed) {
            console.log("Notifications are snoozed until tomorrow, or the U-Pass has already been loaded.")
        }
    };

// Helper function: Designed to handle the "Snooze Until Tomorrow" state for the button by passing in 2 separate states: 
// If the monthly pass has already been loaded, OR, if button was clicked and triggered a "Snooze Until Tomorrow".
export const handleDisableSnoozedButtonState = (loadedPass: boolean, isSnoozed: boolean) => {
    if (loadedPass || isSnoozed) {
      return true; // Disable if loaded
    } else {
      return false; // Enable otherwise
    }
};

// Helper method: This method handles marking next months' U-Pass as loaded. Because we are using TypeScript, 
// We need to set the state value for the state setter function as a React.Dispatch with a React.SetStateAction of type boolean. 
// This is because the "loadedPass" state is a boolean value, and we need to ensure that the state setter function is correctly typed to accept a boolean value during state updates. 
export const handleMarkAsLoaded = (targetMonth: string, setLoadedPass: 
    React.Dispatch<React.SetStateAction<boolean>>
) => {
    chrome.storage.sync.set({ loadedMonth: targetMonth }, () => {
      console.log("Loaded month saved");
      setLoadedPass(true);
    });
};

