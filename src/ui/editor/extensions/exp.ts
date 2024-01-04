
import {
  // AiWriter,
  // AiImage,
  BlockquoteFigure,
  CharacterCount,
  // Color,
  // Document,
  Dropcursor,
  Emoji,
  // Figcaption,
  // FileHandler,
  Focus,
  FontFamily,
  // FontSize,
  Heading,
//   Highlight,
  // HorizontalRule,
  // ImageBlock,
  Link,
  // Placeholder,
  Selection,
//   SlashCommand,
  // StarterKit,
  Figcaption,
  Subscript,
  Superscript,
  Table,
  TableOfContent,
  TableCell,
  TableHeader,
  TableRow,
  TextAlign,
  // TextStyle,
  TrailingNode,
  Typography,
  Underline,
  emojiSuggestion,
  Columns,
  Column,
  FontSize,
  // TaskItem,
  // TaskList,
} from '.'
import StarterKit from "@tiptap/starter-kit";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapUnderline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { Markdown } from "tiptap-markdown";
import Highlight from "@tiptap/extension-highlight";
import SlashCommand from "./slash-command";
import { InputRule } from "@tiptap/core";
import UploadImagesPlugin from "@/ui/editor/plugins/upload-images";
import UpdatedImage from "./updated-image";
import UploadFilesPlugin from "@/ui/editor/plugins/upload-files";
import {PDFLink} from './PDFLink/PDFLink';
// import { BlockquoteFigure} from '../extensions/BlockquoteFigure/BlockquoteFigure'
import { TableOfContentNode } from './TableOfContentNode'
import { Document } from '../extensions/Document'

import { HocuspocusProvider } from '@hocuspocus/provider'
interface ExtensionKitProps {
    provider?: HocuspocusProvider | null
    userId?: string
    userName?: string
    userColor?: string
  }

import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'

import { lowlight } from 'lowlight'
const CustomImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [UploadImagesPlugin(), UploadFilesPlugin()];
  },
});

export const TiptapExtensions = [
    PDFLink,
    CustomImage.configure({
      allowBase64: true,
      HTMLAttributes: {
        class: "rounded-lg border border-stone-200",
      },
    }),
    UpdatedImage.configure({
      HTMLAttributes: {
        class: "rounded-lg border border-stone-200",
      },
    }),
    
    Document,
    Columns,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    // AiWriter.configure({
    //   authorId: userId,
    //   authorName: userName,
    // }),
    // AiImage.configure({
    //   authorId: userId,
    //   authorName: userName,
    // }),
    Column,
    Selection,
    Heading.configure({
      levels: [1, 2, 3, 4, 5, 6],
    }),
    HorizontalRule,
    StarterKit.configure({
      document: false,
      dropcursor: false,
      heading: false,
      horizontalRule: false,
      blockquote: false,
      history: false,
      codeBlock: false,
    }),
    CodeBlockLowlight.configure({
      lowlight,
      defaultLanguage: null,
    }),
    TextStyle,
    FontSize,
    FontFamily,
    Color,
    TrailingNode,
    Link.configure({
      openOnClick: false,
    }),
    Highlight.configure({ multicolor: true }),
    Underline,
    CharacterCount.configure({ limit: 50000 }),
    TableOfContent,
    TableOfContentNode,
    // ImageUpload.configure({
    //   clientId: provider?.document?.clientID,
    // }),
    // ImageBlock,
    // FileHandler.configure({
    //   allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    //   onDrop: (currentEditor, files, pos) => {
    //     files.forEach(async () => {
    //       const url = await API.uploadImage()
  
    //       currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run()
    //     })
    //   },
    //   onPaste: (currentEditor, files) => {
    //     files.forEach(async () => {
    //       const url = await API.uploadImage()
  
    //       return currentEditor
    //         .chain()
    //         .setImageBlockAt({ pos: currentEditor.state.selection.anchor, src: url })
    //         .focus()
    //         .run()
    //     })
    //   },
    // }),
    Emoji.configure({
      enableEmoticons: true,
      suggestion: emojiSuggestion,
    }),
    TextAlign.extend({
      addKeyboardShortcuts() {
        return {}
      },
    }).configure({
      types: ['heading', 'paragraph'],
    }),
    Subscript,
    Superscript,
    Table,
    TableCell,
    TableHeader,
    TableRow,
    Typography,
    Placeholder.configure({
      includeChildren: true,
      showOnlyCurrent: false,
      placeholder: () => '',
    }),
    SlashCommand,
    Focus,
    Figcaption,
    BlockquoteFigure,
    Dropcursor.configure({
      width: 2,
      class: 'ProseMirror-dropcursor border-black',
    }),
];
