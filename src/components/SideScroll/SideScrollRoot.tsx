"use client"
import clsx from 'clsx'
import {useRef} from "react";
import SideScrollComponent from "./SideScrollComponent";
import VTicketCard, {HTicketCardProps} from "@/components/cards/prod/VTicketCard";
import {button as Button} from "@/components/ui/button";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react"
import {GPayIcon} from "@/components/icons/GPayIcon";
import { ApplePayIcon } from '../icons/ApplePayIcon';
// import {ScrollShadow} from "@nextui-org/react";
import { TicketType } from "@prisma/client";
import { Divider } from '@nextui-org/react';
interface compProps {
    widthStyling?: string,
    spacing?: string,

    className?: string,
    vertical?: boolean,
    ref?: any,
    tickets: TicketType[]
    setSelectedTicket: React.Dispatch<React.SetStateAction<number>>;
    setSelectedTicketData: React.Dispatch<HTicketCardProps['ticketData'] | undefined>;
    selectedTicketData: any;
    stateKey: number;

}
const defaultStyling = "snap-mandatory flex items-end "

export default function comp({spacing, stateKey, setSelectedTicket, setSelectedTicketData, selectedTicketData, className,vertical,tickets}: compProps) {
    const direction = vertical ? "flex-col" : "flex-row";
    const overFlow = vertical ? "overflow-y-scroll snap-y" : "overflow-x-scroll snap-x";
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const handleClickDown = () => {
        // console.log("clicked")
        // console.table(scrollContainerRef.current)
        // console.log(scrollContainerRef)
        if (scrollContainerRef.current) {
            console.log("scrolling")
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollTop + 400,
                behavior: 'smooth'
            });
        }
    };
    const handleClickUp = () => {
        // console.log("clicked")
        // console.table(scrollContainerRef.current)
        // console.log(scrollContainerRef)
        if (scrollContainerRef.current) {
            console.log("scrolling")
            scrollContainerRef.current.scrollTo({
                //scroll down
                top: scrollContainerRef.current.scrollTop - 400,
                behavior: 'smooth'
            });
        }
    };
    return (

            <div className='w-full px-4'>
                <div className={"flex flex-col w-full"}>

                    <div ref={scrollContainerRef} className={clsx(defaultStyling,direction,spacing,className,overFlow,)}>
                        {
                        tickets.map((ticket:TicketType,index:number) => {
                        return (
                            
                            <SideScrollComponent key={index}  className="grid grid-cols-12 w-full">
                                <div className={"col-start-1 col-span-6 prose-sm dark:prose-invert"}>
                                    <h1>{ticket.name}</h1>
                                    <p className='my-0 py-0 font-bold'>Payment Methods</p>
                                    <Divider className='my-0.5' />
                                    {/* <GPayIcon  width={60}/> */}
                                    {
                                        // ticket.payAtDoorTicket 
                                        ticket.payAtDoorTicket
                                        ? <p>This is a "pay at the door" ticket, you will pay with cash when your ticket is scanned </p> 
                                        : <div className='flex w-full justify-start space-x-2'>
                                            <GPayIcon  width={60}/>
                                            <Divider orientation='vertical' className='min-h-[30px]  my-1 h-full'/>
                                            <div className='SPACER w-[6px]'></div>
                                             <ApplePayIcon width={40}/>
                                        </div>
                                    }

                                    { ticket && ticket.ticketDescription && ticket.ticketDescription['description'] 
                                     ? <div >
                                        <p className='my-0 py-0 font-bold'>Ticket Description: </p>
                                        <Divider className='my-0.5' />
                                        <p className='my-0 py-0 '>{ticket.ticketDescription['description']}</p>
                                        </div>
                                    : null
                                    }
                                </div>
                                <div className="col-start-7 col-span-6 flex h-full justify-end">
                                    <VTicketCard key={index} stateKey={stateKey} _key={index} ticketData={ticket} setSelectedTicket={setSelectedTicket} setSelectedTicketData={setSelectedTicketData} selectedTicketData={selectedTicketData} />
                                </div>
                            </SideScrollComponent>
                        )
                        })
                    }
                    </div>
                    <div className='flex justify-between space-x-2 w-full '>
                        <Button 
                            variant={'outline'}
                            // size='icon'
                            className='w-full'
                            onClick={handleClickUp}
                        ><ArrowUpCircle /></Button>
                        <Button 
                            variant={'outline'}
                            className='w-full'
                            onClick={handleClickDown}
                        ><ArrowDownCircle /></Button>


                    </div>
                </div>
            </div>

    )
}