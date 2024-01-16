import HeadingButtonSection from "./HeadingButtonSection";

// import { button as Button } from "@/../components/ui/button";
// import { getAllEvents } from '@/lib/actions/event.actions';
// import { SearchParamProps } from '@/types';
// import Image from "next/image";
// import NavLink from "@/../components/ui/NavLink";
import Link from "next/link";
// import { title as heading, subtitle } from "@/components/Primatives/Typography";
// import Carosel from "../components/CaroselSample";
// import { title } from "process";
// import Card from "@/components/cards/experimental/Card";
import CardSponser from "@/components/cards/experimental/CardSponser";
import { Divider, Button } from "@nextui-org/react";
import {
  DoubleArrowRightIcon,
  DoubleArrowDownIcon,
} from "@radix-ui/react-icons";
// import EventHero from "../components/EventsHero";
import {api} from "@/trpc/server"


export default async function App() {
  const featuredEvent = await api.event.getFeaturedEvent.query();
  
  console.log("FEATURED EVENT")
  console.log(featuredEvent);

  return (
    <div className="wrapper items-between justify-items-between grid grid-cols-1 gap-5 lg:grid-cols-12 2xl:gap-0">
      <div className="mx-auto max-w-4xl space-y-5 text-center sm:text-left">
        <h1 className="HEADING text-sm font-medium text-indigo-600">
          Your Events, Your Way
        </h1>
        <h2 className="SUBHEADING prose mx-auto text-4xl font-extrabold dark:prose-invert md:text-5xl">
          Turn Key Event Management
          <br /> With{" "}
          <span className="bg-gradient-to-r from-[#4F46E5] to-[#E114E5] bg-clip-text text-transparent">
            Get Active
          </span>
        </h2>
        <p className="DESCRIPTION mx-auto hidden max-w-2xl">
          Sed ut perspiciatis unde omnis iste natus voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae.
        </p>
        <div></div>
        <HeadingButtonSection  />
      </div>
      
      {/* ToDo: PROVIDE SOME SORT OF FALLBACK */}
      {
        featuredEvent ? 

        <div className="FEATURED CARD flex flex-col items-center lg:col-span-6 lg:col-start-7 lg:items-end">
          {/* @ts-ignore */}
          <CardSponser event={featuredEvent} />
        </div>
        : null
      }
      <Button
          size="lg"
          color={"primary"}
          as={Link}
          href={"#eventC"}
          endContent={<DoubleArrowDownIcon />}
          className="button w-full lg:hidden lg:w-fit"
        >
          See All Events
        </Button>
      {/* <Button
        size="lg"
        color={"primary"}
        as={Link}
        href={"/events/featured"}
        endContent={<DoubleArrowRightIcon />}
        className="button w-full lg:hidden"
      >
        Go To Featured
      </Button> */}
    </div>
  );
}
