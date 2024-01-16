"use client"
import SideScrollComponent from "./SideScrollComponent";
import EventCard from "@/components/cards/prod/EventCard"
import {Event} from "@prisma/client"
import SideScrollRoot from "./SideScrollRoot";
import {button as Button} from "@/components/ui/button";
import {Button as NextButton} from "@nextui-org/react";
import {ArrowLeftCircle, ArrowRightCircle} from "lucide-react"
import {useRef, useState, useEffect} from 'react';
interface compProps {
    items?: React.ReactNode[],
    events: Event[],
}

export default function Comp({
    events,

}: compProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const handleClickRight = () => {
        // console.log("clicked")
        // console.table(scrollContainerRef.current)
        // console.log(scrollContainerRef)
        if (scrollContainerRef.current) {
            console.log("scrolling")
            scrollContainerRef.current.scrollTo({
                left: scrollContainerRef.current.scrollLeft + 400,
                behavior: 'smooth'
            });
        }
    };
    const handleClickLeft = () => {
        // console.log("clicked")
        // console.table(scrollContainerRef.current)
        // console.log(scrollContainerRef)
        if (scrollContainerRef.current) {
            console.log("scrolling")
            scrollContainerRef.current.scrollTo({
                left: scrollContainerRef.current.scrollLeft - 400,
                behavior: 'smooth'
            });
        }
    }

    return (
        <div className="container col-span-12 sm:col-span-10 overflow-hidden sm:col-start-2 px-4 sm:px-0">
        <div ref={scrollContainerRef} className={"SIDESCROLL CONTAINER snap-mandatory snap-x overflow-x-scroll flex space-x-8 flex-row"}>
            <div className="SPACER ELEMENT col-span-5 w-full flex-shrink-0"> </div>
              {
                events.map((event:Event,index:number) => {
                  return (
                    <SideScrollComponent key={index}  className="">
                      <EventCard key={index} event={event} />
                    </SideScrollComponent>
                  )
                })
              }
            <div className="SPACER ELEMENT col-span-5 w-full flex-shrink-0"> </div>
          </div>
          <div className="flex justify-between my-2">

            <Button 
            variant={'outline'}
                size='icon'
            onClick={handleClickLeft}><ArrowLeftCircle /></Button>
            <Button 
            variant={'outline'}
                size='icon'
            onClick={handleClickRight}><ArrowRightCircle/></Button>
          </div>
        </div>
    )
}