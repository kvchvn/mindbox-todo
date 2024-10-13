import { SegmentedControl } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { TEST_ID } from "../lib/constants";
import { useDispatchContext } from "../lib/context";
import { ActionType, Tab } from "../lib/types";

export const Tabs = () => {
  const { t } = useTranslation();
  const dispatch = useDispatchContext();

  const handleTabChange = (value: Tab) => {
    dispatch({ type: ActionType.SET_TAB, payload: value });
  };

  return (
    <SegmentedControl.Root defaultValue="all" onValueChange={handleTabChange} size="1">
      <SegmentedControl.Item value="all" data-testid={TEST_ID.tabAll}>
        {t("all")}
      </SegmentedControl.Item>
      <SegmentedControl.Item value="completed" data-testid={TEST_ID.tabCompleted}>
        {t("completed")}
      </SegmentedControl.Item>
      <SegmentedControl.Item value="uncompleted" data-testid={TEST_ID.tabUncompleted}>
        {t("uncompleted")}
      </SegmentedControl.Item>
    </SegmentedControl.Root>
  );
};
