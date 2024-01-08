"use client"
import { Input} from "@/components/ui/input"
import { AddressAutofill } from "@mapbox/search-js-react";
import { ReactDOM } from "react";
interface compProps {
    value: string | undefined;
    setValue: (value: string) => void;
}

export default function comp({value,setValue}: compProps) {

    return (
        <>
            {/* @ts-ignore */}
            <AddressAutofill accessToken={`${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}` as string}>
                <Input
                    autoComplete="address address-line1"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </AddressAutofill>
        </>
        );
}