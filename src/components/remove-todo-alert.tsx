import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { TEST_ID } from "../lib/constants";
import { useDispatchContext, useStateContext } from "../lib/context";
import { ActionType } from "../lib/types";

export const RemoveTodoAlert = () => {
  const { t } = useTranslation();

  const dispatch = useDispatchContext();
  const state = useStateContext();

  const handleRemoveTodo = () => {
    if (state.prepareToRemoveTodo) {
      dispatch({ type: ActionType.REMOVE_TODO, payload: state.prepareToRemoveTodo.id });
      dispatch({ type: ActionType.PREPARE_TO_REMOVE_TODO, payload: null });
    }
  };

  const resetPreparedToRemoveTodo = () => {
    dispatch({ type: ActionType.PREPARE_TO_REMOVE_TODO, payload: null });
  };

  return (
    <AlertDialog.Root open={Boolean(state.prepareToRemoveTodo)}>
      <AlertDialog.Content maxWidth="360px" data-testid={TEST_ID.alertRemoveTodo}>
        <AlertDialog.Title as="h3">{t("warning")}!</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {t("remove todo?")}
          <span className="italic block">{state.prepareToRemoveTodo?.value}</span>
        </AlertDialog.Description>

        <Flex gap="3" justify="end" className="mt-8">
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              color="gray"
              onClick={resetPreparedToRemoveTodo}
              data-testid={TEST_ID.alertRemoveTodoCancel}
            >
              {t("cancel")}
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={handleRemoveTodo}
              data-testid={TEST_ID.alertRemoveTodoAccept}
            >
              {t("remove")}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
