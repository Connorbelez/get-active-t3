import { Editor, Range, Extension } from "@tiptap/core";
import { ReactRenderer } from '@tiptap/react'
import Suggestion, { SuggestionProps, SuggestionKeyDownProps } from '@tiptap/suggestion'
import { PluginKey } from '@tiptap/pm/state'
import tippy from 'tippy.js'
import { Group } from './types'
// import { GROUPS } from './groups'
import { MenuList } from './MenuList'
import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useRef,
  useLayoutEffect,
} from "react";

import { useCompletion } from "ai/react";

import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  MessageSquarePlus,
  Text,
  TextQuote,
  Image as ImageIcon,
  Code,
  CheckSquare,
} from "lucide-react";
import LoadingCircle from "@/ui/icons/loading-circle";
import { toast } from "sonner";
import va from "@vercel/analytics";
import Magic from "@/ui/icons/magic";
import { getPrevText } from "@/lib/editor";
import { startImageUpload } from "@/ui/editor/plugins/upload-images";
import {startFileUpload} from "@/ui/editor/plugins/upload-files"


interface CommandItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

import {CommandProps} from './types'




const GROUPS: Group[] = [
  {
    name: 'ai',
    title: 'AI',
    commands: [
      {
        name: 'aiWriter',
        label: 'AI Writer',
        iconName: 'Sparkles',
        description: 'Let AI finish your thoughts',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => editor.chain().focus().setAiWriter().run(),
      },
      {
        name: 'aiImage',
        label: 'AI Image',
        iconName: 'Sparkles',
        description: 'Generate an image from text',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => editor.chain().focus().setAiImage().run(),
      },
    ],
  },
  {
    name: 'format',
    title: 'Format',
    commands: [
      {
        name: "Image",
        label: "Image",
        description: "Upload an image from your computer.",
        // searchTerms: ["photo", "picture", "media"],
        iconName: "Image",
        command: ({ editor, range }: CommandProps) => {
          editor.chain().focus().deleteRange(range).run();
          // upload image
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = async () => {
            if (input.files?.length) {
              const file = input.files[0];
              const pos = editor.view.state.selection.from;
              startImageUpload(file, editor.view, pos);
            }
          };
          input.click();
        },
      },
      {
        name: "File",
        description: "Upload a File from your computer.",
        label: "File",
        // searchTerms: ["file", "pdf", "doc"],
        iconName: "File",
        command: ({ editor, range }: CommandProps) => {
          editor.chain().focus().deleteRange(range).run();
          // upload image
          const input = document.createElement("input");
          input.type = "file";
          input.accept = ".pdf, .doc, .docx";
          input.onchange = async () => {
            if (input.files?.length) {
              const file = input.files[0];
              const pos = editor.view.state.selection.from;
              startFileUpload(file, editor.view, pos);
            }
          };
          input.click();
        },
      },
      {
        name: 'heading1',
        label: 'Heading 1',
        iconName: 'Heading1',
        description: 'High priority section title',
        aliases: ['h1'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 1 }).run()
        },
      },
      {
        name: 'heading2',
        label: 'Heading 2',
        iconName: 'Heading2',
        description: 'Medium priority section title',
        aliases: ['h2'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 2 }).run()
        },
      },
      {
        name: 'heading3',
        label: 'Heading 3',
        iconName: 'Heading3',
        description: 'Low priority section title',
        aliases: ['h3'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 3 }).run()
        },
      },
      {
        name: 'bulletList',
        label: 'Bullet List',
        iconName: 'List',
        description: 'Unordered list of items',
        aliases: ['ul'],
        action: editor => {
          editor.chain().focus().toggleBulletList().run()
        },
      },
      {
        name: 'numberedList',
        label: 'Numbered List',
        iconName: 'ListOrdered',
        description: 'Ordered list of items',
        aliases: ['ol'],
        action: editor => {
          editor.chain().focus().toggleOrderedList().run()
        },
      },
      {
        name: 'taskList',
        label: 'Task List',
        iconName: 'ListTodo',
        description: 'Task list with todo items',
        aliases: ['todo'],
        action: editor => {
          editor.chain().focus().toggleTaskList().run()
        },
      },
      {
        name: 'blockquote',
        label: 'Blockquote',
        iconName: 'Quote',
        description: 'Element for quoting',
        action: editor => {
          editor.chain().focus().setBlockquote().run()
        },
      },
      {
        name: 'codeBlock',
        label: 'Code Block',
        iconName: 'SquareCode',
        description: 'Code block with syntax highlighting',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().setCodeBlock().run()
        },
      },
    ],
  },
  {
    name: 'insert',
    title: 'Insert',
    commands: [
      {
        name: 'table',
        label: 'Table',
        iconName: 'Table',
        description: 'Insert a table',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()
        },
      },
      {
        name: 'image',
        label: 'Image',
        iconName: 'Image',
        description: 'Insert an image',
        aliases: ['img'],
        action: editor => {
          editor.chain().focus().setImageUpload().run()
        },
      },
      {
        name: 'columns',
        label: 'Columns',
        iconName: 'Columns',
        description: 'Add two column content',
        aliases: ['cols'],
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor
            .chain()
            .focus()
            .setColumns()
            .focus(editor.state.selection.head - 1)
            .run()
        },
      },
      {
        name: 'horizontalRule',
        label: 'Horizontal Rule',
        iconName: 'Minus',
        description: 'Insert a horizontal divider',
        aliases: ['hr'],
        action: editor => {
          editor.chain().focus().setHorizontalRule().run()
        },
      },
      {
        name: 'toc',
        label: 'Table of Contents',
        iconName: 'Book',
        aliases: ['outline'],
        description: 'Insert a table of contents',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().insertTableOfContent().run()
        },
      },
    ],
  },
]





const extensionName = 'slashCommand'

let popup: any

export const SlashCommand = Extension.create({
  name: extensionName,

  priority: 200,

  onCreate() {
    popup = tippy('body', {
      interactive: true,
      trigger: 'manual',
      placement: 'bottom-start',
      theme: 'slash-command',
      maxWidth: '16rem',
      offset: [16, 8],
      popperOptions: {
        strategy: 'fixed',
        modifiers: [
          {
            name: 'flip',
            enabled: false,
          },
        ],
      },
    })
  },

  addProseMirrorPlugins() {
    return [
      
      Suggestion({
        editor: this.editor,
        char: '/',
        allowSpaces: true,
        startOfLine: true,
        pluginKey: new PluginKey(extensionName),
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from)
          const isRootDepth = $from.depth === 1
          const isParagraph = $from.parent.type.name === 'paragraph'
          const isStartOfNode = $from.parent.textContent?.charAt(0) === '/'
          // TODO
          const isInColumn = this.editor.isActive('column')

          const afterContent = $from.parent.textContent?.substring($from.parent.textContent?.indexOf('/'))
          const isValidAfterContent = !afterContent?.endsWith('  ')

          return (
            ((isRootDepth && isParagraph && isStartOfNode) || (isInColumn && isParagraph && isStartOfNode)) &&
            isValidAfterContent
          )
        },
        command: ({ editor, range, props }: { editor: Editor; range:Range; props: any }) => {
          const { view, state } = editor
          const { $head, $from } = view.state.selection

          const end = $from.pos
          const from = $head?.nodeBefore
            ? end - ($head.nodeBefore.text?.substring($head.nodeBefore.text?.indexOf('/')).length ?? 0)
            : $from.start()

          const tr = state.tr.deleteRange(from, end)
          view.dispatch(tr)
          if(props.command){
            props.command({editor, range})
          }else{
            props.action(editor)
          }
          view.focus()
        },
        items: ({ query }: { query: string }) => {
          const withFilteredCommands = GROUPS.map(group => ({
            ...group,
            commands: group.commands
              .filter(item => {
                const labelNormalized = item.label.toLowerCase().trim()
                const queryNormalized = query.toLowerCase().trim()

                if (item.aliases) {
                  const aliases = item.aliases.map(alias => alias.toLowerCase().trim())

                  return labelNormalized.includes(queryNormalized) || aliases.includes(queryNormalized)
                }

                return labelNormalized.includes(queryNormalized)
              })
              .filter(command => (command.shouldBeHidden ? !command.shouldBeHidden(this.editor) : true)),
          }))

          const withoutEmptyGroups = withFilteredCommands.filter(group => {
            if (group.commands.length > 0) {
              return true
            }

            return false
          })

          const withEnabledSettings = withoutEmptyGroups.map(group => ({
            ...group,
            commands: group.commands.map(command => ({
              ...command,
              isEnabled: true,
            })),
          }))

          return withEnabledSettings
        },
        render: () => {
          let component: any

          let scrollHandler: (() => void) | null = null

          return {
            onStart: (props: SuggestionProps) => {
              component = new ReactRenderer(MenuList, {
                props,
                editor: props.editor,
              })

              const { view } = props.editor

              const editorNode = view.dom as HTMLElement

              const getReferenceClientRect = () => {
                if (!props.clientRect) {
                  return props.editor.storage[extensionName].rect
                }

                const rect = props.clientRect()

                if (!rect) {
                  return props.editor.storage[extensionName].rect
                }

                let yPos = rect.y

                if (rect.top + component.element.offsetHeight + 40 > window.innerHeight) {
                  const diff = rect.top + component.element.offsetHeight - window.innerHeight + 40
                  yPos = rect.y - diff
                }

                // Account for when the editor is bound inside a container that doesn't go all the way to the edge of the screen
                const editorXOffset = editorNode.getBoundingClientRect().x
                return new DOMRect(rect.x, yPos, rect.width, rect.height)
              }

              scrollHandler = () => {
                popup?.[0].setProps({
                  getReferenceClientRect,
                })
              }

              view.dom.parentElement?.addEventListener('scroll', scrollHandler)

              popup?.[0].setProps({
                getReferenceClientRect,
                appendTo: () => document.body,
                content: component.element,
              })

              popup?.[0].show()
            },

            onUpdate(props: SuggestionProps) {
              component.updateProps(props)

              const { view } = props.editor

              const editorNode = view.dom as HTMLElement

              const getReferenceClientRect = () => {
                if (!props.clientRect) {
                  return props.editor.storage[extensionName].rect
                }

                const rect = props.clientRect()

                if (!rect) {
                  return props.editor.storage[extensionName].rect
                }

                // Account for when the editor is bound inside a container that doesn't go all the way to the edge of the screen
                return new DOMRect(rect.x, rect.y, rect.width, rect.height)
              }

              let scrollHandler = () => {
                popup?.[0].setProps({
                  getReferenceClientRect,
                })
              }

              view.dom.parentElement?.addEventListener('scroll', scrollHandler)

              // eslint-disable-next-line no-param-reassign
              props.editor.storage[extensionName].rect = props.clientRect
                ? getReferenceClientRect()
                : {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  }
              popup?.[0].setProps({
                getReferenceClientRect,
              })
            },

            onKeyDown(props: SuggestionKeyDownProps) {
              if (props.event.key === 'Escape') {
                popup?.[0].hide()

                return true
              }

              if (!popup?.[0].state.isShown) {
                popup?.[0].show()
              }

              return component.ref?.onKeyDown(props)
            },

            onExit(props) {
              popup?.[0].hide()
              if (scrollHandler) {
                const { view } = props.editor
                view.dom.parentElement?.removeEventListener('scroll', scrollHandler)
              }
              component.destroy()
            },
          }
        },
      }),
    ]
  },

  addStorage() {
    return {
      rect: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    }
  },
})

export default SlashCommand
