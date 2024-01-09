
import React from "react";
// import { useLockedBody } from "./components/hooks/useBodyLock";
// import { SidebarWrapper } from "./components/sidebar/sidebar";
// import { SidebarContext } from "./components/ly/layout-context"
import NavPopup from "./components/NavPopup/NavPopup";
import SideNav from "./components/SideNav/SideNav";
import dynamic from "next/dynamic";
const SideBarWrapper = dynamic(() => import("./components/sidebar/sidebar"))
interface Props {
  children: React.ReactNode;
}


export default function Layout({
        children, // will be a page or nested layout
      }: {
        children: React.ReactNode
      }) {
        // const [sidebarOpen, setSidebarOpen] = React.useState(false);
        // const [_, setLocked] = useLockedBody(false);
        // const handleToggleSidebar = () => {
        //   setSidebarOpen(!sidebarOpen);
        //   setLocked(!sidebarOpen);
        // };
      
        return (
          // <SidebarContext.Provider
          //   value={{
          //     collapsed: sidebarOpen,
          //     setCollapsed: handleToggleSidebar,
          //   }}
          // >
            <section className="LAYOUT  flex w-full  relative ">
              <div className="[700px]:w-64">
              </div>
              <SideBarWrapper />
              <div className="w-full pl-10 sm:pl-0 flex justify-center">
                {children}
              </div>
              <div className="h-[1000px]"></div>
             <div className="fixed bottom-4 right-4">
                <NavPopup />
             </div>
             
            </section>

          // </SidebarContext.Provider>
        );
}