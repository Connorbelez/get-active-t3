"use client"
import React from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import {NewTicket, SelectTicket} from "@/lib/planetscale";
// import TicketCard from "@/app/events/[...event]/components/TicketCard";
import ProfileTickets from "@/app/profile/[...profile]/components/ProfileTickets";
import ProfileSavedEventCard from "@/app/profile/[...profile]/components/ProfileSavedEventCard";
import EventDetailDrawer from "./EventDetailDrawer";
export default function App({tickets,savedEvents}: {tickets: NewTicket[] | undefined, savedEvents:{}[] | undefined }){
    //ToDo: login is not a tab change this
    const [selected, setSelected] = React.useState("login");
    // console.log("TICKETS : ", tickets[0])
    const [open, setOpen] = React.useState(false);
    let [eventDetails, setEvents] = React.useState({});
    return (
        <div className="flex flex-col w-full">
            <Card className="max-w-md m-4 p-4">
                <div className={'relative group'}>



                    <div className="absolute max-w-md  -inset-2 bg-gradient-to-r from-pink-600 to-purple-600  blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

                    <CardBody className="overflow-hidden max-w-md  dark:bg-neutral-900 bg-white rounded-2xl">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                        className={"max-w-md"}
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
                            <div className={"grid grid-flow-row col-span-3 items-center gap-4 row-start-2 "} >

                                {/* {tickets.map((ticket ,index) => (
                                    <div key={index}>
                                        <ProfileTickets ticket={ticket}/>

                                    </div>
                                ))} */}
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
