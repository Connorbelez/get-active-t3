"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { MapPin, MapPinnedIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import TicketCard, {
  HTicketCardProps,
} from "@/components/cards/prod/HTicketCard";
import { TicketType } from "@prisma/client";
import clcx from "classnames";
export interface MapAccordianProps {
  title: string;
  // children?: React.ReactNode;
  tickets: TicketType[];
  wrapperClassName?: string;
}

export default function App({
  title,
  tickets,
  wrapperClassName,
}: MapAccordianProps) {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const [selectedKeys, setSelectedKeys] = useState(new Set(["0"]));

  return (
    <Accordion
      isCompact
      variant={"splitted"}
      showDivider
      fullWidth
      selectedKeys={selectedKeys}
      //@ts-expect-error
      onSelectionChange={setSelectedKeys}
      className={
        " hidden h-[100px] w-full flex-col gap-1 border-none p-2 sm:flex "
        
      }
    >
      <AccordionItem
        key={"1"}
        aria-label="Map Accordian 1"
        className=" pb-5 w-full group-[.is-splitted]:px-3"
        indicator={({ isOpen }) => (
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { rotate: 90 },
              closed: { rotate: -360 },
            }}
          >
            {isOpen ? <MapPinnedIcon /> : <MapPin />}
          </motion.div>
        )}
        title={title}
      >
        {tickets.map((ticket: TicketType, index: number) => {
          return <TicketCard key={index} ticket={ticket} />
        })}
      </AccordionItem>
    </Accordion>
  );
}
