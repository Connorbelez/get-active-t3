"use client"
import {Button} from "@nextui-org/react";

interface OpenInMapButtonProps {
    address:string;
    className?:string;
    variant?:"solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost" | undefined;
    lat:number;
    lng:number;
    wrapperClassName?:string;
}
export const OpenInMapButton = ({address, className, variant,lat,lng, wrapperClassName}:OpenInMapButtonProps) =>{
    console.log("address: ",address,lat,lng)
    console.log(`www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${lat},${lng}`)
    const openInMap = () =>{
            // If it's an iPhone..
            if( (navigator.platform.indexOf("iPhone") != -1) 
                || (navigator.platform.indexOf("iPod") != -1)
                || (navigator.platform.indexOf("iPad") != -1))
                 window.open(`maps://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${lat},${lng}`);
            else
                 window.open(`http://maps.apple.com/?daddr=${address}`);
        }
    return(
        <div className={wrapperClassName}>

            <Button
            color="primary"
            variant={variant}
            className={className}
            onClick={openInMap}
            >
                Take Me There! 
            </Button>
        </div>
    )
}

export default OpenInMapButton;