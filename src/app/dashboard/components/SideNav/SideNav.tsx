"use client"
import { NavbarWrapper } from "@/app/dashboard/components/navbar/navbar";

import {Home, CopyPlus, CalendarSearchIcon, Users, List} from "lucide-react";
import { Listbox, ListboxItem, ListboxSection } from "@/components/ClientNextUI";
interface compProps {

}

export default function comp({ }: compProps) {

    return (
        <aside className={"h-screen border-r-1 border-zinc-700 w-[12%] fixed top-16 py-8 flex flex-col space-y-8"}>
            <Listbox 
            color="primary"
            
            variant="faded"
            className="w-full h-full">
                <ListboxItem
                 startContent={<Home size={34} />}
                 description="Home base"
                 key={"home"} className="flex ">
                    Home
                    
                </ListboxItem>
            </Listbox>
        </aside>
    )
}