"use client"
import * as React from "react";
import { SessionProvider } from "next-auth/react"
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { Toaster } from "components/ui/toast";
function Wrapper({children}: {children: React.ReactNode}) {
    return (
        <SessionProvider>
            <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme={"dark"}>
                <Toaster />
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