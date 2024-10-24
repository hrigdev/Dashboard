import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';

const EXTENSION_ID = 'sticky-notes-extension';

if (!window[EXTENSION_ID]) {
  window[EXTENSION_ID] = true;
  
  let noteCounter = 0;

  const createStickyNote = (text = '') => {
    const note = document.createElement('div');
    note.style.color="black";
    note.className = 'sticky-note';
    note.style.position = 'absolute';
    note.style.width = '250px';
    note.style.height = '250px';
    note.style.backgroundColor = '#fef3c7'; // Light yellow
    note.style.border = '1px solid #d97706'; // Amber border
    note.style.padding = '0';
    note.style.zIndex = '1000';
    note.style.borderRadius = '8px';
    note.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

    // Draggable header portion
    const header = document.createElement('div');
    header.className = 'sticky-note-header';
    header.style.height = '30px';
    header.style.backgroundColor = '#d97706'; // Amber
    header.style.cursor = 'move';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.padding = '0 10px';
    header.style.borderTopLeftRadius = '8px';
    header.style.borderTopRightRadius = '8px';

    // Note number display
    const noteNumber = document.createElement('span');
    noteNumber.innerText = `Note ${noteCounter}`;
    noteNumber.style.color = 'white';
    noteNumber.style.fontWeight = 'bold';

    // Close button
    const closeButton = document.createElement('button');
    closeButton.innerText = '×';
    closeButton.style.color = 'white';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '20px';
    closeButton.style.padding = '0 5px';
    closeButton.style.lineHeight = '1';
    closeButton.onmouseover = () => {
      closeButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    };
    closeButton.onmouseout = () => {
      closeButton.style.backgroundColor = 'transparent';
    };
    closeButton.onclick = () => {
      getInputValue();
      note.remove();
    };

    // Menu for editing options
    const menu = document.createElement('div');
    menu.className = 'sticky-note-menu';
    menu.style.display = 'flex';
    menu.style.flexWrap = 'wrap';
    menu.style.justifyContent = 'space-between';
    menu.style.padding = '5px';
    menu.style.backgroundColor = '#f3f4f6'; // Light gray
    menu.style.borderBottom = '1px solid #d1d5db';

    const createButton = (text, onClick) => {
      const button = document.createElement('button');
      button.innerText = text;
      button.onclick = onClick;
      button.style.margin = '2px';
      button.style.padding = '2px 6px';
      button.style.backgroundColor = '#ffffff';
      button.style.color= 'black';
      button.style.border = '1px solid #d1d5db';
      button.style.borderRadius = '4px';
      button.style.cursor = 'pointer';
      button.onmouseover = () => {
        button.style.backgroundColor = '#f9fafb';
      };
      button.onmouseout = () => {
        button.style.backgroundColor = '#ffffff';
      };
      return button;
    };

    const buttons = [
      createButton('B', () => editor.chain().focus().toggleBold().run()),
      createButton('I', () => editor.chain().focus().toggleItalic().run()),
      createButton('S', () => editor.chain().focus().toggleStrike().run()),
      createButton('H1', () => editor.chain().focus().toggleHeading({ level: 1 }).run()),
      createButton('H6', () => editor.chain().focus().toggleHeading({ level: 6 }).run()),
      createButton('•', () => editor.chain().focus().toggleBulletList().run()),
      createButton('1.', () => editor.chain().focus().toggleOrderedList().run()),
      createButton('>', () => editor.chain().focus().toggleBlockquote().run()),
      createButton('Clear', () => editor.commands.clearContent())
    ];

    buttons.forEach(button => menu.appendChild(button));

    const content = document.createElement('div');
    content.className = 'sticky-note-content';
    content.style.padding = '10px';
    content.style.width = 'calc(100% - 20px)';
    content.style.height = '130px';
    content.style.border = 'none';
    content.style.overflow = 'scroll';
    content.style.backgroundColor = '#fef3c7'; 
    content.style.borderBottomLeftRadius = '8px';
    content.style.borderBottomRightRadius = '8px';

    header.appendChild(noteNumber);
    header.appendChild(closeButton);
    note.appendChild(header);
    note.appendChild(menu);
    note.appendChild(content);

    const scrollY = window.scrollY;
    note.style.top = `${scrollY +30+ Math.random() * 80}px`;
    note.style.left = `${Math.random() * 80}vw`;

    // Dragging functionality
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    header.onmousedown = (e) => {
      isDragging = true;
      offsetX = e.clientX - note.offsetLeft;
      offsetY = e.clientY - note.offsetTop;

      const mouseMoveHandler = (e) => {
        if (isDragging) {
          note.style.left = `${e.clientX - offsetX}px`;
          note.style.top = `${e.clientY - offsetY}px`;
        }
      };

      const mouseUpHandler = () => {
        isDragging = false;
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
      e.preventDefault();
    };

    // Append the note to the document
    document.body.appendChild(note);

    // Initialize Tiptap editor
    const editor = new Editor({
      element: content,
      extensions: [
        StarterKit,
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure({ types: [ListItem.name] }),
      ],
      content: text || '<p style="color: black;"></p>',
      onCreate() {
        this.commands.focus();
      },
    });

    const getInputValue = () => {
      let inputValue= editor.getHTML();
      chrome.runtime.sendMessage({ action: 'noteContent', content: inputValue });
      console.log('Note content:', editor.getHTML());
      return editor.getJSON();
    };

    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .sticky-note-content:focus {
        outline: none !important;
        box-shadow: none !important;
      }
      .sticky-note-content .ProseMirror {
        min-height: 100px;
      }
    `;
    document.head.appendChild(styleElement);

    return editor;
  };

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'addNote') {
      noteCounter++;
      console.log('Creating note number:', noteCounter);
      createStickyNote();
    } else if (request.action === 'ping') {
      sendResponse({ status: 'alive' });
    }
    return true;
  });

  console.log('Content script initialized');
}

