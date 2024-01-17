// "use client"

import {Image, Navbar, NavbarBrand, NavbarContent,NavbarMenu,NavbarMenuItem, NavbarMenuToggle, NavbarItem, Link, } from "@/components/ClientNextUI";

// import { NavAvatar } from "./NavAvater";
import { ThemeSwitch } from "./ThemeSwitcher";
// import { getServerAuthSession } from "@/server/auth";
// import { signIn } from "next-auth/react";
import dynamic from "next/dynamic";

const NavAvatar = dynamic(() => import("./NavAvater") )
export default async function App() {

  const menuItems = [
    "Home",
    "Events",
    "Dashboard",
    // "Log Out",
  ];

  // const session = await getServerAuthSession();
  // const user = session?.user;
  // const userObj = {
  //   username : user?.name,
  //   userImage : user?.image,
  //   userEmail : user?.email,
  // }

  return (
    <Navbar 
    classNames={{
      menu: "flex justify-right items-end text-right"
    }}
    maxWidth="xl" className="z-[202]" position="sticky" >

      <NavbarContent>
        {/* <NavbarMenuToggle

          className="sm:hidden"
        /> */}
        <Link href="/" >
            <NavbarBrand >
              <Image src={"/favicon.ico"} width={40} height={40} alt="Get Active Logo" />
              <p className=" ml-2 font-bold text-inherit">GET ACTIVE</p>
            </NavbarBrand>
        </Link>
      </NavbarContent>
      

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/events">
            Events
          </Link>
        </NavbarItem>
        <NavbarItem className="" >
          <Link href="/dashboard/" >
            DashBoard
          </Link>
        </NavbarItem>
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="end">
      <ThemeSwitch />
        <NavbarItem>
            

            <NavAvatar />


        </NavbarItem>

        <NavbarMenuToggle

            className="sm:hidden"
          />

      </NavbarContent>
      
      <NavbarMenu

      >
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            
          key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href={`/${item.toLocaleLowerCase()==="home"? "" : item.toLowerCase()}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
