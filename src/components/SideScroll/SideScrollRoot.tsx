import clsx from 'clsx'
import React, { RefObject } from 'react'
// import {ScrollShadow} from "@nextui-org/react";
interface compProps {
    widthStyling?: string,
    spacing?: string,
    children: React.ReactNode,
    className?: string,
    vertical?: boolean,
    ref: RefObject<HTMLDivElement>,

}
const defaultStyling = "SIDESCROLL CONTAINER snap-mandatory snap-x overflow-x-scroll flex"

export default function comp({spacing, children, className,vertical, ref}: compProps) {
    const direction = vertical ? "flex-col" : "flex-row";

    return (
        // <ScrollShadow orientation="horizontal" className="SCROLLSHADOW z-10 w-full h-full "
        //             size={40} offset={20}
        // >

            <div ref={ref} className={clsx(defaultStyling,direction,spacing,className)}>
                {children}
            </div>

    )
}