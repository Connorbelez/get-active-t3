// import Drawer from "@/components/drawers/ExampleDrawer";
// import { MapPin, MapPinned, Clock1, TicketIcon } from "lucide-react";
import {
  CalendarIcon
//   ChevronDownIcon,
//   ClockIcon,
} from "@radix-ui/react-icons";
import { formatDate, formatTime } from "@/lib/utils";
import { Clock } from "lucide-react";
// import Wrapper from "@/app/_components/Providers";
// import BlurredEdgeHero from "@/components/Hero/BluredEdgeHero";
// import { getServerAuthSession } from "@/server/auth";
// import MapAccordian from "@/components/MapAccordian/MapAccordian";
// import Accordian from "@/components/MapAccordian/MapAccordian";

interface compProps {
    heading: string,
    date: string | Date,
    time: string | Date,
}

export default function comp({heading,date,time}:  compProps) {
    // console.log("DATE:", date,time)

    const formattedDate = formatDate(date as string)
    const formattedTime = formatTime(time as string)
    

    // console.log("FORMATTED DATE:", formattedDate)
    // console.log("FORMATTED TIME:", formattedTime)

    return (
        <div className="DateNTime mb-16 flex w-full flex-col text-left font-bold">
            <div className="prose mb-4 dark:prose-invert">
                <h2 className="text-primary">Time and Date</h2>
            </div>
        <div className="flex w-full px-2 flex-row items-center">
            <i className="mr-1 h-[24px] w-[24px]">
                <CalendarIcon height={20} width={20} />
            </i>

            <p className=" font-mono text-sm">
                {" "}
                {/* Sat Jan 27 2023: 7:00pm - 10:00pm EST */}
                {formattedDate.month + " " + formattedDate.day + " " + formattedDate.year  }
            </p>
        </div>
        <div className="flex w-full px-2 mt-2 flex-row items-center">
            <i className="mr-1 h-[24px] w-[24px]">
                <Clock height={20} width={20} />
            </i>

            <p className=" font-mono text-sm">
                {" "}

                {formattedTime }
            </p>
        </div>
    </div>
    )
}