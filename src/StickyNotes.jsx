import { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

function StickyNotes() {
  const [content, setContent] = useState({
    date: null,
    id: null,
    content: "",
  });

  const isFirstRender = useRef(true); 

  function addNote() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: "addNote" });
    });
  }

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const activeTab = tabs[0];
      
      try {
        await chrome.tabs.sendMessage(activeTab.id, { action: "ping" });
      } catch (error) {
        await chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          files: ['content.js']
        });
      }
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'noteContent') {
        const currentDate = new Date();
        const dateString = currentDate.toString();
        const id = uuidv4();
        let newEntry = {
          date: dateString,
          id: id,
          content: request.content,
        };
        setContent(newEntry);
        console.log(request.content);
      }
    });

    return () => {
      chrome.runtime.onMessage.removeListener();
    };
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; 
      return;
    }
    console.log('Received note content:', JSON.stringify(content, null, 2));
  }, [content]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button 
        onClick={addNote}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Add sticky note
      </button>
    </div>
  );
}

export default StickyNotes;
