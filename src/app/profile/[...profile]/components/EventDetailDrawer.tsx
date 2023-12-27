"use client";

import { Drawer } from "vaul";
import React from "react";
import {usePress} from 'react-aria';
// import TicketTiers from "@/app/events/[...event]/components/TicketTiers";
import {title} from "@/components/Primatives/Typography";
//@ts-ignore
interface drawerProps {
    open: boolean,
    setOpen: any,
    eventDetails: any
}
export default function MyDrawer({open, setOpen, eventDetails}: drawerProps) {
    // const event_props = {
    //     id: id,
    //     event_creator : event_creator,
    //     event_title : event_title,
    //     event_headline : event_headline,
    //     event_date : event_date,
    //     event_start_time : event_start_time,
    //     length : length,
    //     event_location : event_location,
    //
    // }

    // const [open, setOpen] = React.useState(false);
    // let [events, setEvents] = React.useState([]);
    // @ts-ignore
    // let { pressProps, isPressed } = usePress({
    //     onPressStart: (e) => {
    //         if(!open) {setOpen(true);}
    //     },
    //
    //     onPress: (e) => {
    //         if(!open) {setOpen(true);}
    //     }
    // });
    return (
        <Drawer.Root
            // fixedHeight={true}
            shouldScaleBackground
            open={open} onOpenChange={setOpen}>

            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

                <Drawer.Content className="dark:bg-zinc-800/40 h-5/6 bg-zinc-300/40 backdrop-blur dark:backdrop-blur-lg flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
                    <div className="p-4 dark:bg-black-800/80 backdrop-blur dark:backdrop-blur-xl rounded-t-[10px] flex-1">
                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300/50 mb-8" />
                        <div className="max-w-md mx-auto">
                            <Drawer.Title className="font-medium mb-2 fixed top-0 mt-5 ">
                                <h1 className={title()}>Get&nbsp;</h1>
                                <h1 className={title({ color: "violet" })}>Active&nbsp;</h1>
                            </Drawer.Title>
                            <p>{eventDetails.event_title}</p>
                            <p>{eventDetails.event_headline}</p>
                            <p>{eventDetails.event_date}</p>
                            <p>{eventDetails.event_location}</p>
                            <p>{eventDetails.event_address}</p>
                            <p>{eventDetails.event_start_time}</p>



                        </div>
                    </div>
                    <div className="p-4 bg-violet-700 overflow-y-visible  border-t border-zinc-950 mt-auto">
                        <div className="flex gap-6 justify-end max-w-md mx-auto">
                            <a
                                className="text-xs text-zinc-200 flex items-center gap-0.25"
                                href="https://github.com/Connorbelez"
                                target="_blank"
                            >
                                GitHub
                                <svg
                                    fill="none"
                                    height="16"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    width="16"
                                    aria-hidden="true"
                                    className="w-3 h-3 ml-1"
                                >
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                    <path d="M15 3h6v6"></path>
                                    <path d="M10 14L21 3"></path>
                                </svg>
                            </a>
                            <a
                                className="text-xs text-zinc-200 flex items-center gap-0.25"
                                href="https://twitter.com/Cbizydev"
                                target="_blank"
                            >
                                Twitter
                                <svg
                                    fill="none"
                                    height="16"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    width="16"
                                    aria-hidden="true"
                                    className="w-3 h-3 ml-1"
                                >
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                    <path d="M15 3h6v6"></path>
                                    <path d="M10 14L21 3"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}
