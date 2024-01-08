
import React from "react";
// import { useLockedBody } from "./components/hooks/useBodyLock";
import { SidebarWrapper } from "./components/sidebar/sidebar";
// import { SidebarContext } from "./components/ly/layout-context"
import NavPopup from "./components/NavPopup/NavPopup";
import SideNav from "./components/SideNav/SideNav";

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
              <div className=" w-64">

              <SidebarWrapper />
              </div>
              <div className="w-full flex justify-center">
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