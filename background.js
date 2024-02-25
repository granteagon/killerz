chrome.alarms.create({ periodInMinutes: 1 }); // Check every minute for tabs to close.

chrome.alarms.onAlarm.addListener(() => {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(tab => {
      if (tab.url.includes("zoom.us") && tab.url.includes("postattendee")) {
        const openedTime = Date.now() - tab.lastAccessed; // Calculate how long the tab has been open.
        if (openedTime > 5 * 60 * 1000) { // 5 minutes in milliseconds.
          chrome.tabs.remove(tab.id); // Close the tab.
        }
      }
    });
  });
});