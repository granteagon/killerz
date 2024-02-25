chrome.alarms.create({ periodInMinutes: 1 }); // Check every minute for tabs to close.
console.log("Background script running.");

chrome.alarms.onAlarm.addListener(() => {
  console.log("Checking for tabs to close.");
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(tab => {
      console.log(tab.url);
      if (tab.url.includes("zoom.us") && tab.url.includes("postattendee")) {
        console.log("Closing tab: " + tab.url);
        const openedTime = Date.now() - tab.lastAccessed; // Calculate how long the tab has been open.
        console.log("Tab has been open for " + openedTime + " milliseconds.")
        if (openedTime > 1 * 60 * 1000) { // 5 minutes in milliseconds.
          console.log("Tab has been open for " + openedTime + " milliseconds. Closing tab.");
          chrome.tabs.remove(tab.id); // Close the tab.
        }
      }
    });
  });
});