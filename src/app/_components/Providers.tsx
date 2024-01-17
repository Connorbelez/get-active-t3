"use client"

import { SessionProvider } from "next-auth/react"
import {NextUIProvider} from "@/components/ClientNextUI";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { Toaster } from "@/components/ui/toast";


import { SpeedInsights } from "@vercel/speed-insights/next"

function Wrapper({children}: {children: React.ReactNode}) {
    
    return (


        // <SessionProvider session={session}>
            <NextUIProvider>
                <NextThemesProvider attribute="class" >
                    <Toaster closeButton/>
                    {/* <SpeedInsights/> */}
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        // </SessionProvider>


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