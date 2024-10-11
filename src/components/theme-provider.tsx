import { Theme } from "@radix-ui/themes";
import React from "react";
import { useStateContext } from "../context";

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const state = useStateContext();

  return (
    <Theme
      accentColor={state.color}
      grayColor="slate"
      radius="medium"
      appearance="inherit"
      panelBackground="translucent"
    >
      {children}
    </Theme>
  );
};
