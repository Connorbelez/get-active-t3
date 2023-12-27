/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss"




// import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
const {nextui} = require("@nextui-org/react");
export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',


],
  theme: {

    extend: {

      // minWidth: {
      //   '200': '200',
      // },
      // zIndex: {
      //     '-10': '-10',
      // },
      colors : {
        // primary: {
        //   500: '#624CF5',
        //   50: ' #F6F8FD',
        //   DEFAULT: '#624CF5',
        //   foreground: 'hsl(var(--primary-foreground))',
        // },
          coral: {
            500: '#15BF59',
          },

          grey: {
            600: '#545454', // Subdued - color name in figma
            500: '#757575',
            400: '#AFAFAF', // Disabled - color name in figma
            50: '#F6F6F6', // White Grey - color name in figma
          },
            muted:"#27272a",
            'muted-foreground': 'var(--muted-foreground)',
            card: 'var(--card)',
            'card-foreground': 'var(--card-foreground)',
            popover: 'var(--popover)',
            'popover-foreground': 'var(--popover-foreground)',
            // primary: 'var(--primary)',
            // 'primary-foreground': 'var(--primary-foreground)',
            // secondary: 'var(--secondary)',
            'secondary-foreground': 'var(--secondary-foreground)',
            accent: 'var(--accent)',
            'accent-foreground': 'var(--accent-foreground)',
            destructive: 'var(--destructive)',
            'destructive-foreground': 'var(--destructive-foreground)',
            // border: 'var(--border)',
            input: 'var(--input)',
            // ring: 'var(--ring)',
            border: "#27272a",
            ring: "#d4d4d8"
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      backgroundImage: {
        'dotted-pattern': ` url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239a9a9c' fill-opacity='0.12'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      },
      
    },
    
  },
  darkMode: "class",
  plugins: [require('@tailwindcss/typography'),require("tailwindcss-animate"),
  nextui(
    {prefix: "nextui", // prefix for themes variables
      addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          // layout: {}, // light theme layout tokens
          colors: {
            muted: "#f4f4f5",
            warning:"#B77D00"
          }, // light theme colors
        },
        dark: {
          // layout: {}, // dark theme layout tokens
          colors: {
            primary:{
              DEFAULT: "#BEF264",
              foreground: "#000000"
            },
            coral: {
              500: '#15BF59',
            },
  
            grey: {
              600: '#545454', // Subdued - color name in figma
              500: '#757575',
              400: '#AFAFAF', // Disabled - color name in figma
              50: '#F6F6F6', // White Grey - color name in figma
            },

            background:"#18181B",
            muted:"#27272a",
            // 'muted-foreground': 'var(--muted-foreground)',
            // card: 'var(--card)',
            // 'card-foreground': 'var(--card-foreground)',
            // popover: 'var(--popover)',
            // 'popover-foreground': 'var(--popover-foreground)',
            // primary: 'var(--primary)',
            // 'primary-foreground': 'var(--primary-foreground)',
            // secondary: 'var(--secondary)',
            // 'secondary-foreground': 'var(--secondary-foreground)',
            // accent: 'var(--accent)',
            // 'accent-foreground': 'var(--accent-foreground)',
            // destructive: 'var(--destructive)',
            // 'destructive-foreground': 'var(--destructive-foreground)',
            border: "#27272a",
            ring: "#d4d4d8"
          }, // dark theme colors
          backgroundImage: {
            'dotted-pattern': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239a9a9c' fill-opacity='0.29'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          },
        },

        // ... custom themes
      },
    },
    {"purple-dark": {
      extend: "dark", // <- inherit default values from dark theme
      colors: {
        background: "#0D001A",
        foreground: "#ffffff",
        primary: {
          50: "#3B096C",
          100: "#520F83",
          200: "#7318A2",
          300: "#9823C2",
          400: "#c031e2",
          500: "#DD62ED",
          600: "#F182F6",
          700: "#FCADF9",
          800: "#FDD5F9",
          900: "#FEECFE",
          DEFAULT: "#DD62ED",
          foreground: "#ffffff",
        },
        focus: "#F182F6",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      layout: {
        disabledOpacity: "0.3",
        radius: {
          small: "4px",
          medium: "6px",
          large: "8px",
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px",
        },
      },
    },
  },)
],
} satisfies Config;
