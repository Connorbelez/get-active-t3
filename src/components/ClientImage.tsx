"use client"

import {Image} from "@nextui-org/react";

interface compProps {
    src:string,
    alt:string,
    radius : "none" | "sm" | "md" | "lg" | "full" | undefined,
    classNames?:{
        wrapper?:string,
        img?:string,
    }
}

export default function Comp({
    src,alt,classNames, radius="none"
}: compProps) {

    return (
        <Image
        src={src}
        radius={radius}
        alt={alt}
        // className=""
        classNames={classNames}
    />
    )
}