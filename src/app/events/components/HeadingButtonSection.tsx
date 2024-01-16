
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
// import CardSponser from "@/components/cards/experimental/CardSponser";
import { Divider, Button } from "@/components/ClientNextUI";
import {
  ChevronsDown as DoubleArrowRightIcon,
  ChevronsUp as DoubleArrowDownIcon,
} from "lucide-react";


export default function comp() {

    return (
        <div className="HEADING-BUTTONS  flex w-full flex-row  lg:space-x-4">
        <Button
          size="lg"
          color={"primary"}
          as={Link}
          href={"#eventC"}
          endContent={<DoubleArrowDownIcon />}
          className="button w-full hidden lg:flex lg:w-fit"
        >
          See All Events
        </Button>
        <h2 className="SUBHEADING lg:hidden text-primary prose mx-auto text-4xl font-extrabold dark:prose-invert md:text-5xl">
        Featured Event
          {/* <span className="bg-gradient-to-r from-[#4F46E5] to-[#E114E5] bg-clip-text text-transparent">
            Featured Event
          </span> */}
        </h2>
        <Divider orientation="vertical" />
        <Button
          size="lg"
          color={"primary"}
          as={Link}
          href={"#events"}
          endContent={<DoubleArrowRightIcon />}
          className="button hidden w-fit lg:flex "
        >
          Go To Featured
        </Button>
      </div>

    )
}