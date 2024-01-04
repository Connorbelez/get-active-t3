import EventCard from "@/components/cards/prod/EventCard";
import { Event } from "@prisma/client";
import EventsCarosel from "@/components/carosel/prod/EventsCarosel";
interface compProps {
  eventArray: Event[];
  headline: string;
}

export default function comp({ eventArray, headline }: compProps) {

  return (
    <div>
      <div className="z-10 col-span-12 col-start-1 row-start-1 mt-16 flex flex-col ">
        <h2 className="prose mx-auto mb-8 text-4xl font-extrabold dark:prose-invert md:text-5xl">
          <span className="bg-gradient-to-r from-[#c7c4fc] to-[#E114E5] bg-clip-text text-transparent">
            {headline}
          </span>
        </h2>
      </div>

      <div className="container col-span-12 overflow-hidden px-4 sm:col-span-10 sm:col-start-2 sm:px-0">
        <div className="col-span-12 flex flex-shrink-0 snap-x snap-mandatory flex-row space-x-8 overflow-x-scroll rounded-xl pb-8">
          <div className="SPACER ELEMENT col-span-5 w-full flex-shrink-0">
            {" "}
          </div>
          {eventArray.map((event: Event) => {
            return (
              <div className="col-span-5 flex-shrink-0 touch-pan-x snap-center">
                <EventCard event={event} />
              </div>
            );
          })}
        </div>
      </div>


      <div className="container sm:hidden col-span-10 col-start-2 px-4 sm:px-0">
          <EventsCarosel CardArray={eventArray} />
        </div>

    </div>
  );
}
