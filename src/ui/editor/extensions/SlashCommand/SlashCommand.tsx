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
  // {
  //   name: 'ai',
  //   title: 'AI',
  //   commands: [
  //     {
  //       name: 'aiWriter',
  //       label: 'AI Writer',
  //       iconName: 'Sparkles',
  //       description: 'Let AI finish your thoughts',
  //       shouldBeHidden: editor => editor.isActive('columns'),
  //       action: editor => editor.chain().focus().setAiWriter().run(),
  //     },
  //     {
  //       name: 'aiImage',
  //       label: 'AI Image',
  //       iconName: 'Sparkles',
  //       description: 'Generate an image from text',
  //       shouldBeHidden: editor => editor.isActive('columns'),
  //       action: editor => editor.chain().focus().setAiImage().run(),
  //     },
  //   ],
  // },
  {
    name: 'format',
    title: 'Format',
    commands: [

      {
        name: 'heading1',
        label: 'Heading 1',
        iconName: 'Heading1',
        description: 'High priority section title',
        aliases: ['h1'],
        action: editor => {
          //@ts-ignore
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
          //@ts-ignore
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
          //@ts-ignore
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
          //@ts-ignore
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
          //@ts-ignore
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
          //@ts-ignore
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
          //@ts-ignore
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
          //@ts-ignore
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()
        },
      },
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
              startImageUpload(file as File, editor.view, pos);
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
              startFileUpload(file as File, editor.view, pos);
            }
          };
          input.click();
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
          //@ts-ignore
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

const Command = Extension.create({
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
        //@ts-ignore
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
        command: ({ editor, range, props }) => {
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

              const scrollHandler = () => {
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

// const getSuggestionItems = ({ query }: { query: string }) => {
//   return [
//     GROUPS
//   ].filter((item) => {
//     if (typeof query === "string" && query.length > 0) {
//       const search = query.toLowerCase();
//       return (
//         item.title.toLowerCase().includes(search) ||
//         item.description.toLowerCase().includes(search) ||
//         (item.searchTerms &&
//           item.searchTerms.some((term: string) => term.includes(search)))
//       );
//     }
//     return true;
//   });
// };


export const updateScrollView = (container: HTMLElement, item: HTMLElement) => {
  const containerHeight = container.offsetHeight;
  const itemHeight = item ? item.offsetHeight : 0;

  const top = item.offsetTop;
  const bottom = top + itemHeight;

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 5;
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 5;
  }
};

const CommandList = ({
  items,
  command,
  editor,
  range,
}: {
  items: CommandItemProps[];
  command: any;
  editor: any;
  range: any;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { complete, isLoading } = useCompletion({
    id: "novel",
    api: "/api/generate",
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        va.track("Rate Limit Reached");
        return;
      }
      editor.chain().focus().deleteRange(range).run();
    },
    onFinish: (_prompt, completion) => {
      // highlight the generated text
      editor.commands.setTextSelection({
        from: range.from,
        to: range.from + completion.length,
      });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];
      va.track("Slash Command Used", {
        //@ts-ignore
        command: item.title,
      });
      if (item) {
        if (item.title === "Continue writing") {
          if (isLoading) return;
          void complete(
            getPrevText(editor, {
              chars: 5000,
              offset: 1,
            }),
          );
        } else {
          command(item);
        }
      }
    },
    [complete, isLoading, command, editor, items],
  );

  useEffect(() => {
    const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault();
        if (e.key === "ArrowUp") {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length);
          return true;
        }
        if (e.key === "ArrowDown") {
          setSelectedIndex((selectedIndex + 1) % items.length);
          return true;
        }
        if (e.key === "Enter") {
          selectItem(selectedIndex);
          return true;
        }
        return false;
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [items, selectedIndex, setSelectedIndex, selectItem]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  const commandListContainer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = commandListContainer?.current;


    const item = container?.children[selectedIndex] as HTMLElement;

    if (item && container) updateScrollView(container, item);
  }, [selectedIndex]);

  return items.length > 0 ? (
    <div
      id="slash-command"
      ref={commandListContainer}
      className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-stone-200 bg-white px-1 py-2 shadow-md transition-all"
    >
      {items.map((item: CommandItemProps, index: number) => {
        return (
          <button
            className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm text-stone-900 hover:bg-stone-100 ${
              index === selectedIndex ? "bg-stone-100 text-stone-900" : ""
            }`}
            key={index}
            onClick={() => selectItem(index)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 bg-white">
              {item.title === "Continue writing" && isLoading ? (
                <LoadingCircle />
              ) : (
                item.icon
              )}
            </div>
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-stone-500">{item.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  ) : null;
};

const renderItems = () => {
  let component: ReactRenderer | null = null;
  let popup: any = null;

  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
      component = new ReactRenderer(CommandList, {
        props,
        //@ts-ignore
        editor: props.editor,
      });

      // @ts-ignore
      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
      component?.updateProps(props);

      popup &&
        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
    },
    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === "Escape") {
        popup?.[0].hide();

        return true;
      }

      // @ts-ignore
      return component?.ref?.onKeyDown(props);
    },
    onExit: () => {
      popup?.[0].destroy();
      component?.destroy();
    },
  };
};

export const SlashCommand = Command.configure({
  suggestion: {
    // items: getSuggestionItems,
    render: renderItems,
  },
});

