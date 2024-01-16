"use client"
import {FC, useState} from 'react'
import {
    CardBody,
    Card,
    CardHeader,
    CardFooter,
    Image,
    Popover,
    PopoverTrigger,
    PopoverContent, Snippet
} from "@/components/ClientNextUI";
import {Button} from "@/components/ClientNextUI";
// import HeartIcon from "@/components/icons/HeartIcond";
import Link from "next/link";
import {title} from "@/components/Primatives/Typography";
import {Chip} from "@/components/ClientNextUI";
import * as React from "react";
// import {CopyIcon} from "@/components/Icons/CopyIcon";
// import {CheckIcon} from "@/components/Icons/CheckIcon";

function formatTime(timeString: string): string {
    const time: Date = new Date(`2000-01-01T${timeString}`);
    const hours: number = time.getHours();
    const minutes: number = time.getMinutes();

    const period: string = hours >= 12 ? 'PM' : 'AM';
    const formattedHours: number = hours % 12 || 12;
    const formattedMinutes: string = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes} ${period}`;
}
function formatDate(dateString: string): string {
    const date: Date = new Date(dateString);
    const monthNames: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    const day: number = date.getDate();
    const month = monthNames[date.getMonth()] as string;
    const year: number = date.getFullYear();

    let daySuffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
        daySuffix = 'st';
    } else if (day === 2 || day === 22) {
        daySuffix = 'nd';
    } else if (day === 3 || day === 23) {
        daySuffix = 'rd';
    }

    return `${month} ${day}${daySuffix}`;
}
const App = (event:any) => {
    const event_card_interface = event.eventDetails

    //console.log(ticket, typeof ticket)


    // console.log("\n=============================EVENT CARD: ", eventDetails);
    // //@ts-ignore
    // const event_title = eventDetails.event_title;
    // //@ts-ignore
    // const event_headline = eventDetails.event_headline;
    // //@ts-ignore
    // const event_date = eventDetails.event_date;
    // //@ts-ignore
    // const event_start_time = eventDetails.event_start_time;
    // //@ts-ignore
    // const event_location = eventDetails.event_location;
    // //@ts-ignore
    const image = event_card_interface.hero_image;
    console.log(event_card_interface.hero_image)
    const fallbackSrc = "/canadaDay.jpg";
    const [imgSrc, setImgSrc] = useState(image);
    return (
        <Card


                className=" w-full h-full my-3 bg-content1-foreground bg-opacity-10 backdrop-blur-sm  dark:shadow-lg shadow-black">
                <CardHeader className="absolute z-10 top-1 grid grid-cols-3">


                </CardHeader>
            <Link href={{pathname:'//get-active.vercel.app/events/event',query: {id: event_card_interface.event_id, title:event_card_interface.event_title}}} className="w-full col-span-12 lg:col-span-4 md:col-span-6">
            <Image
                        removeWrapper

                        alt="Relaxing app background"
                        // className="z-0 object-cover rounded-b-none sm:h-[200px] h-[250px] w-full "
                        className="z-0 object-cover rounded-b-none sm:h-[200px] h-[250px] w-full "
                        src={imgSrc}
                        onError={() => {
                            setImgSrc(fallbackSrc);
                        }}
                    />
            </Link>

                <Link href={{pathname:'//get-active.vercel.app/events/event',query: {id: event_card_interface.event_id, title:event_card_interface.event_title}}} className="w-full col-span-12 lg:col-span-4 md:col-span-6">

                    <CardBody className="h-fit overflow-hidden">
                        <h1 className={title({ color: "violet",size:"xsm" })}>{event_card_interface.event_title}&nbsp;</h1>
                        <p >{event_card_interface.event_headline}</p>
                    </CardBody>
                </Link>
                <Link href={{pathname:'//get-active.vercel.app/events/event',query: {id: event_card_interface.event_id, title:event_card_interface.event_title}}} className="w-full col-span-12 lg:col-span-4 md:col-span-6">

                    <CardFooter className={"flex flex-row flex-wrap gap-1 h-full w-full sm:space-2 "}>


                        <Chip

                            startContent={<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z" fill="currentColor" fill-rule="evenodd" clipRule="evenodd"></path></svg>}
                            variant={"faded"}
                            color={"warning"}
                        >
                            <p className={"w-fit whitespace-nowrap"}>{formatDate(event_card_interface.event_date)}</p>
                        </Chip>

                        <Chip

                            startContent={<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z" fill="currentColor" fill-rule="evenodd" clipRule="evenodd"></path></svg>}
                            variant={"faded"}
                            color={"warning"}
                        >
                            <p className={"w-fit whitespace-nowrap"}>{formatTime(event_card_interface.event_start_time)}</p>
                        </Chip>
                        <Chip
                            variant={"faded"}
                            color={"warning"}
                        >
                            <p className={"w-fit whitespace-nowrap"}>{event_card_interface.event_location}</p>
                        </Chip>


                    </CardFooter>
                </Link>
        </Card>
    )
}

export default App