"use client"
import { Icon } from '@/ui/editor/components/ui/Icon'
import { icons } from 'lucide-react'
import { useMemo } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Toolbar } from '@/ui/editor/components/ui/Toolbar'
import { Surface } from '@/ui/editor/components/ui/Surface'
import { DropdownButton, DropdownCategoryTitle } from '@/ui/editor/components/ui/Dropdown'

export type ContentTypePickerOption = {
  label: string
  id: string
  type: 'option'
  disabled: () => boolean
  isActive: () => boolean
  onClick: () => void
  icon: keyof typeof icons
}

export type ContentTypePickerCategory = {
  label: string
  id: string
  type: 'category'
}

export type ContentPickerOptions = Array<ContentTypePickerOption | ContentTypePickerCategory>

export type ContentTypePickerProps = {
  options: ContentPickerOptions
}

const isOption = (option: ContentTypePickerOption | ContentTypePickerCategory): option is ContentTypePickerOption =>
  option.type === 'option'
const isCategory = (option: ContentTypePickerOption | ContentTypePickerCategory): option is ContentTypePickerCategory =>
  option.type === 'category'

export const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
  // console.log("CTPP OPTIONS:")
  // console.table(options)
  const activeItem = useMemo(() => options.find(option => option.type === 'option' && option.isActive()), [options])

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Toolbar.Button active={activeItem?.id !== 'paragraph' && !!activeItem?.type}>
          <Icon name={(activeItem?.type === 'option' && activeItem.icon) || 'Pilcrow'} />
          <Icon name="ChevronDown" className="w-2 h-2" />
        </Toolbar.Button>
      </Popover.Trigger>
      <Popover.Content asChild>
        <Surface className="flex flex-col gap-1 px-2 py-4">
          {options.map(option => {
            if (isOption(option)) {
              // console.log("CTPP OPTION:")

              // // console.table(option)
              // console.log(option.onClick.toString())
              return (
                <DropdownButton key={option.id} onClick={option.onClick} isActive={option.isActive()}>
                  <Icon name={option.icon} className="w-4 h-4 mr-1" />
                  {option.label}
                </DropdownButton>
              )
            } else if (isCategory(option)) {
              return (
                <div className="mt-2 first:mt-0" key={option.id}>
                  <DropdownCategoryTitle key={option.id}>{option.label}</DropdownCategoryTitle>
                </div>
              )
            }
          })}
        </Surface>
      </Popover.Content>
    </Popover.Root>
  )
}
