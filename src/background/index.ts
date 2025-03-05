console.log("[BACKGROUND] Background script loaded and running");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("[BACKGROUND] Received message:", message);
  console.log("[BACKGROUND] Message sender tab url:", sender.tab?.url);
  console.log("[BACKGROUND] Message sender:", sender);

  if (message.action === "extractEmailData") {
    console.log("[BACKGROUND] Attempting to get active tab");
    // Get the active tab first
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const activeTab = tabs[0];
      if (!activeTab?.id) {
        console.error("[BACKGROUND] No active tab found");
        return;
      }

      console.log("[BACKGROUND] Active tab found:", activeTab);

      // Check if we're on a Gmail page
      if (!activeTab.url?.includes("mail.google.com")) {
        console.error("[BACKGROUND] Not a Gmail page:", activeTab.url);
        return;
      }

      // Array of possible file paths to try
      const possiblePaths = [
        "/contents/index.js",
        "contents/index.js",
        "/src/contents/index.js",
        "src/contents/index.js",
        "/dist/contents/index.js",
        "dist/contents/index.js"
      ];

      let scriptExecuted = false;

      for (const filePath of possiblePaths) {
        try {
          console.log("[BACKGROUND] Attempting to execute script from path:", filePath);
          await chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            files: [filePath]
          });
          console.log("[BACKGROUND] Content script executed successfully from path:", filePath);
          scriptExecuted = true;
          break;
        } catch (error) {
          console.error(`[BACKGROUND] Failed to execute script from path ${filePath}:`, error);
        }
      }

      if (!scriptExecuted) {
        console.error("[BACKGROUND] Failed to execute content script from any path");
        // Try inline script injection as fallback
        try {
          console.log("[BACKGROUND] Attempting inline script injection");
          await chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: () => {
              console.log("[CONTENT] Inline script executing");
              const extractEmailData = () => {
                let sender = "";
                let subject = "";
                let body = "";

                // Extract sender (Gmail-specific selector)
                const senderElement = document.querySelector('.gD');
                if (senderElement) {
                  sender = senderElement.getAttribute('email') || senderElement.textContent || '';
                }

                // Extract subject (Gmail-specific selector)
                const subjectElement = document.querySelector('h2.hP');
                if (subjectElement) {
                  subject = subjectElement.textContent || '';
                }

                // Extract body (Gmail-specific selector)
                const bodyElement = document.querySelector('.a3s');
                if (bodyElement) {
                  body = bodyElement.textContent || '';
                }

                if (sender || subject || body) {
                  chrome.runtime.sendMessage({ sender, subject, body });
                }
              };

              extractEmailData();
            }
          });
          console.log("[BACKGROUND] Inline script injection successful");
        } catch (error) {
          console.error("[BACKGROUND] Inline script injection failed:", error);
        }
      }
    });
  } else if (message.sender || message.subject || message.body) {
    console.log("[BACKGROUND] Relaying email data to UI:", message);
    // Relay the extracted email data to the UI
    chrome.runtime.sendMessage(message).catch((error) => {
      console.error("[BACKGROUND] Error relaying message to UI:", error);
    });
  }
});

console.log("[PANEL] Setting up side panel behavior...");
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error("[PANEL] Error setting panel behavior:", error));

// Handle extension icon clicks
chrome.action.onClicked.addListener((tab) => {
  console.log("[CLICK] Extension icon clicked, tab:", tab);
  if (tab.windowId) {
    console.log("[CLICK] Opening side panel for window:", tab.windowId);
    chrome.sidePanel.open({ windowId: tab.windowId })
      .catch((error) => console.error("[CLICK] Error opening side panel:", error));
  } else {
    console.error("[CLICK] No window ID found for tab:", tab);
  }
}); 