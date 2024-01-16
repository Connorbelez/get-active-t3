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

} from "@/components/ClientNextUI";
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
import { getEventsAndAttendees, getEventAndAttendeeType } from "@/app/dynamicEdgeFunctions";
import { AttendeeTableData } from "./TableWrapper";

const statusColorMap = {
  paid: "success",
  paymentOwing: "danger",
  free: "warning",
};

const roleChipColorMap = {
  ADMIN: "danger",
  USER: "default",
  CREATOR: "warning",
}

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "actions"];


const iconClasses =
"text-xl text-default-500 pointer-events-none flex-shrink-0";



interface pageProps{
  data:AttendeeTableData
}
export default function App({data}:pageProps) {

  


  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set<string>([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedEvents, setSelectedEvents] = React.useState<string[]>();

  const [eventFilter, setEventFilter] = React.useState("all");


  const events = Array.from(data)

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






  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "eventTitle",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  // const headerColumns = React.useMemo(() => {
  //   if (visibleColumns.entries.toString() === "all") return columns;

  //   return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  // }, [visibleColumns]);
  const headerColumns = columns;

  const filteredItems = React.useMemo(() => {
    let filteredEvents = [...events]

    filteredEvents = filteredEvents.filter((event) =>
    //@ts-ignore
      event.eventTitle.toLowerCase().includes(filterValue.toLowerCase())
    );

    return filteredEvents;
  }, [events, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    console.log("FILTERED ITEMS: ",filteredItems)
    return filteredItems.slice(start, end);
  }, [page, events, rowsPerPage]);

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

  const renderCell = React.useCallback((event, columnKey) => {
    const cellValue = event[columnKey];

    switch (columnKey) {
      case "eventTitle":
        return (
          <User
            avatarProps={{radius: "lg", src: event.eventImage}}
            
            name={cellValue}
            key={event._key}
          >
          
          </User>
        );
      case "name":
        return (
          <User
            description={event.email}
            name={cellValue}
            key={event._key}
          >
            {event.email}
          </User>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[event.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "ticketName":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "ticketPrice":
        return (
          <span className="text-default-600 text-sm">${cellValue}</span>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[event.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );

      // case "actions":

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

            {/* <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button> */}

            
           

    <div className="flex w-full justify-center">

    </div>
  
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {data.length} TicketSales</span>
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
    data.length,
    onSearchChange,
    hasSearchFilter,
    selectedKeys,
  ]);

  const bottomContent = React.useMemo(() => {
    const totalSales = filteredItems.reduce((acc, item) => acc + item.ticketPrice, 0);
    const numberOfTicketsSold = filteredItems.length
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys.has("all")
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <span className="w-[30%] text-small text-default-400">
    
            {`Total Sales: $${totalSales} from ${numberOfTicketsSold} tickets`}
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


  
  const onAction = (key: any, data:any) => {
    console.log("key",key)
    if(!data) return
    const eventsArr = Array.from(data)
    switch (key) {
      case "new":
        console.log("new : ",eventsArr )
        break;
      case "edit":
        console.log("edit", eventsArr)
        break;
      case "delete":
        console.log("delete", eventsArr)
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
      fullWidth
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
          <TableRow key={item._key}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
