"use client"
import Editor from "@/ui/editor/";
import React, { useEffect, useRef, useState } from "react";
import { useEditor } from "@tiptap/react";
import { TiptapEditorProps } from "@/ui/editor/props";
import { TiptapExtensions } from "@/ui/editor/extensions";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { useDebouncedCallback } from "use-debounce";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import va from "@vercel/analytics";
// import DEFAULT_EDITOR_CONTENT from "./default-content";
// import { EditorBubbleMenu } from "@/ui/editor/components/bubble-menu";
import { getPrevText } from "@/lib/editor";
// import { ImageResizer } from "@/ui/editor/components/image-resizer";
// import { generateHTML } from '@tiptap/html'
// import { useMemo } from "react";
// import { DatePicker, DatePickerValue } from "@tremor/react";
import ReactHtmlParser from 'react-html-parser';
// import { NumberInput } from "@tremor/react";
import {Tabs, Tab} from "@nextui-org/react";
import axios from "axios";
import { Input } from "@nextui-org/react";
// import Link from "next/link";
import Image from "next/image"
import {Button} from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Switch } from "@nextui-org/switch";

// import TextEditor from "./TextEditor";
// import DynamicForm from "./DynamicForm";
// import EventCreationModal from "./EventCreationModal"
// import {useSession} from "next-auth/react";
// import dynamic from "next/dynamic";

import {PutBlobResult} from "@vercel/blob";
export default function Page() {
	//ToDo: unhardcode this, implement sessions
	// const {data : Session} = useSession();
	// const email = Session?.user?.email || "connor.belez@gmail.com"

  // const output = useMemo(() => {
  //   return generateHTML(json, [
  //     Document,
  //     Paragraph,
  //     Text,
  //     Bold,
  //     // other extensions …
  //   ])
  // }, [json])

  // const [content, setContent] = useLocalStorage(
  //   "content",
  //   "DEFAULT_EDITOR_CONTENT",
  // );
  // const [saveStatus, setSaveStatus] = useState("Saved");
  // const [hydrated, setHydrated] = useState(false);
  // const [htmlcontent, sethtmlcontent] = useState("");

  // const [eventData, setEventData] = useState({
	// 	title: "",
	// 	headline: "",
	// 	date: "",
	// 	startTime: "",
	// 	length: "",
	// 	heroImage: "",
	// 	is18Plus: false,
	// 	cityProvince: "",
	// 	exactAddress: "",
	// 	isPrivate: false,
	// 	eventDescription: "",
	// });

  //   const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
  //       const json = editor.getJSON();
  //       console.log("JSON contentff: ", json);
  //       console.log("MYCONTENT: ", content);
  //       sethtmlcontent(editor.getHTML());
      
  //       console.log("HTML: ", editor.getHTML(), typeof editor.getHTML())
    
  //       setSaveStatus("Saving...");
  //       setContent(json);
  //       // Simulate a delay in saving.
  //       setTimeout(() => {
  //         setSaveStatus("Saved");
  //       }, 500);
  //     }, 750);
    
  //     const editor = useEditor({
  //       extensions: TiptapExtensions,
  //       editorProps: TiptapEditorProps,
  //       onUpdate: (e) => {
  //         setSaveStatus("Unsaved");
  //         const selection = e.editor.state.selection;
  //         const lastTwo = getPrevText(e.editor, {
  //           chars: 2,
  //         });
  //         if (lastTwo === "++" && !isLoading) {
  //           e.editor.commands.deleteRange({
  //             from: selection.from - 2,
  //             to: selection.from,
  //           });
  //           complete(
  //             getPrevText(e.editor, {
  //               chars: 5000,
  //             }),
  //           );
    
  //           va.track("Autocomplete Shortcut Used");
  //         } else {
  //           debouncedUpdates(e);
  //         }
  //       },
  //       autofocus: "end",
  //     });
    
  //     const { complete, completion, isLoading, stop } = useCompletion({
  //       id: "novel",
  //       api: "/api/generate",
  //       onFinish: (_prompt, completion) => {
  //         editor?.commands.setTextSelection({
  //           from: editor.state.selection.from - completion.length,
  //           to: editor.state.selection.from,
  //         });
  //       },
  //       onError: (err) => {
  //         toast.error(err.message);
  //         if (err.message === "You have reached your request limit for the day.") {
  //           va.track("Rate Limit Reached");
  //         }
  //       },
  //     });
    
  //     const prev = useRef("");
    
  //     // Insert chunks of the generated text
  //     useEffect(() => {
  //       const diff = completion.slice(prev.current.length);
  //       prev.current = completion;
  //       editor?.commands.insertContent(diff);
  //     }, [isLoading, editor, completion]);
    
  //     useEffect(() => {
  //       // if user presses escape or cmd + z and it's loading,
  //       // stop the request, delete the completion, and insert back the "++"
  //       const onKeyDown = (e: KeyboardEvent) => {
  //         if (e.key === "Escape" || (e.metaKey && e.key === "z")) {
  //           stop();
  //           console.log(editor)
  //           if (e.key === "Escape") {
  //             editor?.commands.deleteRange({
  //               from: editor.state.selection.from - completion.length,
  //               to: editor.state.selection.from,
  //             });
  //           }
  //           editor?.commands.insertContent("++");
  //         }
  //       };
  //       const mousedownHandler = (e: MouseEvent) => {
  //         e.preventDefault();
  //         e.stopPropagation();
  //         stop();
  //         if (window.confirm("AI writing paused. Continue?")) {
  //           complete(editor?.getText() || "");
  //         }
  //       };
  //       if (isLoading) {
  //         document.addEventListener("keydown", onKeyDown);
  //         window.addEventListener("mousedown", mousedownHandler);
  //       } else {
  //         document.removeEventListener("keydown", onKeyDown);
  //         window.removeEventListener("mousedown", mousedownHandler);
  //       }
  //       return () => {
  //         document.removeEventListener("keydown", onKeyDown);
  //         window.removeEventListener("mousedown", mousedownHandler);
  //       };
  //     }, [stop, isLoading, editor, complete, completion.length]);
    
  //     // Hydrate the editor with the content from localStorage.
  //     useEffect(() => {
  //       if (editor && content && !hydrated) {
  //         editor.commands.setContent(content);
  //         setHydrated(true);
  //       }
  //     }, [editor, content, hydrated]);

  //   if(!editor) return null;
    
    return(
        <Editor />
    )
}