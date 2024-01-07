"use client"
import React, { useState, useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { EditIcon, DeleteIcon, EyeIcon } from "./EventTableIcons";
// import { EventTableData } from "../home/content";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

export interface EventTableData {
    id: number;
    eventId: string;
    category: string;
    title: string;
    status: string;
    heroImage: string;
    numberAttending: number;
    startDate: string;
    startTime: string;
    headline: string;
  }

const columns = [
    { name: "TITLE", uid: "title" },
    { name: "DATE", uid: "date" },          
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];

export default function App({ events: initialEvents }) {
    const [eventState, setEventState] = useState([...initialEvents]);
    const deleteEvent = api.event.deleteEvent.useMutation();
    const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
    const [selectedEvent, setSelectedEvent] = useState("");


    const handleDelete = async (event) => {
        try {
            setSelectedEvent(event.eventId);
            onOpen();
            // // deleteEvent.mutate(event.eventId);
            // setEventState(currentEvents => currentEvents.filter(e => e.eventId !== event.eventId));
            // toast(<div>EVENT DELETED: {event.title}</div>);
        } catch (error) {
            console.error('Error deleting event', error);
            // Handle error case
        }
    }

    const renderCell = useCallback((event, columnKey) => {
        const cellValue = event[columnKey as keyof EventTableData];
        switch (columnKey) {
            case "title":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: event.heroImage }}
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
                        
                        <span onClick={() => handleDelete(event)} className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon />
                        </span>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [eventState]);

    return (
        <div className="w-full h-full">
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalHeader>Delete Event</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this event?
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button color="danger" onClick={()=>{
                        deleteEvent.mutate({eventId: selectedEvent});
                        setEventState(currentEvents => currentEvents.filter(e => e.eventId !== selectedEvent));
                        toast(<div>EVENT DELETED: {selectedEvent}</div>);
                        onClose();
                    }}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        
        <Table aria-label="Example table with custom cells mb-10">
            <TableHeader columns={columns}>
                {column => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={eventState}>
                {item => (
                    <TableRow key={item.id}>
                        {columnKey => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
        </div>
    );
}
