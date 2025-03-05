// Prevent multiple injections of the same script
if (!window.extractEmailDataInjected) {
    window.extractEmailDataInjected = true; // Set a global flag
  
    const extractEmailData = () => {
      let sender = "";
      let subject = "";
      let body = "";
  
      // Extract sender (Gmail-specific selector)
      const senderElement = document.querySelector(".gD");
      if (senderElement) sender = senderElement.getAttribute("email") || senderElement.innerText || "";
  
      // Extract subject (Gmail-specific selector)
      const subjectElement = document.querySelector("h2.hP");
      if (subjectElement) subject = subjectElement.innerText;
  
      // Extract body (Gmail-specific selector)
      const bodyElement = document.querySelector(".a3s");
      if (bodyElement) body = bodyElement.innerText;
  
      console.log("Extracted Email Data:", { sender, subject, body });
  
      // Send the extracted data back to the extension
      chrome.runtime.sendMessage({ sender, subject, body });
    };
  
    extractEmailData();
  }
  