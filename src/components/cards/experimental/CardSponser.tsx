// import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/cards/ShadCard"

import { title } from "@/components/Primatives/Typography"
import Image from "next/image"

import { Divider,Chip, Card,CardBody,CardFooter,CardHeader,Button,Popover, PopoverTrigger,PopoverContent} from "@nextui-org/react"
// import {LightningBoltIcon,SewingPinIcon, Crosshair1Icon} from '@radix-ui/react-icons'
import { MapPin as Crosshair1Icon } from "lucide-react"
import TicketIcon from "@/components/icons/TicketIcon"
import HeartIcon from "@/components/icons/HeartIcond"
import CharityIcon from "@/components/icons/CharityIcon"
import Link from "next/link"
import {Event} from "@prisma/client"
import { Snippet } from "@nextui-org/react"
interface compProps {
    event:Event;
}

function formatTime(timeString: string): string {
    const time: Date = new Date(`2000-01-01T${timeString}`);
    const hours: number = time.getHours();
    const minutes: number = time.getMinutes();

    const period: string = hours >= 12 ? 'PM' : 'AM';
    const formattedHours: number = hours % 12 || 12;
    const formattedMinutes: string = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes} ${period}`;
}

function formatDate(dateString: string): {month: string, day: number, year: number, daySuffix: string} {
    const date: Date = new Date(dateString);
    const monthNames: string[] = [
        'JAN', 'FEB', 'MAR', 'APR', 'May', 'JN', 'JL',
        'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'
    ];

    const day: number = date.getDate();
    // Fix: Add null check to ensure the value is not undefined
    const month: string = monthNames[date.getMonth()] ?? '';
    const year: number = date.getFullYear();

    let daySuffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
        daySuffix = 'st';
    } else if (day === 2 || day === 22) {
        daySuffix = 'nd';
    } else if (day === 3 || day === 23) {
        daySuffix = 'rd';
    }

    return {month: month, day: day, year: year, daySuffix: daySuffix};
}

export default function Comp({event}:compProps) {
    const content = (
        <PopoverContent className="w-[240px]">

            <Snippet 
            symbol="📋"
            // codeString={
            //     {pathname:"events/event",query: {
            //         id: event.id.toString(), title:event.title, headline:event.headline, 
            //         category:event.category, heroImage:event.heroImage, location:event.location,
            //         startDate:event.startDate, startTime:event.startTime, length:event.length,
            //         ticketStartingPrice:event.ticketStartingPrice, address:event.address,
            //         ageRestriction:event.adultOnly, drinksIncluded:event.drinksIncluded,
            //         foodIncluded:event.foodIncluded, description:event.eventDescription,
            //         Org: event.orgId, creator: event.createdByEmail, creatorId: event.createdById,
            //         lat:event.lat, lng:event.lng, latlng:event.latlng
            //     }}.query.toString()
            //}
             >
                Copy Sharable Link
            </Snippet>

        </PopoverContent>
      )
    const liked=true;
    const formattedDate = formatDate(event.startDate); 
        const formattedStartTime = formatTime(event.startTime);
    console.log(event)
    return (
        <Card className={"WRAPPERCARD bg-background h-[370px] w-full md:h-[450px] md:w-[512px]  rounded-[40px]  dark:hover:shadow-lg dark:hover:shadow-violet-700/50"}>
            <CardHeader className="WRAPPERCARDHeader absolute z-10 top-1 grid grid-cols-3">
                    <Button
                        // onPress={()=> {
                        //     if (Session) {
                        //         console.log("Trying to save event")
                        //         //@ts-ignore
                        //         const res = saveEvent(event_card_interface.id.toString(), Session?.user?.id, Session?.user?.email)
                        //         setLiked((v) => !v)
                        //     } else {
                        //         console.log("USER NOT LOGGED IN");
                        //         router.push("/api/auth/signin");

                        //     }
                        // }
                        // }
                        isIconOnly
                        className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                        radius="full"
                        variant="light">
                        <HeartIcon
                            className={liked ? "[&>path]:stroke-transparent" : ""}
                            fill={liked ? "currentColor" : "none"}
                        />
                    </Button>
                    <Popover

                        showArrow
                        offset={10}
                        placement="top"
                        backdrop="blur"

                    >
                        <PopoverTrigger>
                            <Button
                                className={"col-start-3 justify-self-end"}
                                isIconOnly
                                color={"warning"}
                                variant={"faded"}
                            >
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 5.00006C3.22386 5.00006 3 5.22392 3 5.50006L3 11.5001C3 11.7762 3.22386 12.0001 3.5 12.0001L11.5 12.0001C11.7761 12.0001 12 11.7762 12 11.5001L12 5.50006C12 5.22392 11.7761 5.00006 11.5 5.00006L10.25 5.00006C9.97386 5.00006 9.75 4.7762 9.75 4.50006C9.75 4.22392 9.97386 4.00006 10.25 4.00006L11.5 4.00006C12.3284 4.00006 13 4.67163 13 5.50006L13 11.5001C13 12.3285 12.3284 13.0001 11.5 13.0001L3.5 13.0001C2.67157 13.0001 2 12.3285 2 11.5001L2 5.50006C2 4.67163 2.67157 4.00006 3.5 4.00006L4.75 4.00006C5.02614 4.00006 5.25 4.22392 5.25 4.50006C5.25 4.7762 5.02614 5.00006 4.75 5.00006L3.5 5.00006ZM7 1.6364L5.5682 3.0682C5.39246 3.24393 5.10754 3.24393 4.9318 3.0682C4.75607 2.89246 4.75607 2.60754 4.9318 2.4318L7.1818 0.181802C7.26619 0.09741 7.38065 0.049999 7.5 0.049999C7.61935 0.049999 7.73381 0.09741 7.8182 0.181802L10.0682 2.4318C10.2439 2.60754 10.2439 2.89246 10.0682 3.0682C9.89246 3.24393 9.60754 3.24393 9.4318 3.0682L8 1.6364L8 8.5C8 8.77614 7.77614 9 7.5 9C7.22386 9 7 8.77614 7 8.5L7 1.6364Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </Button>
                        </PopoverTrigger>
                        {content}
                    </Popover>
                </CardHeader>



            <div className="rounded-[40px] container relative overflow-hidden  h-[300px] w-full dark:shadow-lg dark:hover:shadow-lg shadow-lg shadow-black/60 dark:hover:shadow-violet-600/60 dark:shadow-violet-600/40">
                <Image src={event.heroImage} layout="fill"  alt="Canada Day" />
            </div>
            {/* <CardHeader>
                <Divider orientation="vertical" />
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader> */}

            <Link href={{pathname:"events/event",query: {
                        id: event.id.toString(), title:event.title, headline:event.headline, 
                        category:event.category, heroImage:event.heroImage, location:event.location,
                        startDate:event.startDate, startTime:event.startTime, length:event.length,
                        ticketStartingPrice:event.ticketStartingPrice, address:event.address,
                        ageRestriction:event.adultOnly, drinksIncluded:event.drinksIncluded,
                        foodIncluded:event.foodIncluded, description:event.eventDescription,
                        Org: event.orgId, creator: event.createdByEmail, creatorId: event.createdById,
                        lat:event.lat, lng:event.lng, latlng:event.latlng
                    }}}>

            
                <CardBody className={"grid grid-cols-12 gap-0 overflow-hidden"}>
                        <div className={"flex col-start-1 col-span-4 items-center justify-around space-x-2"}>
                            <div className={"flex flex-col items-center  "}>
                                <div className="flex flex-row align-middle mb-1">
                                    <Crosshair1Icon stroke={"#52525b"} className="w-4 mt-0.5 h-4 mr-2 fill-zinc-600" />
                                    <h4 className={"prose dark:prose-invert text-sm dark:text-zinc-400/60"}>{event.location}</h4>
                                </div>
                                <h1 className={`-mb-2  dark:${title({size:"xsm",color:"pink"})}`}>{formattedDate.month}</h1>
                                <h1 className="prose prose-2xl font-bold  dark:text-zinc-400">{formattedDate.day}</h1>
                                <h4 className={"prose dark:prose-invert text-sm dark:text-zinc-400/60"}>{event.startTime}</h4>
                            </div>
                            <Divider orientation="vertical" className=" bg-red h-5/6 slef w-[1px]  bg-zinc-700"/>

                        </div>
                        
                        <div className={"col-start-5 col-span-4 flex flex-col items-left my-auto "}>
                            <CardHeader className="grid grid-flow-row p-0 ">
                                
                                <h1 className={`prose prose-xl py-2 p-0 prose-zinc dark:prose-invert font-bold ${title({size:"xxsm",color:"pink"})}`}>{event.title}</h1>
                                {/* <p className={"prose text-xs dark:prose-invert"}>Join us for a Canada Day Party!</p> */}
                            </CardHeader>

                            <CardFooter className="flex flex-col items-start">
                                <Chip className="" variant={"faded"} color={"warning"} startContent={
                                        <CharityIcon height={"18"} width={"18"} fill={"currentColor"}/>
                                    }>                           
                                    <p className="text-warning text-nowrap">{event.category}</p>
                                </Chip>
                                <Chip className="" variant={"faded"} color={"warning"} startContent={
                                        <TicketIcon height={"18"} width={"18"} fill={"currentColor"}/>
                                    }>                           
                                    <p className=" prose text-sm text-warning text-nowrap">{event.ticketStartingPrice}</p>
                                </Chip>

                            </CardFooter>        
            
                        </div>
                        <div className={"col-start-9 col-span-4 flex items-center justify-around"}>
                            <Divider orientation="vertical" className=" bg-red h-5/6 slef w-[1px] bg-zinc-700"/>

                            <Image src={"/redbull.jpg"} alt="logo" width={100} height={80} className="rounded-[10px] z-0 h-[70px]"/>
                        </div>


    
                </CardBody>
            </Link>
            {/* <CardFooter>
                Card Footer
            </CardFooter> */}
        </Card>
    )
}