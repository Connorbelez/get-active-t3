import "@/styles/globals.css";

// import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
// import clsx from "clsx";

import Providers from "@/app/_components/Providers";
// import dynamic from "next/dynamic";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/server/auth";
// import Nav from "@/app/_components/Nav";
// import { getServerAuthSession } from "@/server/auth";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// const Nav = dynamic(() => import("@/app/_components/Nav"));
// import { getServerAuthSession } from "@/server/auth";
export const metadata = {
  title: "Get Active",
  description: "Get Active V3 T3",
  icons: [{ rel: "icon", url: "/Logo.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cooks = cookies().toString();

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, 
                      minimum-scale=1.0, maximum-scale=1.0, 
                      user-scalable=no"></meta>
      <body className={
					"bg-background font-sans antialiased "
				} >
          <TRPCReactProvider cookies={cooks}>
            <Providers  >
            <div  className="bg-background items-center w-full">

              {/* <Nav /> */}
              <main className=" w-full h-full flex flex-col items-center">
                  {children}
              </main>
            </div>

            </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
