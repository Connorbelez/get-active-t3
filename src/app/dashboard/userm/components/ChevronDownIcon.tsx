import React from "react";
export const ChevronDownIcon = ({strokeWidth = 1.5, className, size, ...props}: {strokeWidth?:number,size?:number, className?:string,props?:any}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || "1em"}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || "1em"}
    {...props}
  >
    <path
      d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={strokeWidth}
    />
  </svg>
);
