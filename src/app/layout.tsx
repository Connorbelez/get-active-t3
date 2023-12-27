import "@/styles/globals.css";

// import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import clsx from "clsx";

import Providers from "@/app/_components/Providers";
import Nav from "@/app/_components/Nav";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

export const metadata = {
  title: "Get Active",
  description: "Get Active V3 T3",
  icons: [{ rel: "icon", url: "/Logo.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={clsx(
					"bg-background font-sans antialiased ",
				)} >
          {/* <TRPCReactProvider cookies={cookies().toString()}> */}
            <Providers>
            <div vaul-drawer-wrapper=""  className="relative bg-background flex flex-col items-center h-full w-full">

              <Nav />
              <main className=" mx-auto w-full flex flex-col items-center content-center flex-grow">
                  {children}
              </main>
            </div>

            </Providers>
        {/* </TRPCReactProvider> */}
      </body>
    </html>
  );
}
