import Carosel from "./CaroselSample";
// import SideScrollRoot from "@/components/SideScroll/SideScrollRoot";
import Card from "@/components/cards/experimental/Card";
import {Event} from "@prisma/client"
import EventCard from "@/components/cards/prod/EventCard";
import EventsCarosel from "@/components/carosel/prod/EventsCarosel";
import EventsSideScroll from "./EventsSideScroll";
import SideScrollRoot from "@/components/SideScroll/SideScrollRoot";
// import SideScrollComponent from "@/components/SideScroll/SideScrollComponent";
// interface compProps {

// }

//ToDo: break each of thes into components and lazy load them with skeleton loaders

import {api} from "@/trpc/server"
export default async function comp() {
    const events:Event[] = await api.event.getEvents.query();
    console.log("Events");
    // console.table(events);

  

    return (
        <div className="my-16 grid grid-flow-row grid-cols-12 justify-items-center gap-y-5">
        
        <div className="z-10 col-span-12 col-start-1 row-start-1 mt-16 flex flex-col ">
          <h2 className="prose mx-auto mb-8 text-4xl font-extrabold dark:prose-invert md:text-5xl">
            <span className="bg-gradient-to-r from-[#c7c4fc] to-[#E114E5] bg-clip-text text-transparent">
              All Events
            </span>
          </h2>
        </div>

        <div className="container col-span-12 sm:col-span-10 overflow-hidden sm:col-start-2 px-4 sm:px-0">
          {/* <div className="snap-mandatory rounded-xl pb-8 col-span-12 snap-x overflow-x-scroll space-x-8 flex flex-row flex-shrink-0">
            <div className="SPACER ELEMENT col-span-5 w-full flex-shrink-0"> </div>
            {
              events.map((event:Event) => {
                return (
                  <div className="snap-center touch-pan-x flex-shrink-0 col-span-5">
                    <EventCard event={event} />
                  </div>
                )
              })
            }
          </div> */}
          <SideScrollRoot spacing="space-x-8" >
          <div className="SPACER ELEMENT col-span-5 w-full flex-shrink-0"> </div>
            {
                events.map((event:Event) => {
                  return (
                    <div className="snap-center touch-pan-x flex-shrink-0 col-span-5">
                      <EventCard event={event} />
                    </div>
                  )
                })
              }
          </SideScrollRoot>
        </div>

        <div className="z-10 col-span-12  col-start-1 mt-8 flex flex-col ">
          <h2 className="prose mx-auto text-4xl font-extrabold dark:prose-invert md:text-5xl">
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#E114E5] bg-clip-text text-transparent">
              Philanthropy Events
            </span>
          </h2>
        </div>
        
        <div className="container col-span-10 col-start-2 px-4 sm:px-0">
          <EventsCarosel CardArray={events} />
        </div>

        <div className="z-10 col-span-12 col-start-1 mt-8 flex flex-col ">
          <h2 className="prose mx-auto text-4xl font-extrabold dark:prose-invert md:text-5xl">
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#E114E5] bg-clip-text text-transparent">
              Open Events
            </span>
          </h2>
        </div>
        <div className="container col-span-10 col-start-2 px-4 sm:px-0">
          <EventsCarosel CardArray={events} />
        </div>
      </div>
    )
}