import CategoryFilter from "@/../components/shared/CategoryFilter";
import Collection from "@/../components/shared/Collection";
import Search from "@/../components/shared/Search";
// import { button as Button } from "@/../components/ui/button";
// import { getAllEvents } from '@/lib/actions/event.actions';
// import { SearchParamProps } from '@/types';
import Image from "next/image";
import NavLink from "@/../components/ui/NavLink";
import Link from "next/link";
import { title as heading, subtitle } from "@/components/Primatives/Typography";
import Carosel from "../components/CaroselSample";
import { title } from "process";
import Card from "@/components/cards/experimental/Card";
import CardSponser from "@/components/cards/experimental/CardSponser";
import { Divider, Button } from "@nextui-org/react";
import {
  DoubleArrowRightIcon,
  DoubleArrowDownIcon,
} from "@radix-ui/react-icons";
interface compProps {
    
}

export default function comp({props}: {props: compProps}) {

    return (
        <div className="HEADING-BUTTONS  flex w-full flex-row  lg:space-x-4">
        <Button
          size="lg"
          color={"primary"}
          as={Link}
          href={"#events"}
          endContent={<DoubleArrowDownIcon />}
          className="button w-full lg:w-fit"
        >
          See Events
        </Button>
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