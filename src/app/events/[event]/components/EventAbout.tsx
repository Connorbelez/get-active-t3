import {
    Image,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Button,
    Divider,
  } from "@nextui-org/react";
  import { MapPin, MapPinned, Clock1, TicketIcon } from "lucide-react";

interface compProps {
    heading: string,
    length: string,
    start?: Date | string,
    end?: Date | string,
    ticketInfo: string,
}
//ToDo: utalize start and end times, and format times with functions add handlng for when they are passed in ie overriding length
export default function comp({heading,length,start,end,ticketInfo}:  compProps) {

    return (
        <div
        className={"About Event flex w-full max-w-6xl flex-col space-y-4"}
    >
        <div className="prose w-full text-left tracking-tighter antialiased dark:prose-invert  ">
            <h2>{heading}</h2>
        </div>
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between">

        <div className="flex items-center prose dark:prose-invert space-x-4">
                <Card className={"h-[48px] w-[48px] flex-shrink-0"}>
                    <CardBody>
                        <Clock1 size={24} />
                    </CardBody>
                </Card>
                <h2 className="my-0 py-0" >{length} Hours</h2>

            </div>
            
            <div className="flex items-center prose dark:prose-invert space-x-4 lg:pr-8">
                <Card className={"h-[48px] w-[48px] flex-shrink-0"}>
                    <CardBody>
                        <TicketIcon size={24} />
                    </CardBody>
                </Card>
                <h2 className="my-0 py-0" >{ticketInfo}</h2>
            </div>
        </div>
    </div>
    )
}