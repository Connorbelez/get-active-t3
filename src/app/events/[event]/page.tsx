import {
  Image,
  Card,
  CardBody,

  Divider,
} from "@nextui-org/react";
import dynamic from 'next/dynamic'


// import BlurredEdgeHero from "@/components/Hero/BluredEdgeHero";


export default function comp() {

  //ToDo Add loading page shells for dynamic imports!

  const EventHeading = dynamic(() => import('./components/EventHeadingSection'));
  const EventAboutSection = dynamic(() => import('./components/EventAbout'));
  const EventLocationSection = dynamic(() => import('./components/EventLocationSection'));
  const EventDateSecion = dynamic(() => import('./components/EventDateSection'));
  const EventCreatorCard = dynamic(() => import('./components/EventCreatorCard'));
  const Drawer = dynamic(() => import('@/components/drawers/ExampleDrawer'));
  const Accordian = dynamic(() => import('@/components/MapAccordian/MapAccordian'));
  const TempCard = dynamic(() => import('./components/TempCard'));
  const BlurredEdgeHero = dynamic(() => import('@/components/Hero/BluredEdgeHero'));
  const imageUrl = "/testHero.jpeg";

  const event_creator = {
    image:
      "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    username: "CreatorUsername",
  };
  const date = "Sat Jan 27 2023"
  return (
    <div className="EventWrapper bg-background w-full flex flex-col items-center ">
              <link
        href="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css"
        rel="stylesheet"
      />
        <div className="w-full max-w-6xl">
            <BlurredEdgeHero
            src={imageUrl}
            alt={"test"}
            maxH={450}
            maxW={"6xl"}
            />
        </div>

        <div className="Event Detail Wrapper w-full max-w-6xl px-6 md:px-4 lg:px-1">

            <section
            id="Event Details Wrapper"
            className={
                "my-12 flex flex-col md:gap-4 leading-none md:grid md:grid-cols-12"
            }
            >
                <div className="mf:col-start-1 md:col-span-8 ">
                    <div className="IconBar prose flex w-full flex-row text-left font-bold dark:prose-invert ">
                        <p>{date}</p>
                    </div>

                    <EventHeading heading='"AKIMBO MODE" boxing gala' content="Come encourage the region's athletes during high-intensity fights on January 27!" />
                    <EventCreatorCard creatorImageSrc={event_creator.image} creatorUsername={event_creator.username} />
                    <EventDateSecion heading="Time and Date" content={"Sat Jan 27 2023: 7:00pm - 10:00pm EST"} />
                    <EventLocationSection heading="Place" address="480 Rue des Pins" city="Gatineau" province="QC" postalCode="J8L 2L3" />
                    <EventAboutSection heading="About Event"  length="4" ticketInfo="Pay at Door or Digital Ticket" />
                </div>


                <TempCard/>
                {/* <Card className="hidden w-full max-h-48  sticky top-20 md:flex items-center md:col-span-4 my-16 md:col-start-9">
                    <CardBody>
                        <Accordian title="TICKET SELECTION"/>
                    </CardBody>
                </Card> */}

                <div className="w-full my-12 md:col-span-8">
                    <Divider className="" />
                </div>

                <article className="prose prose-sm md:col-span-8 dark:prose-invert">
                    <h1>"AKIMBO MODE" boxing gala</h1>
                    <h4>Come encourage the region's athletes during high-intensity fights on January 27!</h4>
                    <p> Event description</p>
                </article>

            </section>
        </div>
        <div className="flex justify-center w-full ">
            <Drawer />
        </div>
        
    </div>
  );
}
