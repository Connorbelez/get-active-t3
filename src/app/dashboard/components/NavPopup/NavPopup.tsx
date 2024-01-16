"use client"
import React from "react";
import {Popover, PopoverTrigger, PopoverContent, Button, Input, Listbox, ListboxItem, Link, ListboxSection} from "@/components/ClientNextUI";
import {Compass,Home, CalendarSearch, Users,CalendarPlus, CopyPlus} from "lucide-react";
import { EditIcon } from "../EventTable/EventTableIcons";
interface NavPopupProps {
    children?: React.ReactNode;
    title?: string;
    width?: string;
    maxWidth?: string;
    height?: string;

}
export default function App() {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
  return (
    <Popover 
        triggerType="grid"
        placement="top" 
        arrowBoundaryOffset={20}
        showArrow offset={10}
        backdrop="blur"
        className="bg-transparent border-transparent border-none  "
        >
      <PopoverTrigger
        
      >

        <Button size="lg" isIconOnly color="primary"><Compass size={40}/></Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px]  shadow-none bg-transparent dark:border-none">
        {(titleProps) => (
            <div className="w-full max-w-[200px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                <Listbox classNames={
                    {
                        list:"prose dark:prose-invert space-y-2 leading-1 text-right"
                    }
                } className="" variant="faded" aria-label="Nav button">
                    <ListboxItem as={Link} href="/dashboard" key={0} className="prose text-slate-200" variant="faded" endContent={<Home stroke="#006FEE" />}>
                        <p className="leading-1 my-1 ">Home</p>
                    </ListboxItem>
                    <ListboxItem as={Link} href="/dashboard/newevent"  className="prose text-slate-200" key={1} color="secondary" variant="faded" endContent={<CopyPlus stroke="#006FEE" />}>
                        <p className=" leading-1  my-1  ">New Event</p>
                    </ListboxItem>
                    <ListboxItem key={3} as={Link} href="/dashboard/manageevents"  className="prose text-slate-200"  color="warning" variant='faded' endContent={<CalendarSearch stroke="#f5a524" />}>
                        <p className=" leading-1   my-1  ">Manage Events</p>
                    </ListboxItem>
                    <ListboxItem key={4} as={Link} href="/dashboard/manageusers"  className="prose text-slate-200" color="primary" variant="faded" endContent={<Users stroke="#BEF264" />}>
                        <p className="leading-1  my-1 ">Manage Users</p>
                    </ListboxItem>
                </Listbox>
            </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
