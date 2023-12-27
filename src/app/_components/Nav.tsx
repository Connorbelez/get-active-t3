"use client";
import React from "react";
import {Image, Navbar, NavbarBrand, NavbarContent,NavbarMenu,NavbarMenuItem, NavbarMenuToggle, NavbarItem, Link, Button} from "@nextui-org/react";
import AcmeLogo from "/Logo.png";
import { getSession, signIn, useSession } from "next-auth/react";
import { NavAvatar } from "./NavAvater";
import { ThemeSwitch } from "./ThemeSwitcher";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Log Out",
  ];

  const session = useSession();

  console.table(session)
  return (
    <Navbar maxWidth="xl" className="" position="sticky"  onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        {/* @ts-ignore */}
        <Link href="/" >
            <NavbarBrand >
              <Image src={"/Logo.png"} width={40} height={40} alt="Acme Logo" />
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
        <NavbarItem isActive>
          <Link href="/dashboard/eventcreation" aria-current="page">
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
            
          {session ? 
                    <NavAvatar/>
          : 
                      <Button  color="primary" onPress={()=>{void signIn("discord")}} variant="flat">
                      Login
                    </Button>
          }
        </NavbarItem>
      </NavbarContent>
      
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
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
