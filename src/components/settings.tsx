import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { IconButton, Select } from "@radix-ui/themes";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { COLORS, LANGUAGES, LS_KEY } from "../lib/constants";
import { useDispatchContext, useStateContext } from "../lib/context";
import { ActionType, Colors, Languages } from "../lib/types";

export const Settings = () => {
  const { i18n } = useTranslation();

  const dispatch = useDispatchContext();
  const state = useStateContext();

  const handleToggleTheme = () => {
    const isDark = state.theme === "dark";

    dispatch({ type: ActionType.CHANGE_THEME, payload: isDark ? "light" : "dark" });
  };

  const handleChangeColor = (color: Colors) => {
    dispatch({ type: ActionType.CHANGE_COLOR, payload: color });
    localStorage.setItem(LS_KEY.color, color);
  };

  const handleChangeLanguage = (lang: Languages) => {
    i18n.changeLanguage(i18n.language === "en" ? "ru" : "en");
    localStorage.setItem(LS_KEY.lang, lang);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
    localStorage.setItem(LS_KEY.theme, state.theme);
  }, [state.theme]);

  return (
    <section className="absolute bottom-4 right-4 flex items-center gap-2">
      <Select.Root defaultValue={i18n.language} onValueChange={handleChangeLanguage}>
        <Select.Trigger />
        <Select.Content>
          {Object.entries(LANGUAGES).map(([langKey, langName]) => (
            <Select.Item key={langKey} value={langKey}>
              {langName}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Select.Root defaultValue={state.color} onValueChange={handleChangeColor}>
        <Select.Trigger />
        <Select.Content>
          {Object.entries(COLORS).map(([colorKey, { en, ru }]) => (
            <Select.Item key={colorKey} value={colorKey}>
              {i18n.language === "en" ? en : ru}
            </Select.Item>
          ))}
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
