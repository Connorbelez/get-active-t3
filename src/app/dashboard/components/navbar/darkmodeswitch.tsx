import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@/components/ClientNextUI";

export const DarkModeSwitch = () => {
  const { setTheme, theme } = useNextTheme();
  return (
    <Switch
      isSelected={theme === "dark" ? true : false}
      onValueChange={(e) => setTheme(e ? "dark" : "light")}
    />
  );
};
