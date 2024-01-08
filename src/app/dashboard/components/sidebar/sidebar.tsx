"use client"


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
  const collapsed = useMediaQuery(768);

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
    <aside className="h-screen SIDEBAR ASIDE sticky top-16 min-w-10 ">
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
  

              <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              // isActive={usePathname() === "/"}
              href="/dashboard"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                // isActive={usePathname() === "/dashboard/newevent"}
                title="New Event"
                icon={<AccountsIcon />}
                href="/dashboard/newevent"
              />
              <SidebarItem
                // isActive={usePathname() === "/payments"}
                title="Users"
                icon={<PaymentsIcon />}
                href="/dashboard/users"
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              />
              <SidebarItem
                // isActive={usePathname() === "/customers"}
                title="Customers"
                icon={<CustomersIcon />}
              />
              <SidebarItem
                // isActive={usePathname() === "/products"}
                title="Manage Events"
                icon={<ProductsIcon />}
              />
              <SidebarItem
                // isActive={usePathname() === "/reports"}
                title="Reports"
                icon={<ReportsIcon />}
              />
            </SidebarMenu>

  

            <SidebarMenu title="Updates">
              <SidebarItem
                // isActive={usePathname() === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu>
          </div>

          {/* <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div> */}

        </div>
        
      </div>
    </aside>
  );
};
