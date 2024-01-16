import AttendeeTable from "./AttendeeTable";
import { getEventsAndAttendees, getEventAndAttendeeType} from "@/app/dynamicEdgeFunctions"
interface compProps {
    
}

export type AttendeeTableData  = {
        _key: number;
        eventId: string;
        eventTitle: string;
        eventImage: string;
        email: string;
        name: string | null;
        ticketName: string;
        ticketPrice: number;
        status: string;
}[]

export default async function Comp({
    
}: compProps) {

    const attendeeTable:getEventAndAttendeeType = await getEventsAndAttendees();
    
    const data = attendeeTable.map((item,index) => { 
        return{
            _key: index,
            eventId: item.event.id,
            eventTitle: item.event.title,
            eventImage: item.event.heroImage,
            email: item.user.email,
            name: item.user.name,
            ticketName: item.ticket.name,
            ticketPrice: item.ticket.price,
            status: item.paid ? "paymentOwing" : "paid",
        }
    })

    return (

            <AttendeeTable data={data} />

    )
}