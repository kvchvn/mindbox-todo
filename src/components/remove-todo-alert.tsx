import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { TEST_ID } from "../constants";
import { useDispatchContext, useStateContext } from "../context";
import { ActionType } from "../types";

export const RemoveTodoAlert = () => {
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
        <AlertDialog.Title as="h3">Warning!</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to remove the todo?
          <span className="italic">{state.prepareToRemoveTodo?.value}</span>
        </AlertDialog.Description>

        <Flex gap="3" justify="end" className="mt-8">
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              color="gray"
              onClick={resetPreparedToRemoveTodo}
              data-testid={TEST_ID.alertRemoveTodoCancel}
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={handleRemoveTodo}
              data-testid={TEST_ID.alertRemoveTodoAccept}
            >
              Remove
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
