// import Carosel from "./CaroselSample";
// // import SideScrollRoot from "@/components/SideScroll/SideScrollRoot";
// import Card from "@/components/cards/experimental/Card";
import {Event} from "@prisma/client"
// import EventCard from "@/components/cards/prod/EventCard";
// import EventsCarosel from "@/components/carosel/prod/EventsCarosel";
// import EventsSideScroll from "./EventsSideScroll";
// import SideScrollRoot from "@/components/SideScroll/SideScrollRoot";
// import SideScrollComponent from "@/components/SideScroll/SideScrollComponent";
import SideScrollButtons from "@/components/SideScroll/SideScrollButtons";
// import {api} from "@/trpc/server"
import {getPublicEventsMinimal} from "@/app/dynamicEdgeFunctions"
interface Props {
  isPreview?:boolean
}

export default async function comp({isPreview}:Props) {
    const events = await getPublicEventsMinimal();


    return (
        <div className="my-16 grid grid-flow-row grid-cols-12 justify-items-center gap-y-5">
        
        <div className="z-10 col-span-12 col-start-1 row-start-1 mt-16 flex flex-col ">
          <h2 className="prose mx-auto mb-8 text-4xl font-extrabold dark:prose-invert md:text-5xl">
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#E114E5] bg-clip-text text-transparent">
              All Events
            </span>
          </h2>
        </div>

        <div className="container col-span-12 sm:col-span-10 overflow-hidden sm:col-start-2 px-4 sm:px-0">
          <SideScrollButtons events={events} />
        </div>

        <div className="z-10 col-span-12  col-start-1 mt-8 flex flex-col ">
          <h2 className="prose mx-auto text-4xl font-extrabold dark:prose-invert md:text-5xl">
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#E114E5] bg-clip-text text-transparent">
              Philanthropy Events
            </span>
          </h2>
        </div>
        <div className="container col-span-12 sm:col-span-10 overflow-hidden sm:col-start-2 px-4 sm:px-0">
          <SideScrollButtons events={events} />
        </div>

        <div className="z-10 col-span-12 col-start-1 mt-8 flex flex-col ">
          <h2 className="prose mx-auto text-4xl font-extrabold dark:prose-invert md:text-5xl">
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#E114E5] bg-clip-text text-transparent">
              Open Events
            </span>
          </h2>
        </div>

          <SideScrollButtons events={events} />

      </div>
    )
}