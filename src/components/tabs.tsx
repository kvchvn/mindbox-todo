import { SegmentedControl, Select } from "@radix-ui/themes";
import { useDispatchContext } from "../context";
import { ActionType, Tab } from "../types";

export const Tabs = () => {
  const dispatch = useDispatchContext();

  const handleTabChange = (value: Tab) => {
    dispatch({ type: ActionType.SET_TAB, payload: value });
  };

  // to see the select the page should be reloaded
  if (window.innerWidth < 480) {
    return (
      <Select.Root defaultValue="all" onValueChange={handleTabChange}>
        <Select.Trigger className="w-full" />
        <Select.Content>
          <Select.Item value="all">All</Select.Item>
          <Select.Item value="completed">Completed</Select.Item>
          <Select.Item value="uncompleted">Uncompleted</Select.Item>
        </Select.Content>
      </Select.Root>
    );
  }

  return (
    <SegmentedControl.Root defaultValue="all" onValueChange={handleTabChange}>
      <SegmentedControl.Item value="all">All</SegmentedControl.Item>
      <SegmentedControl.Item value="completed">Completed</SegmentedControl.Item>
      <SegmentedControl.Item value="uncompleted">Uncompleted</SegmentedControl.Item>
    </SegmentedControl.Root>
  );
};
