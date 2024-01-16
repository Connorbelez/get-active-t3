"use client"
import React, { useState, useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@/components/ClientNextUI";
import { EditIcon, DeleteIcon, EyeIcon } from "./EventTableIcons";
// import { EventTableData } from "../home/content";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@/components/ClientNextUI";
import { useRouter } from "next/navigation";
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
    const router = useRouter();
    const [eventState, setEventState] = useState([...initialEvents]);
    const archiveEvent = api.event.archiveEvent.useMutation({
        onSuccess: (data)=>{
            toast(<div>EVENT ARCHIVED: {data.event.title}</div>);
            console.log(data);
        },
        onError: (error)=>{
            toast(<div>Error archiving event</div>);
            console.log(error);

        }
    });

    const deleteEvent = api.event.deleteEvent.useMutation({
        onSuccess: (data)=>{
            toast(<div>EVENT DELETED: {data.event.title}</div>);
            console.log(data);
        },
        onError: (error)=>{
            toast(<div>Error deleting event Archiving instead</div>);
            console.log(error);
            archiveEvent.mutate({eventId: selectedEvent});
        }
    });
    const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
    const [selectedEvent, setSelectedEvent] = useState("");


    const setFeatured = api.event.setFeaturedEvent.useMutation({
        onSuccess: (data)=>{
            toast(<div>Featured Event Set</div>);
            console.log(data);
        },
        onError: (error)=>{
            toast(<div>Error setting featured event</div>);
            console.log(error);
        }
    });

    const handleSetFeatured = async (event) => {
        try {
            void setFeatured.mutateAsync({eventId: event.eventId});
        } catch (error) {
            console.error('Error setting featured event', error);
            // Handle error case
        }
    }

    const handleEdit = async (event) => {
        setSelectedEvent(event.eventId);
    }

    const handleDelete = async (event) => {
        try {
            setSelectedEvent(event.eventId);
            onOpen();
            // // deleteEvent.mutate(event.eventId);
            // setEventState(currentEvents => currentEvents.filter(e => e.eventId !== event.eventId));
            // toast(<div>EVENT DELETED: {event.title}</div>);
        } catch (error) {
            console.error('Error deleting event Attempting to Archive instead ', error);
            toast.error(<div>Error deleting event Attempting to Archive instead</div>);

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
                        <Tooltip content="Set as Featured">
                            <span onClick={()=>{
                                
                                void handleSetFeatured(event);
                            }} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span onClick={() => {router.push(`manageevents/event?id=${event.eventId}`)}} className="text-lg text-default-400 cursor-pointer active:opacity-50">
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
                    <Button color="danger" onClick={async ()=>{
                        try{

                            const res = deleteEvent.mutate({eventId: selectedEvent});
                            setEventState(currentEvents => currentEvents.filter(e => e.eventId !== selectedEvent));
                            toast(<div>EVENT DELETED: {selectedEvent}</div>);
                            onClose();
                        }catch(error){
                            console.error('Error deleting event', error);
                            toast.error(<div>Error deleting event, archiving instead</div>);
                            
                        }
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
