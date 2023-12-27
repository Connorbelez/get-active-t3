// import CategoryFilter from "@/../components/shared/CategoryFilter";
// import Collection from "@/../components/shared/Collection";
// import Search from "@/../components/shared/Search";
// import { button as Button } from "@/../components/ui/button";
// import { getAllEvents } from '@/lib/actions/event.actions';
// import { SearchParamProps } from '@/types';
// import Image from "next/image";
// import NavLink from "@/../components/ui/NavLink";
// import Link from "next/link";
// import { title as heading, subtitle } from "@/components/Primatives/Typography";
// import Carosel from "./components/CaroselSample";
// import { title } from "process";
// import Card from "@/components/cards/experimental/Card";
// import CardSponser from "@/components/cards/experimental/CardSponser";
// import { Divider, Button } from "@nextui-org/react";
// import {
//   DoubleArrowRightIcon,
//   DoubleArrowDownIcon,
// } from "@radix-ui/react-icons";
// import HeadingButtonSection from "./components/HeadingButtonSection";
import EventHero from "./components/EventsHero";
import HeroDivider1 from "./components/HeroDivider1";
import LogoGrid from "./components/LogoGrid";
import HeroDivider2 from "./components/HeroDivider2";
import AllEventsCarosel from "./components/AllEventsCarosel";

export default async function Home() {

  return (
    <>
      <section className="flex flex-col justify-center px-6 py-5">
        <EventHero props={""} />
      </section>
      
      <HeroDivider1 props={""} />

      <LogoGrid props={""} />

      <HeroDivider2 props={""} />

      <AllEventsCarosel props={""} />

    </>
  );
}
