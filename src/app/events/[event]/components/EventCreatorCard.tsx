import {
    Image,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Button,
    Divider,
  } from "@nextui-org/react";
  
//   import Drawer from "@/components/drawers/ExampleDrawer";
//   import { MapPin, MapPinned, Clock1, TicketIcon } from "lucide-react";
//   import {
//     CalendarIcon,
//     ChevronDownIcon,
//     ClockIcon,
//   } from "@radix-ui/react-icons";
//   import Wrapper from "@/app/_components/Providers";
//   import BlurredEdgeHero from "@/components/Hero/BluredEdgeHero";
//   import { getServerAuthSession } from "@/server/auth";
//   import MapAccordian from "@/components/MapAccordian/MapAccordian";
//   import Accordian from "@/components/MapAccordian/MapAccordian";
interface compProps {
    creatorImageSrc: string,
    creatorUsername: string,
    creatorEamil?: string,
    creatorId?: string,
}

export default function comp({creatorImageSrc,creatorUsername,creatorEamil,creatorId}: compProps) {

    return (
        <div className="flex justify-center">

        <Card
            className={"mb-12 grid w-11/12 grid-flow-col bg-zinc-200 p-2 outline-1 outline-zinc-200 dark:bg-zinc-800 dark:outline-zinc-800"}
        >
            <div className={"flex flex-row items-center align-middle"}>
            <Image
                src={creatorImageSrc}
                alt={"Creator avatar"}
                width={50}
                height={50}
                className={
                    "justify-self-left col-start-1 ml-2 rounded-xl shadow-lg shadow-violet-700/50"
                }
                />
            <p className={"justify-self-left ml-4"}>
                {creatorUsername}
            </p>
            </div>
            <div className={"flex w-full items-center justify-end"}>
            <Button className={"mr-4 w-1/2 bg-primary"}>
                <p className={"text-zinc-200 opacity-100 dark:text-zinc-800"}>
                    Follow
                </p>
            </Button>
            </div>
        </Card>
    </div>
    )
}