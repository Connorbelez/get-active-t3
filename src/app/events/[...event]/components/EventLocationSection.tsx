import { MapPinned } from "lucide-react";
// import MapAccordian from "@/components/MapAccordian/MapAccordian";
import dynamic from "next/dynamic";
import {Button} from "@nextui-org/react";
const MapAccordian = dynamic(() => import("@/components/MapAccordian/MapAccordian"));
import Map from "@/components/Map/MapBox";
import { string } from "zod";
import { OpenInMapButton } from "../../../../components/OpenInMapButton";
interface compProps {
    heading: string,
    address?: string,
    city: string,
    province: string,
    postalCode?: string,
    location?: string,
    lat:number,
    lng:number,

}

export default function comp({heading,address,city,province,postalCode,lat,lng,location}: compProps) {
    // function openInMap(){
    //     // If it's an iPhone..
    //     if( (navigator.platform.indexOf("iPhone") != -1) 
    //         || (navigator.platform.indexOf("iPod") != -1)
    //         || (navigator.platform.indexOf("iPad") != -1))
    //          window.open(`maps://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=[YOUR_LAT],[YOUR_LNG]`);
    //     else
    //          window.open(`http://maps.apple.com/?daddr=${address}`);
    // }
    
    return (
        <div className="Place mb-16 flex w-full flex-col text-left font-bold">
                  <link
        href="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css"
        rel="stylesheet"
      />
        <div className="prose mb-4 dark:prose-invert">
            <h2 className="text-primary">Place</h2>
        </div>
        <div className="flex w-full flex-col items-center">
            <div className="flex w-full flex-row items-center px-2">
                <i className="mr-1 h-[24px] w-[24px] self-start">
                    {/* <MapPinned color={"#BEF264"} height={20} width={20} /> */}
                    <MapPinned height={20} width={20} />
                </i>
                <div className="prose w-full max-w-6xl tracking-tighter antialiased dark:prose-invert ">
                <p className=" mb-2 font-mono text-sm font-bold">
                    {`${location !== undefined ? location : city}`}
                </p>
                <p className=" my-2 font-mono text-sm text-zinc-900/40 dark:text-zinc-200/40">
                    {address} {city}, {province} {postalCode}
                </p>
                </div>
            </div>
        </div>
        <div className="mt-2 w-full ">
            <MapAccordian title="VIEW MAP" province={province} address={address} city={city} center={city as string} lat={lat} lng={lng} postalCode={postalCode} />
            {/* <Map wrapperClassName="h-[300px] w[300px]"/> */}
            <OpenInMapButton wrapperClassName="flex justify-center items-center px-4 my-4" className="w-full " variant="faded" address={address as string} lat={lng} lng={lat}/>


        </div>
    </div>

    )
}
