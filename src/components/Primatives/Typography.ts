import { tv } from "tailwind-variants";

export const title = tv({
	base: "tracking-tight inline font-semibold",
	variants: {
        color: {
            violet: "dark:from-[#FF1CF7] dark:to-[#b249f8] from-[#D13FD3] to-[#9A2FBF]",
            yellow: "dark:from-[#FF705B] dark:to-[#FFB457] from-[#FF8A65] to-[#FFCC80]",
            blue: "dark:from-[#5EA2EF] dark:to-[#0072F5] from-[#64B5F6] to-[#2196F3]",
            cyan: "dark:from-[#00b7fa] dark:to-[#01cfea] from-[#4DD0E1] to-[#00ACC1]",
            green: "dark:from-[#6FEE8D] dark:to-[#17c964] from-[#81C784] to-[#43A047]",
            pink: "dark:from-[#FF72E1] dark:to-[#F54C7A] from-[#F06292] to-[#E91E63]",

            foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B] from-[#000000] to-[#4B4B4B]",
            red: "dark:from-[#FF0000] dark:to-[#8B0000] from-[#FF5252] to-[#D32F2F]",
            orange: "dark:from-[#FFA500] dark:to-[#FF4500] from-[#FF9800] to-[#EF6C00]",
            // solid colors
            solidViolet: "dark:#FF1CF7 #D13FD3",
            solidYellow: "dark:#FF705B #FF8A65",
            solidBlue: "dark:#5EA2EF #64B5F6",
            solidCyan: "dark:#00b7fa #4DD0E1",
            solidGreen: "dark:#6FEE8D #81C784",
            solidPink: "dark:#FF72E1 #F06292",
            solidForeground: "dark:#FFFFFF #000000",
            solidRed: "dark:#FF0000 #FF5252",
            solidOrange: "dark:#FFA500 #FF9800",
        },
		size: {
			xxsm: "text-lg lg:text-2xl",
			xsm: "text-2xl lg:text-3xl",
			sm: "text-3xl lg:text-4xl",
			md: "text-[2.3rem] lg:text-5xl leading-9",
			lg: "text-4xl lg:text-6xl",
		},
		fullWidth: {
			true: "w-full block",
		},
	},
	defaultVariants: {
		size: "md",
	},
	compoundVariants: [
		{
			color: [
				"violet",
				"yellow",
				"blue",
				"cyan",
				"green",
				"pink",
				"foreground",
			],
			class: "bg-clip-text text-transparent bg-gradient-to-b",
		},
	],
});

export const subtitle = tv({
	base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
	variants: {
		fullWidth: {
			true: "!w-full",
		},
	},
  defaultVariants:{
    fullWidth: true
  }
});
