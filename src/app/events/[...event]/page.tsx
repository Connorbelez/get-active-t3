import { Button, Divider } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { TicketType } from "@prisma/client";
// import { useRouter } from "next/router";
import parse from "html-react-parser";
import { formatDate } from "@/lib/utils";
import { api } from "@/trpc/server";
// import TicketAccordian from "@/components/TicketAccordian/TicketAccordian";
interface EventDetails {
  id: string;
  title: string;
  headline: string;
  category: string;
  heroImage: string;
  location: string;
  startDate: string;
  startTime: string;
  length: string;
  ticketStartingPrice: string;
  address: string;
  ageRestriction: string;
  drinksIncluded: string;
  foodIncluded: string;
  description: string;
  Org: string;
  creator: string;
  creatorId: string;
}

const EventHeading = dynamic(() => import("./components/EventHeadingSection"));
const EventAboutSection = dynamic(() => import("./components/EventAbout"));
const EventLocationSection = dynamic(
  () => import("./components/EventLocationSection"),
);
const EventDateSecion = dynamic(() => import("./components/EventDateSection"));
const EventCreatorCard = dynamic(() => import("./components/EventCreatorCard"));
const Drawer = dynamic(() => import("@/components/drawers/ExampleDrawer"));
const Accordian = dynamic(
  () => import("@/components/MapAccordian/MapAccordian"),
);
// const TempCard = dynamic(() => import("./components/TempCard"));
const BlurredEdgeHero = dynamic(
  () => import("@/components/Hero/BluredEdgeHero"),
);

const TicketAccordian = dynamic(() => import("@/components/TicketAccordian/TicketAccordian"));


// const imageUrl = "/testHero.jpeg";

// import { Event } from "@prisma/client";
export default async function (
  {
  searchParams,
}: {
  searchParams: EventDetails;
}
) {


  const tickets = await api.event.getTicketsByEvent.query({
    eventId: searchParams.id,
  });
  console.log("TICEKTS FROM PAGE\n")
  console.log(tickets)


  const event_creator = {
    image:
      "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    username: "CreatorUsername",
  };

  // const tickets:TicketType[] = [
  //   {
  //     id: "1",
  //     name: "VIP",
  //     price: 20,
  //     drinksIncluded: true,
  //     foodIncluded: true,
  //     paymentTypes: "cash,credit",
  //     paymentOweing:false,
  //     logo:"",
  //     ticketDescription:{description:""},
  //     eventId:"clqsspsme0002kjip8ewoh0b9",
  //   },
  //   {
  //     id: "1",
  //     name: "VIP",
  //     price: 20,
  //     drinksIncluded: true,
  //     foodIncluded: true,
  //     paymentTypes: "cash,credit",
  //     paymentOweing:false,
  //     logo:"",
  //     ticketDescription:{description:""},
  //     eventId:"clqsspsme0002kjip8ewoh0b9",
  //   },
  //   {
  //     id: "1",
  //     name: "VIP",
  //     price: 20,
  //     drinksIncluded: true,
  //     foodIncluded: true,
  //     paymentTypes: "cash,credit",
  //     paymentOweing:false,
  //     logo:"",
  //     ticketDescription:{description:""},
  //     eventId:"clqsspsme0002kjip8ewoh0b9",
  //   },
  // ]
  if (typeof searchParams.description !== "string") {
    searchParams.description = "";
  }
  const fdate = formatDate(searchParams.startDate);

  const date = `${fdate.month} ${fdate.day} ${fdate.year}`;


  return (
    <div className="EventWrapper flex w-full  flex-col items-center bg-background ">
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css"
        rel="stylesheet"
      />
      <div className="w-full overflow-hidden">
        <BlurredEdgeHero
          src={searchParams.heroImage}
          alt={"test"}
          maxH={450}
          maxW={"6xl"}
        />
      </div>

      <div className="Event Detail Wrapper w-full px-4 sm:px-0 ">
        <section
          id="Event Details Wrapper"
          className={
            "my-12 flex flex-col leading-none sm:grid sm:grid-cols-12 sm:gap-4"
          }
        >


          <div className="ACCORIDIAN WRAPPER sticky top-[100px]  w-full max-h-[150px] sm:col-start-8 sm:col-span-5 sm:flex">
            <TicketAccordian title="SELECT YOUR TICKET" tickets={tickets} />
          </div>

          <div className="sm:col-span-7 row-start-1 sm:col-start-1 ">
            <div className="IconBar text-left prose flex w-full flex-row font-bold dark:prose-invert ">
              <p>{date}</p>
            </div>

            <EventHeading
              heading={searchParams.title}
              content={searchParams.headline}
            />
            <EventCreatorCard
              creatorImageSrc={event_creator.image}
              creatorUsername={searchParams.creator}
            />
            <EventDateSecion
              heading="Time and Date"
              date={searchParams.startDate}
              time={searchParams.startTime}
            />
            <EventLocationSection
              heading="Place"
              address={searchParams.address}
              city={searchParams.location}
              province={""}
              postalCode={""}
            />
            <EventAboutSection
              heading="About Event"
              length={searchParams.length}
              ticketInfo="Pay at Door or Digital Ticket"
            />
          </div>



          <div className="my-12 w-full   sm:col-span-7 ">
            <Divider className="" />
          </div>

          <article className="prose prose-sm dark:prose-invert sm:col-span-7">
            {parse(searchParams.description)}
          </article>
        </section>
      </div>
      {/* <button onClick={void api.ticket.sendTicket.mutate({
        ticketId:"ckq8xv5x80000m3i8x4y2x8c5",
        recipientEmail:"connor.belez@gmail.com"
      })}>
        SEND EMAIL
      </button> */}
      
      <div className="flex w-full justify-center ">
        <Drawer tickets={tickets} />
      </div>
    </div>
  );
}