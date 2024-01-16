import EventTable from "@/app/dashboard/components/EventTable/EventTable"
import {api} from "@/trpc/server"
import {Event as EventType} from "@prisma/client"
import { title } from "@/components/Primatives/Typography";
import { EditDocumentIcon } from "@/components/icons/Edit";

// import AllEventsCarosel from "@/app/events/components/AllEventsCarosel"
import dynamic from "next/dynamic";
const AllEventsCarosel = dynamic(()=>import("@/app/events/components/AllEventsCarosel"));
const EventHero = dynamic(() => import("@/app/events/components/EventsHero"));
import { CalendarSearch, CopyPlus, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {Card, CardBody, CardHeader,CardFooter, Link} from "@/components/ClientNextUI"

export interface EventTableData {
  id: number;
  eventId: string;
  category: string;
  title: string;
  status: string;
  heroImage: string;
  numberAttending: number;
  startDate: string;
  startTime: string;
  headline: string;
}
const app = async () => {
  const events: EventType[] = await api.event.getEvents.query();

  

  const eventInfo:EventTableData[] = events.map((event,index) => {
    return {
      id: index,
      eventId: event.id,
      headline: event.headline || "",
      category: event.category || "none",
      title: event.title,
      status: event.active ? "active" : "paused",
      heroImage: event.heroImage,
      numberAttending: 50,
      startDate: event.startDate,
      startTime: event.startTime,
    };
  })
    

  return(
    <div className="w-full flex flex-col p-16 space-y-16 items-center">

      <Card 

      className="prose prose-xl dark:prose-invert">
        <CardHeader>

         <h1 className="font-bold text-primary">Dashboard landing page under construction.</h1> 
        </CardHeader>
        <CardBody>
          <h2>
            Event Creation, Existing Event Management/editing functional and can be accessed
          </h2>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 prose prose-xl dark:prose-invert w-full  gap-10 ">
        <Card
                as={Link}
                href={"/dashboard/newevent"}

        className="w-full">
          <CardBody>

            <EditDocumentIcon size={52} />
          </CardBody>
          <CardFooter className="flex justify-center">
            <h2>Create New Event</h2>
          </CardFooter>
        </Card>

        <Card 
          as={Link}
          href={"/dashboard/manageevents"}
        className="w-full ">
          <CardBody>

            <CalendarSearch size={48} />
          </CardBody>
          <CardFooter className="flex justify-center">
            <h2>Manage Existing Events</h2>
          </CardFooter>

        </Card>


      </div>
    </div>
  )
};

export default app;