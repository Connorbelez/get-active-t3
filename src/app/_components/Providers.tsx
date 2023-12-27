"use client"
import * as React from "react";
import { SessionProvider } from "next-auth/react"
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { Toaster } from "components/ui/toast";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Dispatch, SetStateAction, createContext } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export const AppContext = createContext<{
	font: string;
	setFont: Dispatch<SetStateAction<string>>;
}>({
	font: "Default",
	setFont: () => {},
});
function Wrapper({children}: {children: React.ReactNode}) {
    return (


        <SessionProvider>
            <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme={"dark"}>
                    <Toaster />
                    <SpeedInsights/>
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        </SessionProvider>

    );
}   

export default Wrapper;








// export default function App({
//   Component,
//   pageProps: { session, ...pageProps },
// }) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   )
// }