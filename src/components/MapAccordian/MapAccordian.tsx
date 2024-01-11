"use client"
import {Accordion, AccordionItem, Button} from "@nextui-org/react";
import { MapPin, MapPinnedIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map/MapBox"), { ssr: false }) ;
import OpenInMapButton from "@/components/OpenInMapButton";
// import Map from "@/components/Map/MapBox";
export interface MapAccordianProps {
  title: string;
  children?: React.ReactNode;
  center: string;
  lat: number;
  lng: number;
  province: string;
  city: string;
  postalCode?: string | undefined;
  address?: string | undefined;
}





export default function App({ title, center,lat,lng,address}: MapAccordianProps) {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const [selectedKeys, setSelectedKeys] = useState(new Set(["0"]));
    // console.log("center: ",center)
    // const latLng = center.split(",").map((str) => parseFloat(str));
    // console.log("latLng: FROM ACCORDIAN",latLng);
  return (
    <Accordion
    itemClasses={
      {
        base:" border-1 border-primary/50 shadow shadow-primary/40 ",
      }
    }
    variant={"splitted"}
    showDivider
    fullWidth
    selectedKeys={selectedKeys}
    //@ts-ignore
    onSelectionChange={setSelectedKeys}
    className="flex flex-col gap-1 shadow-md rounded-xl p-0 shadow-primary/50 "
    
    defaultExpandedKeys={["theme"]} >
      <AccordionItem
        key={"1"}
        aria-label="Map Accordian 1"
        indicator={({ isOpen }) => (
            <motion.div animate={isOpen ? "open" : "closed"} variants={
                {
                    open: {rotate: 90},
                    closed: {rotate: -360},
                }
            } >
              {isOpen ? <MapPinnedIcon key={1} color={"#BEF264"} /> : <MapPin color={"#BEF264"} />}
            </motion.div>
          )}        
          title={title}
      >
        {/* <Map isAccordionOpen={selectedKeys.has("1")}/> */}
        <div className="h-[400px] mb-3">

          {selectedKeys.has("1") ? <Map latlng={[lat,lng]} wrapperClassName="w-full rounded-lg h-full" /> : null}
          
        </div>
      </AccordionItem>

    </Accordion>
  );
}
