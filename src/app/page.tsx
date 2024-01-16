export const runtime = 'edge'
// import HTMLRender from "@/components/HTMLRender";
import dynamic from "next/dynamic";
// const HTMLRender = dynamic(() => import("@/components/HTMLRender"));
import {  Divider } from "@/components/ClientNextUI";
// import dynamic from "next/dynamic";
// import parse from "html-react-parser";

import { formatDate } from "@/lib/utils";
import { getEvent } from "@/app/edgefunctions"
import AttendingGroup from "@/components/Hero/AttendingGroup";
import EventHeading from "@/components/EventHeadingSection";
import EventAboutSection from "@/components/EventAbout";
import EventLocationSection from "@/components/EventLocationSection";
import EventDateSecion from "@/components/EventDateSection";
import EventCreatorCard from "@/components/EventCreatorCard";
import Drawer from "@/components/drawers/ExampleDrawer";
import TicketAccordian from "@/components/TicketAccordian/TicketAccordian";
import { redirect } from 'next/navigation'
import BlurredEdgeHero from "@/components/Hero/BluredEdgeHero";
import { getFeaturedEvent } from "./dynamicEdgeFunctions";

export default async function (
  


) {

  
  const event = await getFeaturedEvent();
  if(event === null){
    redirect("/events")
  }
  const tickets = event.ticketTypes;

  // console.log("TICEKTS FROM PAGE\n")
  // console.log(tickets)


  const event_creator = {
    image:
      "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    username: "CreatorUsername",
  };

  
  if (typeof event.eventDescription  !== "string") {
    event.eventDescription = "";
  }
  const fdate = formatDate(event.startDate);

  const date = `${fdate.month} ${fdate.day} ${fdate.year}`;


  return (
    <div className="EventWrapper flex w-full  flex-col items-center bg-background ">
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css"
        rel="stylesheet"
      />
      <div className="w-full overflow-hidden">
        <BlurredEdgeHero
          src={event.heroImage}
          alt={"test"}
          maxH={500}
          maxW={"6xl"}
        />
      </div>
      <AttendingGroup maxDisplay={5} eventid={event.id} />

      <div className="Event Detail Wrapper w-full px-4 ">
        <section
          id="Event Details Wrapper"
          className={
            "my-12 flex flex-col leading-none sm:grid sm:grid-cols-12 sm:gap-4"
          }
        >


          <div className="ACCORIDIAN WRAPPER sticky top-[100px]  w-full max-h-[82px] sm:col-start-8 sm:col-span-5 sm:flex">
            <TicketAccordian eventHeroImage={event.heroImage} eventName={event.title} eventLocation={event.address} title="SELECT YOUR TICKET" tickets={tickets} />
          </div>

          <div className="sm:col-span-7 row-start-1 sm:col-start-1 ">
            <div className="IconBar text-left prose flex w-full flex-row font-bold dark:prose-invert ">
              <p>{date}</p>
            </div>
            
            <EventHeading
              heading={event.title}
              content={event.headline as string}
              featured
            />
            <EventCreatorCard
              creatorImageSrc={event_creator.image}
              creatorUsername={event.createdByEmail}
            />
            <EventDateSecion
              heading="Time and Date"
              date={event.startDate}
              time={event.startTime}
            />
            <EventLocationSection
              heading="Place"
              address={event.address}
              city={event.city as string}
              province={event.province as string}
              postalCode={event.postalCode as string}
              lat={event.lat as number}
              lng={event.lng as number}
              location={event.location}
            />
            <EventAboutSection
              heading="About Event"
              length={event.length.toString()}
              ticketInfo="Digital Ticket"
            />
          </div>



          {/* <div className="my-12 w-full   sm:col-span-7 ">
            <Divider className="" />
          </div> */}

          <article className="prose w-full text-left tracking-tighter antialiased dark:prose-invert sm:col-span-7">
            <h2 className="text-primary">Event Description</h2>
            <div className="w-full   sm:col-span-7 ">
              <Divider className=" mt-4 mb-8" />
            </div>
            <div className="w-full prose dark:prose-invert antialiased ">
              {/* {parse(event.eventDescription)}  */}
              <div dangerouslySetInnerHTML={{__html: event.eventDescription}}></div>
            </div> 
            {/* <HTMLRender content={event.eventDescription} /> */}
          </article>
        </section>
      </div>

      
      <div className="flex w-full justify-center md:hidden ">
        <Drawer eventHeroImage={event.heroImage} eventName={event.title} eventLocation={event.address} tickets={tickets} />
      </div>
    </div>
  );
}
