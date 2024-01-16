import EventTable from "@/app/dashboard/components/EventTable/EventTable"
import {api} from "@/trpc/server"
import {Event as EventType} from "@prisma/client"
import { title } from "@/components/Primatives/Typography";
// import AllEventsCarosel from "@/app/events/components/AllEventsCarosel"
import dynamic from "next/dynamic";
const AllEventsCarosel = dynamic(()=>import("@/app/events/components/AllEventsCarosel"));
const EventHero = dynamic(() => import("@/app/events/components/EventsHero"));
const AttendeeTable = dynamic(() => import("@/app/dashboard/components/AttendeeTable/TableWrapper"));
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
  <div className="h-full w-full flex flex-col my-8 items-center px-0 sm:px-4">
      {/* <h1 className={`text-primary ${title()}`}>Existing Events</h1>
      <Form /> */}
      <h1 className={`text-primary my-8 ${title()}`}>Existing Events</h1>
      
      <div className="TableContainer flex w-full justify-center">
        <EventTable events={eventInfo} />
      </div>

      <h1 className={`text-primary my-8 ${title()}`}>Tickets Sold</h1>
      <div className="TableContainer flex w-full justify-center">
        <AttendeeTable />
      </div>





  </div>
  )
};

export default app;