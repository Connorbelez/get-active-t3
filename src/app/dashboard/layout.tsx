
import React from "react";
// import { useLockedBody } from "./components/hooks/useBodyLock";
// import { NavbarWrapper } from "./components/navbar/navbar";
// import { SidebarWrapper } from "./components/sidebar/sidebar";
// import { SidebarContext } from "./components/ly/layout-context"
import NavPopup from "./components/NavPopup/NavPopup";
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
            <section className="LAYOUT flex w-full">
              {/* <SidebarWrapper /> */}
             {children}
             <div className="fixed bottom-4 right-4">
                <NavPopup />
             </div>
            </section>
          // </SidebarContext.Provider>
        );
}