import { Editor } from '@tiptap/core'

import { icons } from 'lucide-react'

export interface Group {
  name: string
  title: string
  commands: Command[]
}
export interface CommandProps {
  editor: Editor;
  range: Range;
}
export interface Command {
  name: string
  label: string
  description: string
  aliases?: string[]
  iconName: keyof typeof icons
  action?: (editor: Editor) => void
  command?: ({editor, range}: CommandProps) => void
  shouldBeHidden?: (editor: Editor) => boolean
}

export interface MenuListProps {
  editor: Editor
  items: Group[]
  command: (command: Command) => void
}
