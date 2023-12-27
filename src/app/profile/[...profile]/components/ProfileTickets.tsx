import { FC } from 'react'
// import TicketCard from "@/app/events/[...event]/components/TicketCard";
import {Card} from "@nextui-org/react";
import {NewTicket} from "@/lib/planetscale";
import ProfileTicket from "./ProfileTicket"
interface pageProps {
    ticket: any
}

const App: FC<pageProps> = ({ticket}) => {

    // console.log("TICKETS CONSOLE: : ", ticket);
    return (
        <Card className={"grid grid-col-2"}>
            <div className={"col-start-1"}>
                <p>{ticket.ticket_holder_name}</p>
                <p>{ticket.ticket_type}</p>
                <p>${ticket.ticket_price}</p>
                <p>{ticket.payment_method}</p>
                <p>{ticket.event_title}</p>
                <p>{ticket.event_date}</p>
            </div>
            <div className={"col-start-2"}>
                <ProfileTicket ticketData={ticket} />
            </div>

        </Card>
    )
}

export default App