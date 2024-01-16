import { FC } from 'react'
// import ProfileAvatar from "@/app/profile/[...profile]/components/ProfileAvatar";
// import {CardBody, Card, CardHeader, CardFooter} from "@nextui-org/card";
import ProfileCard from "@/app/profile/[...profile]/components/ProfileCard";
import EventTabs from "./components/EventTabs"
// import {
//     getSavedEventDetailsFromUserEmail,
//     getSavedEventsFromUserEmail,
//     getTicketsAndMatchingEventForUserByEmail,
//     getTicketsForUserByEmail, NewTicket
// } from "@/lib/planetscale";

// import {authOptions} from "@/config/authOptions";
import { redirect } from "next/navigation";
import { getServerAuthSession } from '@/server/auth';
import {api} from "@/trpc/server"
// interface pageProps {

// }

const App: FC = async () => {
    const session = await getServerAuthSession();
    const email = session?.user?.email
    console.log("EMAIL : ", email)


    if(!session || !session?.user?.email){
        //redirect user to login page
        redirect("/api/auth/signin")
    }
    

    const tickets = await api.member.getUsersFulfilledTicketsWithTicketType.query()
    const savedEvents = await api.member.getUsersSavedEvents.query()
    console.log("\n\n\n\n ================ TICKETS :================= \n", tickets[0])
    // console.log("\n\n\n\n ================ EVENTS :================= \n", savedEvents)
    const user = {
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
        role: session?.user?.role
        // tickets: tickets,
        // savedEvents: savedEvents
    }
    return (
        <div id={"profile container"} className={" w-full sm:grid flex-row sm:grid-rows-1 sm:grid-cols-3"}>

            <div className={"flex justify-items-center sm:justify-items-start   row-start-1 row-span-1 sm:row-span-3 sm:col-span-1 sm:col-start-1"}>

                <ProfileCard userName={user.name} email={user.email} image={user.image} role={user.role}/>

            </div>


            <div className={" rounded-2xl sm:row-start-1 sm:col-span-2 w-full sm:col-start-2 "}>
                <EventTabs tickets={tickets} savedEvents={savedEvents}></EventTabs>
            </div>
        </div>
    )
}

export default App