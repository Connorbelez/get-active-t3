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
  selectedUsers: string[];
}
export default function App({ selectedUsers }: ActionButtonProps) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [selectedRole, setSelectedRole] = React.useState(new Set([]));
  const [userList, setUserList] = useState<string[]>();
  
  useEffect(() => {
    console.log('selectedUsers', selectedUsers)
    if(selectedUsers){
      setUserList([...selectedUsers])
      console.log("USER LIST: ", userList)
    }
  },[selectedUsers])  

  const batchChangeUserRole = api.member.bactchChangeUserRole.useMutation(
    {
      onSuccess: (data) => {
        console.log("success");
        console.log(data);
        onClose();
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const handleRoleChange = () => {
    const role = selectedRole.values().next().value;
    console.log("HANDLECHANGE:",selectedUsers, role)

    if(userList && role){

      batchChangeUserRole.mutate({ userIds:userList, role: role });
    }else{
      console.log("error")
      console.log("userList", userList)
      console.log("role", role)
    }

  };

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isButtonOpen, setIsButtonOpen] = React.useState(false);
  const handleAction = (key: string) => {
    console.log(key);
    switch (key) {
      case "new":
        console.log("new");
        onOpen();

        break;
      case "edit":
        console.log("changeUserRole");

        break;
      case "delete":
        console.log("delete");
        break;
      default:
        console.log("default");
        break;
    }
  };
  const items = [
    { key: "ADMIN", value: "ADMIN", color: "danger" },
    { key: "USER", value: "USER", color: "primary" },
    { key: "CREATOR", value: "CREATOR", color: "warning" },
  ];

  // const PopContent = () => (
  //   <PopoverContent
  //     className="p-4"
  //   >
  //     <Select
  //       placeholder="Select User Role"
  //       className="w-full"
  //       items={items}
  //       onSelectionChange={setSelectedRole}
  //       renderValue={(items) => {
  //         return items.map((item) => (
  //           <Chip
  //             key={item.key}
  //             color={
  //               item.data?.color as
  //                 | "default"
  //                 | "primary"
  //                 | "secondary"
  //                 | "success"
  //                 | "warning"
  //                 | "danger"
  //                 | undefined
  //             }
  //             variant="faded"
  //           >
  //             {item.data?.value}
  //           </Chip>
  //         ));
  //       }}
  //     >
  //       {(item) => (
  //         <SelectItem
  //           key={item.key}
  //           value={item.value}
  //           color={
  //             item.color as
  //               | "default"
  //               | "primary"
  //               | "secondary"
  //               | "success"
  //               | "warning"
  //               | "danger"
  //               | undefined
  //           }
  //         >
  //           {item.value}
  //         </SelectItem>
  //       )}
  //     </Select>

  //       <Button
  //         onPress={handleRoleChange}
  //         color='danger'
  //         variant="faded"
  //         className="w-full min-w-[150px] my-2"
  //       >Submit</Button>
  
  //   </PopoverContent>

  // )

  return (
    <div className="flex w-full justify-center">
      {/* <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody className="grid grid-cols-2 align-middle items-center  prose">
            <h2 className="text-primary mb-0 pb-0 text-center">Set Roles To:</h2>
            <Select

              placeholder="Select User Role"
              className="w-full"
              items = {items}
              renderValue={
                    (items) => {
                    return (                 
                    items.map((item) => (
                    <Chip key={item.key} color={item.data?.color as "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined}  variant="faded">
                      {item.data?.value} 
                    </Chip>
                  )))
                  }
              }
            >
              {(item) => (
                <SelectItem key={item.key} value={item.value} color={item.color as "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined}>
                  {item.value}
                </SelectItem>
              )
              }
            </Select>

          </ModalBody>
          <ModalFooter>
            <Button className="min-h-full " variant="ghost">Cancel</Button>
            <Button className="min-h-full "  variant="faded" color="danger" >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
      {/* <Popover>
        <PopoverTrigger></PopoverTrigger>
        <PopoverContent>
          <Select
            placeholder="Select User Role"
            className="w-full"
            items={items}
            renderValue={(items) => {
              return items.map((item) => (
                <Chip
                  key={item.key}
                  color={
                    item.data?.color as
                      | "default"
                      | "primary"
                      | "secondary"
                      | "success"
                      | "warning"
                      | "danger"
                      | undefined
                  }
                  variant="faded"
                >
                  {item.data?.value}
                </Chip>
              ));
            }}
          >
            {(item) => (
              <SelectItem
                key={item.key}
                value={item.value}
                color={
                  item.color as
                    | "default"
                    | "primary"
                    | "secondary"
                    | "success"
                    | "warning"
                    | "danger"
                    | undefined
                }
              >
                {item.value}
              </SelectItem>
            )}
          </Select>
        </PopoverContent>
      </Popover> */}


      


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
          onAction={(key: string) => handleAction(key)}
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
            {/* <DropdownItem

              key="copy"
              shortcut="⌘C"
              className="text-warning"
              color={"warning"}
              startContent={<EditDocumentIcon className={cn(iconClasses)} />}
            >
              <Popover
                placement='left'
                className="lg"
                triggerType="tree"
                offset={45}
                onClose={onClose}
              >
                <PopoverTrigger
                 
                >
                    Change user role

                </PopoverTrigger>
                {PopContent()}
              </Popover>
            
            </DropdownItem>  */}


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
          {/* <DropdownItem
            key="edit"
            shortcut="⌘⇧E"
            startContent={<EditDocumentIcon className={iconClasses} />}
          >
            Ban user
          </DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
