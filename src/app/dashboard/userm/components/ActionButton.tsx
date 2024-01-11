"use client";
import React from "react";
import {
  Dropdown,
  Popover,
  PopoverContent,
  Chip,
  useDisclosure,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  cn,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  PopoverTrigger,
} from "@nextui-org/react";
import { AddNoteIcon } from "./AddNote";
import { CopyDocumentIcon } from "./CopyDocument";
import { EditDocumentIcon } from "./EditDocument";
import { DeleteDocumentIcon } from "./DeleteDocument";
import { ChevronDown, UserPlus } from "lucide-react";
import { set } from "zod";
import {api} from "@/trpc/react"
import { useEffect, useState } from "react";
export enum UserRole {
  ADMIN = "ADMIN",
  CREATOR = "CREATOR",
  USER = "USER",
}
interface ActionButtonProps {
  onAction: (key: string) => void;
  
}

export default function App({ onAction }: ActionButtonProps) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [selectedRole, setSelectedRole] = React.useState(new Set([]));
  const [userList, setUserList] = useState<string[]>();

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const [modalOpen, setModalOpen] = React.useState(false);
  
  const items = [
    { key: "ADMIN", value: "ADMIN", color: "danger" },
    { key: "USER", value: "USER", color: "primary" },
    { key: "CREATOR", value: "CREATOR", color: "warning" },
  ];
  
  
  
  const [isButtonOpen, setIsButtonOpen] = React.useState(false);
  return (
    <div className="flex w-full justify-center">

      <Dropdown onOpenChange={(open) => setIsButtonOpen(open)}>
        <DropdownTrigger>
          <Button
            color="primary"
            startContent={
              <ChevronDown
                className={
                  isButtonOpen
                    ? "transition-transform "
                    : "rotate-90 transition-transform"
                }
              />
            }
            variant="faded"
          >
            Action Menu
          </Button>
        </DropdownTrigger>
        <DropdownMenu
        closeOnSelect={false}
          // onAction={(key: string) => handleAction(key)}
          onAction={(key)=>{onAction(key as  string)}}
          variant="faded"
          aria-label="Dropdown menu with icons"
        >
          <DropdownSection showDivider>
            <DropdownItem

              key="new"
              shortcut="⌘N"
              startContent={
                <UserPlus
                  fill="currentColor"
                  size={20}
                  className={iconClasses}
                />
              }
            >
              New user
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Danger zone">


            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              shortcut="⌘⇧D"
              startContent={
                <DeleteDocumentIcon
                  className={cn(iconClasses, "text-danger")}
                />
              }
            >
              Delete user
            </DropdownItem>
          </DropdownSection>

        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
