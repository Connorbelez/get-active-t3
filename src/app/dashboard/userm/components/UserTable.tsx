"use client"
import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Listbox,
  ListboxItem,
  DropdownSection,
  cn,

} from "@nextui-org/react";
import { DeleteDocumentIcon } from "./DeleteDocument";
import { ChevronDown, UserPlus } from "lucide-react";
import {api} from "@/trpc/react"
import ActionButton from "./ActionButton";
import {PlusIcon} from "./PlusIcon";
import {VerticalDotsIcon} from "./VerticalDotsIcon";
import {SearchIcon} from "./SearchIcon";
import {ChevronDownIcon} from "./ChevronDownIcon";
import {columns, statusOptions} from "./data";
import {capitalize} from "./utils";
import { User as UserType } from "@prisma/client";
import { EditDocumentIcon } from "./EditDocument";
import { Delete, FileEdit, UserCircle } from "lucide-react";
import { toast } from "sonner";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const roleChipColorMap = {
  ADMIN: "danger",
  USER: "default",
  CREATOR: "warning",
}

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "actions"];

interface UserTableProps {
  users: UserType[];
}

const iconClasses =
"text-xl text-default-500 pointer-events-none flex-shrink-0";




export default function App({users}: UserTableProps) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set<string>([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>();
  const editUser = api.member.updateUserById.useMutation({
    onSuccess: (data) => {
      console.log('user updated')
      toast.success(<p>User: {data.name} updated with role: {data.role}</p>)
      console.log("DATA: ",data)
    }
  
  })

  const handleSetRole = (user,role) => {
    console.log("user",user)
    const currentRole = user.role
    editUser.mutate({id:user.id,data:{role:role}})

  }


  const setAdmin = () =>{
    editUser.mutate({id:"clqija96o0000er50fh21p2hk",data:{role:"ADMIN"}})
  } 





  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "name",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns.entries.toString() === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
      //@ts-ignore
        user.name.toLowerCase().includes(filterValue.toLowerCase()) || user.email.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      // filteredUsers = filteredUsers.filter((user) =>
      //   Array.from(statusFilter).includes(user.status),
      // );
      //ToDo: find a different filter
      console.log("FAKE FILTER!")
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      if(typeof first === "string" && typeof second === "string"){
        const cmp = first.toLowerCase() < second.toLowerCase() ? -1 : first.toLowerCase() > second.toLowerCase() ? 1 : 0;
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src: user.image}}
            description={user.email}
            name={cellValue}
            key={user.is}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          // <div className="flex flex-col">
          //   <p className="text-bold text-small capitalize">{cellValue}</p>
          //   <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
          // </div>
          <Chip className="capitalize" color={roleChipColorMap[user.role]} size="sm" variant="faded">
            {cellValue}
          </Chip>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown
              
            >
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className={"text-default-300"} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
              variant="faded"
                closeOnSelect={false}
              >
                <DropdownItem
                startContent={<EditDocumentIcon size={24} />}
                  onPress={() => {
                    console.log("edit user")
                  }}
                >Edit user
                </DropdownItem>
                {/* <DropdownItem
                
                >View</DropdownItem> */}
                <DropdownItem
                startContent={<UserCircle size={24} />}
                > 
                  <Popover
                    placement="top-start"
                  >
                    <PopoverTrigger
                      
                    >
                      User Role
                    </PopoverTrigger>
                    <PopoverContent
          
                      style={{ width: "max-content" }}
                    >
                      <Listbox 

                          variant="faded"
                       
                        >
                        <ListboxItem
                        onPress={() => {
                          handleSetRole(user, "ADMIN")
                        }}
                        key={"admin"}>
                          Admin
                        </ListboxItem>
                        <ListboxItem 
                                        onPress={() => {
                                          handleSetRole(user, "USER")
                                        }}
                        key="user">
                          User
                        </ListboxItem>
                        <ListboxItem 
                                        onPress={() => {
                                          handleSetRole(user, "CREATOR")
                                        }}
                        key="creator">
                          Creator
                        </ListboxItem>

                      </Listbox>
                    </PopoverContent>
                  </Popover>
                </DropdownItem>
                
                <DropdownItem
                  startContent={<DeleteDocumentIcon size={24} />}
                  onPress={() => {
                    // handleDelete(user)
                  }}
                >Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])
  const [isButtonOpen, setIsButtonOpen] = React.useState(false);
  const topContent = React.useMemo(() => {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={
              {
                mainWrapper:"py-0 h-[40px]",
                inputWrapper:"py-0 h-[40px]",
              }
            }

            variant="bordered"
            className="w-full  sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="flex">
                <Button className="w-full" endContent={<ChevronDownIcon size={8} />} variant="faded">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                
                // onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger
              
              className="flex">
                <Button className="w-full" endContent={<ChevronDownIcon size={24} />} variant="faded">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                //@ts-ignore
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button> */}

            
           

    <div className="flex w-full justify-center">

      <Dropdown 
        
      onOpenChange={(open) => setIsButtonOpen(open)}>
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
        onAction={(key: string) => onAction(key, selectedKeys)}
          // onAction={(key)=>{onAction(key, selectedKeys.values)}}
          variant="faded"
          aria-label="Dropdown menu with icons"
        >
          <DropdownSection showDivider>
            <DropdownItem 
              // onPress={() =>{handleNew(selectedKeys)}}
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
  
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {users.length} users</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
    selectedKeys,
  ]);

  const bottomContent = React.useMemo(() => {

    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys.has("all")
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>

        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);


  
  const onAction = (key: any, users:any) => {
    console.log("key",key)
    if(!users) return
    const usersArray = Array.from(users)
    switch (key) {
      case "new":
        console.log("new : ",usersArray )
        break;
      case "edit":
        console.log("edit", usersArray)
        break;
      case "delete":
        console.log("delete", usersArray)
        break;
      default:
        break;
    }
  }

  // const handleNew = ( users:any) => {
  //   if(!users) return
  //   const usersArray = Array.from(users)
  //   console.log("users",usersArray)

  // }

  // const handleDelete = ( users:any) => {
  //   if(!users) return
  //   const usersArray = Array.from(users)
  //   console.log("DELETE USERS: ",usersArray)
    
  // }
  
  
  return (
    <Table
      className="TABLE w-full "
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      //@ts-ignore
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      //@ts-ignore
      onSelectionChange={setSelectedKeys}
      //@ts-ignore
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
