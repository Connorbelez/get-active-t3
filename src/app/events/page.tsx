

import EventHero from "./components/EventsHero";
import HeroDivider1 from "./components/HeroDivider1";
import LogoGrid from "./components/LogoGrid";
import HeroDivider2 from "./components/HeroDivider2";
// import AllEventsCarosel from "./components/AllEventsCarosel";
import dynamic from "next/dynamic";
// const EventHero = dynamic(() => import("./components/EventsHero"));
// const HeroDivider1 = dynamic(() => import("./components/HeroDivider1"));
// const LogoGrid = dynamic(() => import("./components/LogoGrid"));
// const HeroDivider2 = dynamic(() => import("./components/HeroDivider2"));
const AllEventsCarosel = dynamic(() => import("./components/AllEventsCarosel"));
export default async function Home() {

  return (
    <>
      <section className="flex flex-col justify-center px-2 sm:px-6 py-5">
        <EventHero  />
      </section>
      
      <div className="flex flex-col justify-center w-screen ">

        <HeroDivider1 />

        <LogoGrid />

        <HeroDivider2  />
      </div>
      <div id={"eventC"}></div>
      <AllEventsCarosel />
      

    </>
  );
}
