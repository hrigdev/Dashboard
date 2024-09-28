import "./styles.scss";
import { useEditor } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import { EditorContent } from "@tiptap/react";
const Tiptap = (props) => {
  const editor = useEditor({
      extensions: [
          Color.configure({ types: [TextStyle.name, ListItem.name] }),
          TextStyle.configure({ types: [ListItem.name] }),
          StarterKit,
      ],
      content: props.content,
  });

  useEffect(() => {
      if (editor) {
          editor.commands.setContent(props.content || "");
      }
  }, [props.content, editor]);

  function submit(event) {
      event.preventDefault();
      const html = editor.getHTML();
      props.insert(html);
  }

  if (!editor) {
      return null;
  }

  return (
    <>
      <div className="control-group">
        <div className="button-group">
          <button
            onClick={(event) => {
              editor.chain().focus().toggleBold().run();
              event.preventDefault();
            }}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().toggleItalic().run();
              event.preventDefault();
            }}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().toggleStrike().run();
              event.preventDefault();
            }}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().toggleCode().run();
              event.preventDefault();
            }}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "is-active" : ""}
          >
            Code
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().unsetAllMarks().run();
              event.preventDefault();
            }}
          >
            Clear marks
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().clearNodes().run();
              event.preventDefault();
            }}
          >
            Clear nodes
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().setParagraph().run();
              event.preventDefault();
            }}
            className={editor.isActive("paragraph") ? "is-active" : ""}
          >
            Paragraph
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().toggleHeading({ level: 1 }).run();
              event.preventDefault();
            }}
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().toggleHeading({ level: 2 }).run();
              event.preventDefault();
            }}
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().toggleHeading({ level: 3 }).run();
              event.preventDefault();
            }}
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            H3
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().toggleHeading({ level: 4 }).run();
              event.preventDefault();
            }}
            className={
              editor.isActive("heading", { level: 4 }) ? "is-active" : ""
            }
          >
            H4
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().toggleHeading({ level: 5 }).run();
              event.preventDefault();
            }}
            className={
              editor.isActive("heading", { level: 5 }) ? "is-active" : ""
            }
          >
            H5
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().toggleHeading({ level: 6 }).run();
              event.preventDefault();
            }}
            className={
              editor.isActive("heading", { level: 6 }) ? "is-active" : ""
            }
          >
            H6
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().toggleBulletList().run();
              event.preventDefault();
            }}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet list
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().toggleOrderedList().run();
              event.preventDefault();
            }}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            Ordered list
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().toggleCodeBlock().run();
              event.preventDefault();
            }}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
          >
            Code block
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().toggleBlockquote().run();
              event.preventDefault();
            }}
            className={editor.isActive("blockquote") ? "is-active" : ""}
          >
            Blockquote
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().setHorizontalRule().run();
              event.preventDefault();
            }}
          >
            Horizontal rule
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().setHardBreak().run();
              event.preventDefault();
            }}
          >
            Hard break
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().undo().run();
              event.preventDefault();
            }}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            Undo
          </button>

          <button
            onClick={(event) => {
              editor.chain().focus().redo().run();
              event.preventDefault();
            }}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            Redo
          </button>
        </div>
      </div>
      <div className="text-editor">

      <EditorContent editor={editor} />
      <button onClick={submit}>Submit</button>
      </div>

    </>
  );
};

export default Tiptap;
