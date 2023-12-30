import {Card, CardBody} from "@nextui-org/react"
import Accordian from "@/components/TicketAccordian/TicketAccordian";
interface compProps {
    prop?:any
}

export default function comp({prop} : compProps) {

    return (
        <Card className="hidden w-full max-h-48  sticky top-20 md:flex items-center md:col-span-4 my-16 md:col-start-9">
        <CardBody>
            <Accordian/>
        </CardBody>
        </Card>
    )
}