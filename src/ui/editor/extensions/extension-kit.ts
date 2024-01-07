'use client'

import { HocuspocusProvider } from '@hocuspocus/provider'

// import { API } from '@/ui/editor/lib/api'

import {
  // AiWriter,
  // AiImage,
  // BlockquoteFigure,
  CharacterCount,
  Color,
  // Document,
  Dropcursor,
  Emoji,
  Figcaption,
  FileHandler,
  Focus,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  ImageBlock,

  Link,
  Placeholder,
  Selection,
  // SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  TableOfContent,
  TableCell,
  TableHeader,
  TableRow,
  TextAlign,
  TextStyle,
  TrailingNode,
  Typography,
  Underline,
  // emojiSuggestion,
  Columns,
  Column,
  TaskItem,
  TaskList,
  
} from '.'

import { BlockquoteFigure} from '../extensions/BlockquoteFigure/BlockquoteFigure'
import { Document } from '../extensions/Document'
import { SlashCommand } from '../extensions/SlashCommand'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { TableOfContentNode } from './TableOfContentNode'
import { lowlight } from 'lowlight'

import TiptapImage from "@tiptap/extension-image";

import UploadImagesPlugin from "@/ui/editor/plugins/upload-images";
import UpdatedImage from "./updated-image";
import UploadFilesPlugin from "@/ui/editor/plugins/upload-files";
import {PDFLink} from './PDFLink/PDFLink';
import { ImageResizer } from "../components/image-resizer";

interface ExtensionKitProps {
  provider?: HocuspocusProvider | null
  userId?: string
  userName?: string
  userColor?: string
}
const CustomImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [UploadImagesPlugin(), UploadFilesPlugin()];
  },
});
export const ExtensionKit = ({ provider, userId, userName = 'Maxi' }: ExtensionKitProps) => [
  PDFLink,
  Document,
  Columns,
  TaskList,
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
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }
      return "Press '/' for commands, or '++' for AI autocomplete...";
    },
    includeChildren: true,
  }),
  TaskItem.configure({
    nested: true,
  }),

  Column,
  Selection,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false,
  }),
  HorizontalRule,
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

  // Emoji.configure({
  //   enableEmoticons: true,
  //   // suggestion: emojiSuggestion,
  // }),
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
  // Placeholder.configure({
  //   includeChildren: true,
  //   showOnlyCurrent: false,
  //   placeholder: () => '',
  // }),
  SlashCommand,
  Focus,
  Figcaption,
  BlockquoteFigure,
  ImageBlock,
  Dropcursor.configure({
    width: 2,
    class: 'ProseMirror-dropcursor border-black',
  }),
]

export default ExtensionKit
