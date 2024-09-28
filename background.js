let activeTabId = null;
let startTime = null;
let date = new Date();
let dateString = date.toDateString();
let activeUrl = null;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tabId === activeTabId && tab.url) {
        try {
            const newUrl = new URL(tab.url).hostname;
            if (newUrl !== activeUrl) {
                if (activeUrl) {
                    calcTimeInterval();
                }
                activeUrl = newUrl;
                startTime = Date.now();
            }
        } catch (error) {
        }
    }
});

chrome.tabs.onActivated.addListener(activeInfo => {
    if (activeTabId !== null && startTime !== null) {
        calcTimeInterval();
    }
    activeTabId = activeInfo.tabId;
    chrome.tabs.get(activeTabId, tab => {
        if (tab.url && tab.url != "chrome://newtab/") {
            try {
                activeUrl = new URL(tab.url).hostname;
                startTime = Date.now();
            } catch (error) {
            }
        }
    });
});

chrome.windows.onFocusChanged.addListener(windowId => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        if (activeTabId !== null && startTime !== null) {
            calcTimeInterval();
        }
        activeTabId = null;
        activeUrl = null;
        startTime = null;
    } else {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            if (tabs.length > 0) {
                activeTabId = tabs[0].id;
                if (tabs[0].url) {
                    try {
                        activeUrl = new URL(tabs[0].url).hostname;
                        startTime = Date.now();
                    } catch (error) {
                        console.error("Invalid URL:", tabs[0].url);
                    }
                }
            }
        });
    }
});

function calcTimeInterval() {
    if (startTime && activeUrl) {
        const currentTime = Date.now();
        const timeInterval = currentTime - startTime;

        chrome.storage.local.get(["info"], data => {
            let info = data.info || {};
            if (!info[dateString]) {
                info[dateString] = {};
            }

            if (!info[dateString][activeUrl]) {
                info[dateString][activeUrl] = 0;
            }

            info[dateString][activeUrl] += timeInterval;
            chrome.storage.local.set({ info });
        });

        startTime = currentTime;
    }
}

setInterval(calcTimeInterval, 1000);

chrome.runtime.onStartup.addListener(() => {
    activeTabId = null;
    startTime = null;
    activeUrl = null;
    date = new Date();
    dateString = date.toDateString();
});
