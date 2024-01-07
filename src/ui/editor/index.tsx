"use client";

import "./styles/index.css";
// import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor, PureEditorContent, JSONContent, Extension } from "@tiptap/react";
import { useRef,useMemo } from "react";
// import { TiptapEditorProps } from "./props";
// import { TiptapExtensions } from "./extensions";
// import useLocalStorage from "@/lib/hooks/use-local-storage";
import { useDebouncedCallback } from "use-debounce";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
// import { toast } from "sonner";
// import va from "@vercel/analytics";
// import DEFAULT_EDITOR_CONTENT from "./default-content";
import { EditorBubbleMenu } from "./components/bubble-menu";
import { ContentItemMenu } from "./components/menus/ContentItemMenu";
import { LinkMenu } from "./components/menus/LinkMenu";
import { TextMenu } from "./components/menus/TextMenu";
import { ColumnsMenu } from "./extensions/MultiColumn/menus";
import { TableRowMenu } from "./extensions/Table/menus";
import { TableColumnMenu } from "./extensions/Table/menus";
import { useEffect, useState } from "react";
import { ImageResizer } from "./components/image-resizer";
// import { TiptapEditorProps } from "@/ui/editor/props";
// import { TiptapExtensions } from "@/ui/editor/extensions/exp";
// import useLocalStorage from "@/lib/hooks/use-local-storage";
// import { getPrevText } from "@/lib/editor";
// import { useBlockEditor } from "@/ui/editor/hooks/useBlockEditor";
import {ExtensionKit} from "@/app/dashboard/components/TipTap/extensions/extension-kit"
import { generateHTML } from '@tiptap/html'
import { Extensions } from "@tiptap/core";
import HTMLReactParser from "html-react-parser";

// import { JSONContent } from "@tiptap/react";

interface pageprops {
  editor?: any;
  saveStatus?: any;
  editorJson: JSONContent;
  setEditorJson: (content: JSONContent) => void;
}


//ToDo: change to use local storage

export default function Editor({editorJson, setEditorJson}: pageprops) {
  // const [content, setContent] = useLocalStorage(
  //   "content",
  //   "DEFAULT_EDITOR_CONTENT",
  // );
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [hydrated, setHydrated] = useState(false);
  const [htmlcontent, sethtmlcontent] = useState("");
  
  // const [editorJson, setEditorJson] = useState<JSONContent>({ type: 'doc',
  // content: [
  //   {
  //     type: 'paragraph',
  //     content: [
  //       {
  //         type: 'text',
  //         text: 'Example ',
  //       },
  //       {
  //         type: 'text',
  //         marks: [
  //           {
  //             type: 'bold',
  //           },
  //         ],
  //         text: 'Text',
  //       },
  //     ],
  //   },
  // ],} as JSONContent);

  // useEffect(() => {
  //   console.log("JSON From Use Effect ", editorJson)

  // },[editorJson]);

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
      const json = editor.getJSON();
      //console.log("JSON contentff: ", json);
      // console.log("MYCONTENT: ", content);
      sethtmlcontent(editor.getHTML());

      //console.log("HTML: ", editor.getHTML(), typeof editor.getHTML())

      setSaveStatus("Saving...");
      // setContent(json);
      // Simulate a delay in saving.
      setTimeout(() => {
        setSaveStatus("Saved");
      }, 500);
    }, 750);

  
    const editor = useEditor(
      {
        autofocus: true,
        // onCreate: ({ editor }) => {
  
        //   // provider?.on('synced', () => {
        //     // if (editor.isEmpty) {
        //     //   editor.commands.setContent(editorJson)
        //     // }
        //   // })
        // },
        onUpdate: ({ editor }) => {
          const json = editor.getJSON()
          //console.log("JSON content: from onUpdate ", json)
          setEditorJson(json)
          // send the content to an API here
        },
        //@ts-expect-error
        extensions: [
          ...ExtensionKit({}),
        ],
        editorProps: {
          attributes: {
            autocomplete: 'off',
            autocorrect: 'off',
            autocapitalize: 'off',
            class: 'min-h-[400px] border-radius-[30px] w-full p-1 ',
          },
        },
      },
    )
  


  const prev = useRef("");


  useEffect(() => {
    if (editor && editorJson && !hydrated) {
      editor.commands.setContent(editorJson);
      setHydrated(true);
    }
  }, [editor, editorJson, hydrated]);

  // if(!editor) return null;
  
  const menuContainerRef = useRef(null);
  const editorRef = useRef<PureEditorContent | null>(null)


  // const output = useMemo(() => {
  //   //@ts-expect-error
  //     return generateHTML(editorJson, [
  //         ...ExtensionKit({}) as Extensions
  //       ])
  //   }, [editorJson])
    
  return (
    <div
    
      className="w-full"
    >
      {/* <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 dark:bg-stone-600">
        {saveStatus}
      </div> */}
      {/* {editor && <EditorBubbleMenu editor={editor} />} */}
      <div className=" w-full rounded-xl items-center border-stone-200 bg-white sm:border sm:shadow-lg dark:border-stone-600 dark:bg-stone-800">
        <div  ref={menuContainerRef} className="h-full w-full rounded-xl  prose dark:prose-invert" >
          {editor?.isActive("image") && <ImageResizer editor={editor} />}
          {editor && <EditorContent ref={editorRef} editor={editor} />}
          {editor && <ContentItemMenu editor={editor} />}
          {editor && <LinkMenu editor={editor} appendTo={menuContainerRef} />}
          {editor && <TextMenu editor={editor} />}
          {editor && <ColumnsMenu editor={editor} appendTo={menuContainerRef} />}
          {editor && <TableRowMenu editor={editor} appendTo={menuContainerRef} />}
        </div>
      </div>


      {/* <div className="prose dark:prose-invert my-16 h-full w-full">
        {HTMLReactParser(output)}
      </div> */}

    </div>

  );
}
