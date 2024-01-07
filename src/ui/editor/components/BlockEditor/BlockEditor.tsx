'use client'

// import { WebSocketStatus } from '@hocuspocus/provider'
import { EditorContent, useEditor, PureEditorContent } from '@tiptap/react'
import React, { useMemo, useRef,useEffect,useState } from 'react'

import { LinkMenu } from '../menus'

import { useBlockEditor } from '../../hooks/useBlockEditor'

import '../../styles/index.css'
import { ImageResizer } from "@/ui/editor/components/image-resizer";
// import { Sidebar } from '../components/Sidebar'
import { Loader } from '../ui/Loader'

import { createPortal } from 'react-dom'

import ExtensionKit from '../../extensions/extension-kit'
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { useDebouncedCallback } from "use-debounce";
import { useCompletion } from "ai/react";
import { TiptapEditorProps } from './editorProps'
import { getPrevText } from "@/lib/editor";

export const BlockEditor = () => {
  const extensions = ExtensionKit({})
  // const aiState = useAIState()
  const menuContainerRef = useRef(null)
  const editorRef = useRef<PureEditorContent | null>(null)

  const [content, setContent] = useLocalStorage(
    "content",
    "DEFAULT_EDITOR_CONTENT",
  );
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [hydrated, setHydrated] = useState(false);
  const [htmlcontent, sethtmlcontent] = useState("");
  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {

    const json = editor.getJSON();
    // console.log("JSON contentff: ", json);
    // console.log("MYCONTENT: ", content);
    sethtmlcontent(editor.getHTML());
  
    // console.log("HTML: ", editor.getHTML(), typeof editor.getHTML())

    setSaveStatus("Saving...");
    setContent(json);
    // Simulate a delay in saving.
    setTimeout(() => {
      setSaveStatus("Saved");
    }, 500);
  }, 750);

  const editor = useEditor({
    extensions: extensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      setSaveStatus("Unsaved");
      const selection = e.editor.state.selection;
      const lastTwo = getPrevText(e.editor, {
        chars: 2,
      });
      if (lastTwo === "++" && !isLoading) {
        e.editor.commands.deleteRange({
          from: selection.from - 2,
          to: selection.from,
        });
        complete(
          getPrevText(e.editor, {
            chars: 5000,
          }),
        );

        // va.track("Autocomplete Shortcut Used");
      } else {
        debouncedUpdates(e);
      }
    },
    autofocus: "end",
  });

  const { complete, completion, isLoading, stop } = useCompletion({
    id: "novel",
    api: "/api/generate",
    onFinish: (_prompt, completion) => {
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      });
    },
    onError: (err) => {
      toast.error(err.message);
      if (err.message === "You have reached your request limit for the day.") {
        // va.track("Rate Limit Reached");
      }
    },
  });

  const prev = useRef("");

  // Insert chunks of the generated text
  useEffect(() => {
    const diff = completion.slice(prev.current.length);
    prev.current = completion;
    editor?.commands.insertContent(diff);
  }, [isLoading, editor, completion]);

  useEffect(() => {
    // if user presses escape or cmd + z and it's loading,
    // stop the request, delete the completion, and insert back the "++"
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || (e.metaKey && e.key === "z")) {
        stop();
        // console.log(editor)
        if (e.key === "Escape") {
          editor?.commands.deleteRange({
            from: editor.state.selection.from - completion.length,
            to: editor.state.selection.from,
          });
        }
        editor?.commands.insertContent("++");
      }
    };
    const mousedownHandler = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      stop();
      if (window.confirm("AI writing paused. Continue?")) {
        complete(editor?.getText() || "");
      }
    };
    if (isLoading) {
      document.addEventListener("keydown", onKeyDown);
      window.addEventListener("mousedown", mousedownHandler);
    } else {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    };
  }, [stop, isLoading, editor, complete, completion.length]);

  // Hydrate the editor with the content from localStorage.
  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content);
      setHydrated(true);
    }
  }, [editor, content, hydrated]);



  // const providerValue = useMemo(() => {
  //   return {
  //     isAiLoading: aiState.isAiLoading,
  //     aiError: aiState.aiError,
  //     setIsAiLoading: aiState.setIsAiLoading,
  //     setAiError: aiState.setAiError,
  //   }
  // }, [aiState])

  if (!editor) {
    return null
  }
  const aiLoaderPortal = createPortal(<Loader label="AI is now doing its job." />, document.body)
  return (
    // <EditorContext.Provider value={providerValue} >
    <div
    onClick={() => {
      editor?.chain().focus().run();
    }}
    className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 p-12 px-8  sm:rounded-lg sm:border sm:px-12 sm:shadow-lg"
  >
      <div className="flex h-full" ref={menuContainerRef}>
              <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 dark:bg-stone-600 px-2 py-1 text-sm text-stone-400">
            {saveStatus}
          </div>
        {/* <Sidebar isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} editor={editor} /> */}
        <div className="relative flex flex-col flex-1 h-full overflow-hidden">

        { editor?.isActive("image") && <ImageResizer editor={editor} />}
          <EditorContent editor={editor} ref={editorRef} className="flex-1 overflow-y-auto" />
          {/* <ContentItemMenu editor={editor} />
          <LinkMenu editor={editor} appendTo={menuContainerRef} />
          <TextMenu editor={editor} />
          <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
          <TableRowMenu editor={editor} appendTo={menuContainerRef} />
          <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
          <ImageBlockMenu editor={editor} appendTo={menuContainerRef} /> */}
        </div>
      </div>
      </div>
  )
}

export default BlockEditor
