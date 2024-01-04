interface GradientProps {
  wrapperClassName?: string;
  style?: React.CSSProperties;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  blur?: string;
}

export const BgGradient = ({
  wrapperClassName = "absolute inset-0 max-w-lg m-auto h-[27rem] sm:h-64 sm:max-w-7xl",
  style = {},
  color1 = `rgba(192, 132, 252, 0.11)`,
  color2 = `rgba(14, 165, 233, 0.41)`,
  color3 = `rgba(232, 121, 249, 0.26)`,
  color4 = `rgba(79, 70, 229, 0.4)`,
}: GradientProps) => (
  <div
    className="absolute inset-0 m-auto h-[27rem] max-w-lg sm:h-64 sm:max-w-7xl"
    style={{
      background: `linear-gradient(106.89deg, ${color1} 15.73%, ${color2} 15.74%, ${color3} 56.49%, ${color4} 115.91%)`,
      // "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
      filter: "blur(118px)",
    }}
  ></div>
);

// //Default Props
// BgGradient.defaultProps = {
//   color1: `rgba(192, 132, 252, 0.11)`,
//   color2: `rgba(14, 165, 233, 0.41)`,
//   color3: `rgba(232, 121, 249, 0.26)`,
//   color4: `rgba(79, 70, 229, 0.4)`,
//   blur: `118px`,
//   wrapperClassName: "absolute inset-0 max-w-lg m-auto h-[27rem] sm:h-64 sm:max-w-7xl",
// }
