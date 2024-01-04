"use client"
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue} from "@nextui-org/react";
import {EditIcon} from "./EventTableIcons";
import {DeleteIcon} from "./EventTableIcons";
import {EyeIcon} from "./EventTableIcons";
// import {columns, users} from "./data";
import { Event } from "@prisma/client";
import {api} from "@/trpc/server";
import { EventTableData } from "../home/content";
const statusColorMap: Record<string, ChipProps["color"]>  = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

// export interface EventTableData {
//     id: number;
//     eventId: string;
//     category: string;
//     title: string;
//     status: string;
//     heroImage: string;
//     numberAttending: number;
//     startDate: string;
//     startTime: string;
//   }
const columns = [
    {name: "TITLE", uid: "title"},
    {name: "DATE", uid: "date"},
    {name: "STATUS", uid: "status"},
    {name: "ACTIONS", uid: "actions"},
  ];

export default function App({events}: {events: EventTableData[]}) {
    
    
    const renderCell = React.useCallback((event: EventTableData, columnKey: React.Key) => {
        const cellValue = event[columnKey as keyof EventTableData];

        switch (columnKey) {
            case "title":
                return (
                    <User
                        avatarProps={{radius: "lg", src: event.heroImage}}
                        description={event.headline}
                        name={event.title}
                    >
                        {event.title}
                    </User>
                );
            case "date":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{event.startDate}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{event.startTime}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[event.status]} size="sm" variant="flat">
                        {event.status}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={events}>
                {(item) => (

                    <TableRow key={item.id}>
                    {(columnKey) => {
                        return(
                        <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )
                    }}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
