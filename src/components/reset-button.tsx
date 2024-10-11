import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useDispatchContext, useStateContext } from "../context";
import { ActionType } from "../types";

export const ResetButton = () => {
  const dispatch = useDispatchContext();
  const state = useStateContext();

  const handleClick = () => {
    dispatch({ type: ActionType.PREPARE_TO_CLEAR_TODOS, payload: true });
  };

  const disabled =
    (state.tab === "all" && !state.completedTodos.length && !state.uncompletedTodos.length) ||
    (state.tab === "completed" && !state.completedTodos.length) ||
    (state.tab === "uncompleted" && !state.uncompletedTodos.length);

  return (
    <Button
      size="1"
      variant="ghost"
      color="ruby"
      disabled={disabled}
      onClick={handleClick}
      className="self-end"
    >
      <TrashIcon width={12} height={12} />
      Remove {state.tab} todos
    </Button>
  );
};
