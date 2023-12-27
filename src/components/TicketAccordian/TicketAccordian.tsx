"use client"
import {Accordion, AccordionItem} from "@nextui-org/react";
import { MapPin, MapPinnedIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function App() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Accordion
    isCompact
    variant={"splitted"}
    showDivider
    fullWidth
    className="flex flex-col gap-1"
    defaultExpandedKeys={["theme"]} >
      <AccordionItem
        key="1"
        aria-label="Map Accordian 1"
        indicator={({ isOpen }) => (
            <motion.div animate={isOpen ? "open" : "closed"} variants={
                {
                    open: {rotate: 90},
                    closed: {rotate: -360},
                }
            } >
              {isOpen ? <MapPinnedIcon /> : <MapPin />}
            </motion.div>
          )}        
          title="Show Ticket Options:"
      >
        {"MAP"}
      </AccordionItem>

    </Accordion>
  );
}
