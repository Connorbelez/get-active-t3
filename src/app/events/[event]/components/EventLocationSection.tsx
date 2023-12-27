import { MapPin, MapPinned, Clock1, TicketIcon } from "lucide-react";
import MapAccordian from "@/components/MapAccordian/MapAccordian";
interface compProps {
    heading: string,
    address?: string,
    city: string,
    province: string,
    postalCode?: string,
}

export default function comp({heading,address,city,province,postalCode}: compProps) {

    return (
        <div className="Place mb-16 flex w-full flex-col text-left font-bold">
        <div className="prose mb-4 dark:prose-invert">
            <h2>Place</h2>
        </div>
        <div className="flex w-full flex-col items-center">
            <div className="flex w-full flex-row items-center px-2">
                <i className="mr-1 h-[24px] w-[24px] self-start">
                <MapPinned height={20} width={20} />
                </i>
                <div className="prose w-full max-w-6xl tracking-tighter antialiased dark:prose-invert ">
                <p className=" mb-2 font-mono text-sm font-bold">
                    {address}
                </p>
                <p className=" my-2 font-mono text-sm text-zinc-900/40 dark:text-zinc-200/40">
                    {address} {city}, {province} {postalCode}
                </p>
                </div>
            </div>
        </div>
        <div className="According Wrapper mt-2 px-4 w-full max-w-11/12 flex justify-center">
            <MapAccordian />
        </div>
    </div>

    )
}