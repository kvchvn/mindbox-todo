import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { IconButton, Select } from "@radix-ui/themes";
import { useEffect } from "react";
import { useDispatchContext, useStateContext } from "../context";
import { ActionType, Color } from "../types";

export const Settings = () => {
  const dispatch = useDispatchContext();
  const state = useStateContext();

  const handleToggleTheme = () => {
    const isDark = state.theme === "dark";

    dispatch({ type: ActionType.CHANGE_THEME, payload: isDark ? "light" : "dark" });
  };

  const handleChangeColor = (color: Color) => {
    dispatch({ type: ActionType.CHANGE_COLOR, payload: color });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
    localStorage.theme = state.theme;
  }, [state.theme]);

  return (
    <section className="absolute bottom-4 right-4 flex items-center gap-2">
      <Select.Root defaultValue={state.color} onValueChange={handleChangeColor}>
        <Select.Trigger />
        <Select.Content>
          <Select.Item value="jade">Jade</Select.Item>
          <Select.Item value="bronze">Bronze</Select.Item>
          <Select.Item value="indigo">Indigo</Select.Item>
        </Select.Content>
      </Select.Root>
      <IconButton variant="surface" onClick={handleToggleTheme}>
        {state.theme === "dark" ? (
          <MoonIcon width={16} height={16} />
        ) : (
          <SunIcon width={16} height={16} />
        )}
      </IconButton>
    </section>
  );
};
