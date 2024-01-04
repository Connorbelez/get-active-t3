"use client"
import { createContext, Dispatch, SetStateAction } from "react";

export const AppContext = createContext<{
	font: string;
	setFont: Dispatch<SetStateAction<string>>;
}>({
	font: "Default",
	setFont: () => {},
});




export default function comp({children}: {children: React.ReactNode}) {

    return (
        <AppContext.Provider value={{ font: "Default", setFont: () => {} }}>
            {children}
            </AppContext.Provider>
    )
}