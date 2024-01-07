"use client"
import React from "react";
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

export const SidebarWrapper = () => {
  const router = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen SIDEBAR ASIDE sticky top-16 min-w-10 ">
      {/* {collapsed ? ( */}
        {/* <div id="SIDEBAR OVERLAY" className={Sidebar.Overlay()} onClick={setCollapsed} /> */}
        {/* ) : null}  */}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            {/* <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={usePathname() === "/"}
              href="/"
            /> */}
            {
              collapsed ?
              <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={usePathname() === "/"}
              href="/"
            /> :
              <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={usePathname() === "/"}
              href="/"
            />
            }
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={usePathname() === "/dashboard/newevent"}
                title="Accounts"
                icon={<AccountsIcon />}
                href="accounts"
              />
              <SidebarItem
                isActive={usePathname() === "/payments"}
                title="Payments"
                icon={<PaymentsIcon />}
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              />
              <SidebarItem
                isActive={usePathname() === "/customers"}
                title="Customers"
                icon={<CustomersIcon />}
              />
              <SidebarItem
                isActive={usePathname() === "/products"}
                title="Products"
                icon={<ProductsIcon />}
              />
              <SidebarItem
                isActive={usePathname() === "/reports"}
                title="Reports"
                icon={<ReportsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="Collapse">
              <Button color="primary" onClick={setCollapsed}></Button>
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={usePathname() === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
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
          </div>
        </div>
      </div>
    </aside>
  );
};
