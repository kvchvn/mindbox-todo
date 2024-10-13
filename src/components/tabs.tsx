import { SegmentedControl } from "@radix-ui/themes";
import { TEST_ID } from "../constants";
import { useDispatchContext } from "../context";
import { ActionType, Tab } from "../types";

export const Tabs = () => {
  const dispatch = useDispatchContext();

  const handleTabChange = (value: Tab) => {
    dispatch({ type: ActionType.SET_TAB, payload: value });
  };

  return (
    <SegmentedControl.Root defaultValue="all" onValueChange={handleTabChange} size="2">
      <SegmentedControl.Item value="all" data-testid={TEST_ID.tabAll}>
        All
      </SegmentedControl.Item>
      <SegmentedControl.Item value="completed" data-testid={TEST_ID.tabCompleted}>
        Completed
      </SegmentedControl.Item>
      <SegmentedControl.Item value="uncompleted" data-testid={TEST_ID.tabUncompleted}>
        Uncompleted
      </SegmentedControl.Item>
    </SegmentedControl.Root>
  );
};
