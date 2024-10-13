import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { TEST_ID } from "../lib/constants";
import { useDispatchContext, useStateContext } from "../lib/context";
import { ActionType } from "../lib/types";

export const ClearTodosAlert = () => {
  const { t } = useTranslation();

  const dispatch = useDispatchContext();
  const state = useStateContext();

  const handleClearTodos = () => {
    if (state.prepareToClearTodos) {
      dispatch({ type: ActionType.CLEAR_TODOS, payload: state.tab });
      dispatch({ type: ActionType.PREPARE_TO_CLEAR_TODOS, payload: false });
    }
  };

  const resetPreparedToClearTodos = () => {
    dispatch({ type: ActionType.PREPARE_TO_CLEAR_TODOS, payload: false });
  };

  return (
    <AlertDialog.Root open={Boolean(state.prepareToClearTodos)}>
      <AlertDialog.Content maxWidth="360px" data-testid={TEST_ID.alertRemoveAllTodos}>
        <AlertDialog.Title>{t("warning")}!</AlertDialog.Title>
        <AlertDialog.Description>
          {t("remove todos?")} {t(state.tab)} {t("todos")}?
        </AlertDialog.Description>
        <Flex gap="3" justify="end" className="mt-8">
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              color="gray"
              onClick={resetPreparedToClearTodos}
              data-testid={TEST_ID.alertRemoveAllTodosCancel}
            >
              {t("cancel")}
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={handleClearTodos}
              data-testid={TEST_ID.alertRemoveAllTodosAccept}
            >
              {t("remove")}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
