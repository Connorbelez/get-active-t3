"use client"
import React, {useState} from "react";
import {Tabs, Tab, Input, Link, Button,Chip, Card, CardBody, CardHeader, CardFooter} from "@/components/ClientNextUI";
import HTicketCard, {HTicketCardProps} from "./ProfileTickets";
import { Calendar, Clock, MapPinned } from "lucide-react";
// import {NewTicket, SelectTicket} from "@/lib/planetscale";
// import TicketCard from "@/app/events/[...event]/components/TicketCard";
// import ProfileTickets from "@/app/profile/[...profile]/components/ProfileTickets";
// import ProfileSavedEventCard from "@/app/profile/[...profile]/components/ProfileSavedEventCard";
// import EventDetailDrawer from "./EventDetailDrawer";


export default function App({tickets,savedEvents}: {tickets:any, savedEvents:NonNullable<unknown>[] | undefined }){
    //ToDo: login is not a tab change this
    // const [selected, setSelected] = React.useState("login");
    // console.log("TICKETS : ", tickets[0])
    // const [open, setOpen] = React.useState(false);
    // let [eventDetails, setEvents] = React.useState({});
    const [selectedKeys, setSelectedKeys] = useState(new Set(["-1"]));
    const [selectedTicket, setSelectedTicket] = useState(-1);
    const [selectedTicketData, setSelectedTicketData] = useState<HTicketCardProps['ticket']>();

    console.log("\n\n\n\n ======================= TICKETS FROM EVENT TABS ======================= \n", tickets)
    console.log(tickets[0].ticket)

    return (
        <div className="flex flex-col items-center w-full">
            <Card className=" w-full m-4 p-4">
                <div className={'relative group'}>



                    <div className="absolute w-[102%] translate-x-1 -inset-2 bg-gradient-to-r from-pink-600 to-purple-600  blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

                    <CardBody className="overflow-hidden w-full dark:bg-neutral-900 bg-white rounded-2xl">
                    <Tabs
                        fullWidth
                        
                        aria-label="Tabs form"
                        className={"w-full "}
                        // selectedKey={selected}
                        // onSelectionChange={setSelected}
                    >
                        <Tab key="events" title="Saved Events">
                            <div >
                                {/* {savedEvents.map((event,index) => (
                                    <div key={index}
                                    //      onClick={()=>{
                                    //     console.log("EVENT INDEX: ", index)
                                    //     // setEvents(savedEvents[index])
                                    //     // setOpen(true)
                                    // }}
                                    >
                                        <ProfileSavedEventCard eventDetails={event}/>
                                    </div>
                                ))
                                } */}


                            </div>
                        </Tab>
                        <Tab key="tickets" title="My Tickets">
                            <div className={"flex flex-col col-span-3 items-center space-y-2 row-start-2 "} >
                                
                                {tickets.map((ticket ,index) => {
                                    console.log("TICKET FROM MAP : ", ticket)
                                    return(
                                    <div>
                                        <Card className="">
                                            <CardHeader className="flex w-full justify-center">

                                                <h1 className="text-primary text-bold ">{ticket.ticket.event.title}</h1>
                                            </CardHeader>
                                            <CardBody className="flex space-y-2">
                                                <div className="flex space-x-2">

                                                    <Chip startContent={<Calendar className="ml-2 mr-1" size={16}/>}>
                                            
                                                        {ticket.ticket.event.startDate}
                                                    
                                                    </Chip>
                                                    <Chip startContent={<Clock className="ml-2 mr-1" size={16}/>}>
                                

                                                            {ticket.ticket.event.startTime}
                                                    
                                                    </Chip>
                                                </div>
                        
                                                <Chip  startContent={<MapPinned className="ml-2 mr-1" size={16}/>}>
                                                    {ticket.ticket.event.address}
                                                </Chip>
                                            </CardBody>
                                            <CardFooter>
                                                <HTicketCard event={ticket.event} key={index} _key={index} ticket={ticket.ticket} selectedTicket={selectedTicket} setSelectedTicket={setSelectedTicket} setSelectedTicketData={setSelectedTicketData} />

                                            </CardFooter>
                                        </Card>
                                    </div>
                                    )
    
})}
                                
                            </div>
                        </Tab>
                    </Tabs>
                </CardBody>
                    </div>
            </Card>
            {/*<EventDetailDrawer open={open} setOpen={setOpen} eventDetails={eventDetails}/>*/}
        </div>
    );
}
