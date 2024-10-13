import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { TEST_ID } from "../lib/constants";
import { useDispatchContext, useStateContext } from "../lib/context";
import { ActionType } from "../lib/types";

export const ResetButton = () => {
  const { t } = useTranslation();

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
      data-testid={TEST_ID.buttonRemoveAllTodos}
    >
      <TrashIcon width={12} height={12} />
      {t("remove")} {t(state.tab)} {t("todos")}
    </Button>
  );
};
