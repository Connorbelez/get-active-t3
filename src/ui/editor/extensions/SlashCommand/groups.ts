// import { Group } from './types'
// // import React, {
// //   useState,
// //   useEffect,
// //   useCallback,
// //   ReactNode,
// //   useRef,
// //   useLayoutEffect,
// // } from "react";
// // import { Editor, Range, Extension } from "@tiptap/core";
// // import Suggestion from "@tiptap/suggestion";
// // import { ReactRenderer } from "@tiptap/react";
// // import { useCompletion } from "ai/react";
// // import tippy from "tippy.js";
// // import {
// //   Heading1,
// //   Heading2,
// //   Heading3,
// //   List,
// //   ListOrdered,
// //   MessageSquarePlus,
// //   Text,
// //   TextQuote,
// //   Image as ImageIcon,
// //   Code,
// //   CheckSquare,
// // } from "lucide-react";
// // import LoadingCircle from "@/ui/icons/loading-circle";
// // import { toast } from "sonner";
// // import va from "@vercel/analytics";
// // import Magic from "@/ui/icons/magic";
// // import { getPrevText } from "@/lib/editor";
// import {
//   Heading1,
//   Heading2,
//   Heading3,
//   List,
//   ListOrdered,
//   MessageSquarePlus,
//   Text,
//   TextQuote,
//   Image as ImageIcon,
//   Code,
//   CheckSquare,
// } from "lucide-react";
// import { startImageUpload } from "@/ui/editor/plugins/upload-images";
// import {startFileUpload} from "@/ui/editor/plugins/upload-files"

// export const GROUPS: Group[] = [
//   {
//     name: 'ai',
//     title: 'AI',
//     commands: [
//       {
//         name: 'aiWriter',
//         label: 'AI Writer',
//         iconName: 'Sparkles',
//         description: 'Let AI finish your thoughts',
//         shouldBeHidden: editor => editor.isActive('columns'),
//         action: editor => editor.chain().focus().setAiWriter().run(),
//       },
//       {
//         name: 'aiImage',
//         label: 'AI Image',
//         iconName: 'Sparkles',
//         description: 'Generate an image from text',
//         shouldBeHidden: editor => editor.isActive('columns'),
//         action: editor => editor.chain().focus().setAiImage().run(),
//       },
//     ],
//   },
//   {
//     name: 'format',
//     title: 'Format',
//     commands: [
//       {
//         title: "Image",
//         description: "Upload an image from your computer.",
//         searchTerms: ["photo", "picture", "media"],
//         icon: "image",
//         command: ({ editor, range }: any) => {
//           editor.chain().focus().deleteRange(range).run();
//           // upload image
//           const input = document.createElement("input");
//           input.type = "file";
//           input.accept = "image/*";
//           input.onchange = async () => {
//             if (input.files?.length) {
//               const file = input.files[0];
//               const pos = editor.view.state.selection.from;
//               startImageUpload(file as File, editor.view, pos);
//             }
//           };
//           input.click();
//         },
//       },
//       {
//         title: "File",
//         description: "Upload a File from your computer.",
//         searchTerms: ["file", "pdf", "doc"],
//         icon: <ImageIcon size={18} />,
//         command: ({ editor, range }: CommandProps) => {
//           editor.chain().focus().deleteRange(range).run();
//           // upload image
//           const input = document.createElement("input");
//           input.type = "file";
//           input.accept = ".pdf, .doc, .docx";
//           input.onchange = async () => {
//             if (input.files?.length) {
//               const file = input.files[0];
//               const pos = editor.view.state.selection.from;
//               startFileUpload(file, editor.view, pos);
//             }
//           };
//           input.click();
//         },
//       },
//       {
//         name: 'heading1',
//         label: 'Heading 1',
//         iconName: 'Heading1',
//         description: 'High priority section title',
//         aliases: ['h1'],
//         action: editor => {
//           editor.chain().focus().setHeading({ level: 1 }).run()
//         },
//       },
//       {
//         name: 'heading2',
//         label: 'Heading 2',
//         iconName: 'Heading2',
//         description: 'Medium priority section title',
//         aliases: ['h2'],
//         action: editor => {
//           editor.chain().focus().setHeading({ level: 2 }).run()
//         },
//       },
//       {
//         name: 'heading3',
//         label: 'Heading 3',
//         iconName: 'Heading3',
//         description: 'Low priority section title',
//         aliases: ['h3'],
//         action: editor => {
//           editor.chain().focus().setHeading({ level: 3 }).run()
//         },
//       },
//       {
//         name: 'bulletList',
//         label: 'Bullet List',
//         iconName: 'List',
//         description: 'Unordered list of items',
//         aliases: ['ul'],
//         action: editor => {
//           editor.chain().focus().toggleBulletList().run()
//         },
//       },
//       {
//         name: 'numberedList',
//         label: 'Numbered List',
//         iconName: 'ListOrdered',
//         description: 'Ordered list of items',
//         aliases: ['ol'],
//         action: editor => {
//           editor.chain().focus().toggleOrderedList().run()
//         },
//       },
//       {
//         name: 'taskList',
//         label: 'Task List',
//         iconName: 'ListTodo',
//         description: 'Task list with todo items',
//         aliases: ['todo'],
//         action: editor => {
//           editor.chain().focus().toggleTaskList().run()
//         },
//       },
//       {
//         name: 'blockquote',
//         label: 'Blockquote',
//         iconName: 'Quote',
//         description: 'Element for quoting',
//         action: editor => {
//           editor.chain().focus().setBlockquote().run()
//         },
//       },
//       {
//         name: 'codeBlock',
//         label: 'Code Block',
//         iconName: 'SquareCode',
//         description: 'Code block with syntax highlighting',
//         shouldBeHidden: editor => editor.isActive('columns'),
//         action: editor => {
//           editor.chain().focus().setCodeBlock().run()
//         },
//       },
//     ],
//   },
//   {
//     name: 'insert',
//     title: 'Insert',
//     commands: [
//       {
//         name: 'table',
//         label: 'Table',
//         iconName: 'Table',
//         description: 'Insert a table',
//         shouldBeHidden: editor => editor.isActive('columns'),
//         action: editor => {
//           editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()
//         },
//       },
//       {
//         name: 'image',
//         label: 'Image',
//         iconName: 'Image',
//         description: 'Insert an image',
//         aliases: ['img'],
//         action: editor => {
//           editor.chain().focus().setImageUpload().run()
//         },
//       },
//       {
//         name: 'columns',
//         label: 'Columns',
//         iconName: 'Columns',
//         description: 'Add two column content',
//         aliases: ['cols'],
//         shouldBeHidden: editor => editor.isActive('columns'),
//         action: editor => {
//           editor
//             .chain()
//             .focus()
//             .setColumns()
//             .focus(editor.state.selection.head - 1)
//             .run()
//         },
//       },
//       {
//         name: 'horizontalRule',
//         label: 'Horizontal Rule',
//         iconName: 'Minus',
//         description: 'Insert a horizontal divider',
//         aliases: ['hr'],
//         action: editor => {
//           editor.chain().focus().setHorizontalRule().run()
//         },
//       },
//       {
//         name: 'toc',
//         label: 'Table of Contents',
//         iconName: 'Book',
//         aliases: ['outline'],
//         description: 'Insert a table of contents',
//         shouldBeHidden: editor => editor.isActive('columns'),
//         action: editor => {
//           editor.chain().focus().insertTableOfContent().run()
//         },
//       },
//     ],
//   },
// ]

// export default GROUPS
