import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { TEST_ID } from "../constants";
import { useDispatchContext, useStateContext } from "../context";
import { ActionType } from "../types";

export const ClearTodosAlert = () => {
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
        <AlertDialog.Title>Warning!</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to clear {state.tab} todos?
        </AlertDialog.Description>
        <Flex gap="3" justify="end" className="mt-8">
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              color="gray"
              onClick={resetPreparedToClearTodos}
              data-testid={TEST_ID.alertRemoveAllTodosCancel}
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={handleClearTodos}
              data-testid={TEST_ID.alertRemoveAllTodosAccept}
            >
              Clear
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
