import { tv } from "@nextui-org/react";

export const SidebarWrapper = tv({
  base: "bg-background transition-transform h-full w-64 shrink-0 z-[201] border-r border-divider flex-col py-6 px-3 ",

  variants: {
    collapsed: {
      true: "-translate-x-full ml-0 [display:inherit]",
      false:"md:ml-0 md:flex md:static md:h-screen md:translate-x-0"
    },
  },


    // variants: {
    //   collapsed: {
    //     true: {
    //       display: "inherit",
    //       marginLeft: "0 ",
    //       transform: "-translate-x-full",
    //       width:"100px"
    //     },
    //   },
    // },
});
export const Overlay = tv({
  base: "bg-[rgb(15_23_42/0.3)] inset-0 z-[201] opacity-80 max-w-[50px] transition-opacity md:z-auto md:opacity-100",
});

export const Header = tv({
  base: "flex gap-8 items-center z-[201] px-6",
});

export const Body = tv({
  base: "flex flex-col gap-6 mt-9 z-[201] px-2 z-10",
});

export const Footer = tv({
  base: "flex flex-col items-center z-[201] justify-center",
});

export const Sidebar = Object.assign(SidebarWrapper, {
  Header,
  Body,
  Overlay,
  Footer,
});
