export const runtime = "edge";

import {  Divider } from "@/components/ClientNextUI";
import dynamic from "next/dynamic";

//ToDo: find a way of rendering html without dangerouslySetInnerHTML, or find a way of sanitizing html
// import parse from "html-react-parser";
import { formatDate } from "@/lib/utils";

import { getEvent } from "@/app/edgefunctions"


import AttendingGroup from "@/components/Hero/AttendingGroup";


import EventHeading from "@/components/EventHeadingSection";
const EventAboutSection = dynamic(() => import("@/components/EventAbout"));
const EventLocationSection = dynamic(
  () => import("@/components/EventLocationSection"),
);
const EventDateSecion = dynamic(() => import("@/components/EventDateSection"));
const EventCreatorCard = dynamic(() => import("@/components/EventCreatorCard"));
const Drawer = dynamic(() => import("@/components/drawers/ExampleDrawer"));

import BlurredEdgeHero from "@/components/Hero/BluredEdgeHero";

const TicketAccordian = dynamic(() => import("@/components/TicketAccordian/TicketAccordian"));


export default async function (

  
  { params }: { params: { event: string }}

) {


  const event = await getEvent(params.event);
  //ToDo: add a nice 404 page
  if(!event){
    return <div>Event Not Found</div>
  }
  const tickets = event.ticketTypes;

  console.log("TICEKTS FROM PAGE\n")
  console.log(tickets)


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

      <div className="Event Detail Wrapper w-full px-4 md:px-0 max-w-7xl">
        <section
          id="Event Details Wrapper"
          className={
            "my-12 flex flex-col leading-none lg:grid lg:grid-cols-12 lg:gap-4"
          }
        >


          <div className="ACCORIDIAN WRAPPER sticky top-[100px] hidden  w-full max-h-[82px] lg:col-start-8 lg:col-span-5 lg:flex">
            <TicketAccordian eventHeroImage={event.heroImage} eventName={event.title} eventLocation={event.address} title="SELECT YOUR TICKET" tickets={tickets} />
          </div>

          <div className="lg:col-span-7 row-start-1 lg:col-start-1 ">
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

          <article className="prose w-full text-left tracking-tighter antialiased dark:prose-invert lg:col-span-7">
            <h2 className="text-primary">Event Description</h2>
            <div className="w-full   lg:col-span-7 ">
              <Divider className=" mt-4 mb-8" />
            </div>
            <div className="w-full prose dark:prose-invert antialiased ">

              {/* {parse(event.eventDescription)}  */}
              
              <div dangerouslySetInnerHTML={{__html: event.eventDescription}}></div>
            </div>
          </article>
        </section>
      </div>
      {/* <button onClick={void api.ticket.sendTicket.mutate({
        ticketId:"ckq8xv5x80000m3i8x4y2x8c5",
        recipientEmail:"connor.belez@gmail.com"
      })}>
        SEND EMAIL
      </button> */}
      
      <div className="flex w-full justify-center lg:hidden ">
        <Drawer eventHeroImage={event.heroImage} eventName={event.title} eventLocation={event.address} tickets={tickets} />
      </div>
    </div>
  );
}
