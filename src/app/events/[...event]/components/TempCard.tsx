import {Card, CardBody, CardHeader,Chip} from "@nextui-org/react"
import Accordian from "@/components/TicketAccordian/TicketAccordian";
import Image from "next/image";

export interface HTicketCardProps {
    chips?: string[];
    title?: string;
    price?: string;
}

export type TicketCard = React.FC<HTicketCardProps>;


export default function TicketCard({chips, title, price} : HTicketCardProps) {

    return (
        <Card className="hidden w-full border-none p-0 h-[100px] sticky top-20 sm:grid sm:col-span-4 my-16 sm:col-start-9">
            <Image src={"/TicketBackground.png"} className="absolute z-0" alt={"test"} layout="fill" />
            <CardBody className={"sm:grid sm:grid-cols-12 w-full p-0"}>
                <div className="prose-sm dark:prose-invert text-right col-start-2 col-span-8 container relative flex flex-col justify-around items-center pr-2">
                    <h1 className=" -my-1 text-2xl text-right prose dark:prose-invert">VIP Ticket</h1>
                    <div className="flex space-x-2"> 
                        <Chip size="sm" color="warning" variant="faded" className="flex ">
                            <p className=" text-tiny ">D Included</p>
                        </Chip>
                        <Chip size="sm" color="warning" variant="faded" >
                            <p className="text-tiny">F Included</p>
                        </Chip>
                    </div>
                </div>
                <div className="prose-sm dark:prose-invert text-right col-start-10 col-span-3 flex flex-col flex-flow-row justify-center items-end pr-2">
                    <h1 className=" -my-1 text-2xl lg:text-3xl prose dark:prose-invert text-right">$18</h1>
                    <h1 className="  ml-2 -my-1 text-base prose dark:prose-invert text-right"> .99</h1>
                </div>
            </CardBody>
        </Card>
    )
}