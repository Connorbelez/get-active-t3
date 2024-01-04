"use client"
// import { Editor } from '@tiptap/core'
import { useEditor, EditorContent } from "@tiptap/react";
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'
import Strike from '@tiptap/extension-strike'
import TipTap, { BlockEditor } from "../TipTap/components/BlockEditor/BlockEditor";
import {FloatingMenu, BubbleMenu } from '@tiptap/react'
import React, { useEffect, useRef, useState } from "react";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { useDebouncedCallback } from "use-debounce";
import Editor2 from "@/app/dashboard/components/Editor/Editor2";
// define your extension array
const extensions = [
  StarterKit,
]
interface Props {
}


export default function comp({}: Props ) {

  
    return (
        <section className={"w-full"} id="element">
            <Editor2  />

        </section>
    )
}