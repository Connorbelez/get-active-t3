"use client"

import { CalendarSearch, CopyPlus, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {useEffect, useState,useCallback} from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../ly/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { useRouter, usePathname } from "next/navigation";

import {Home} from "lucide-react"
import { EditDocumentIcon } from "@/components/icons/Edit";


const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addListener(updateTarget);
    
    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
  }, []);

  return targetReached;
};
export const SidebarWrapper = () => {
  // const [collapsed, setCollapsed] = useState(false);
  // const [width, setWidth] = React.useState(window.innerWidth);
  const breakPoint = useMediaQuery(770);
  const [collapsed, setCollapsed] = useState(true);
  useEffect(() => {
    console.log("breakpoint",breakPoint)
    setCollapsed(breakPoint)
  },[breakPoint])

  
  // React.useEffect(() => {
  //   const handleResize = () => {
  //     setWidth(window.innerWidth);
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);



  return (
    <div>

    <div className={collapsed? "w-10" : "w-64"}> </div>
    <div className={`h-full  SIDEBAR ASIDE fixed top-16 ${collapsed? "-z-5 -translate-x-[90%]" : "z-[201]"} `}>
      {collapsed ? 
      
        <Button
        isIconOnly
        variant="faded"
        radius="none"
        color="primary"
        onPress={() => setCollapsed(!collapsed)}
        className="width-[10px] h-full rounded-r-xl fixed top-0 my-auto right-8 translate-x-full  min-w-unit-10 border-y-0"
        >
          <span className="w-[5px] h-1/6 translate-x-2  rounded-full bg-slate-300/80"></span>
        </Button> : null}
      <div
        className={Sidebar({
          collapsed: (collapsed),
        })}
      >
        <Button
        isIconOnly
        className="w-full"
        variant="faded"
        color="primary"
        onPress={()=>{setCollapsed(!collapsed)}}>
          <PanelLeftClose />
        </Button>

          {/* <div className={""}>
            <img
              src="https://assets.maccarianagency.com/the-front/logos/logo.svg"
              alt="TheFront"
              width="100"
            />
          </div>
          <Button
            className={""}
            isIconOnly
            
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ViewIcon /> : <DevIcon />}
          </Button> */}
        
        <div className="flex flex-col z-[201] justify-between h-full">
          <div className={Sidebar.Body()}>
  

              <SidebarItem
              title="Dashboard Home"
              icon={<HomeIcon />}
              // isActive={usePathname() === "/"}
              href="/dashboard"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                // isActive={usePathname() === "/dashboard/newevent"}
                title="New Event"
                icon={<EditDocumentIcon size={24} />}
                href="/dashboard/newevent"
              />
              <SidebarItem
                // isActive={usePathname() === "/dashboard/newevent"}
                title="My Events"
                icon={<CalendarSearch size={24} stroke="#969696"/>}
                href="/dashboard/manageevents"
              />
              <SidebarItem
                // isActive={usePathname() === "/payments"}
                title="Users"
                icon={<CustomersIcon />}
                href="/dashboard/userm"
              />
              {/* <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              /> */}
              {/* <SidebarItem
                // isActive={usePathname() === "/customers"}
                title="Customers"
                icon={<CustomersIcon />}
              /> */}
              {/* <SidebarItem
                // isActive={usePathname() === "/products"}
                title="Manage Events"
                icon={<ProductsIcon />}
              /> */}
              {/* <SidebarItem
                // isActive={usePathname() === "/reports"}
                title="Reports"
                icon={<ReportsIcon />}
              /> */}
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                // isActive={usePathname() === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            {/* <Button onPress={()=>{setCollapsed(!collapsed)}}></Button> */}
            </SidebarMenu>


          </div>
{/* 
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
            <Button onPress={()=>{setCollapsed(!collapsed)}}></Button>
          </div> */}

        </div>
        
      </div>
    </div>
    </div>
  );
};

export default SidebarWrapper;