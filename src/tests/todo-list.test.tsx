import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";
import App from "../App";
import { TEST_ID } from "../constants";
import { createTodo } from "./utils/helpers";

const TEXT = "todotext";

describe("todo-list", () => {
  beforeEach(async () => {
    render(<App />);
  });

  test("no todos are if local storage is empty", () => {
    const noTodos = screen.getByTestId(TEST_ID.noTodos);
    const todoItems = screen.queryAllByTestId(TEST_ID.todoItemUncompleted);

    expect(noTodos).toBeInTheDocument();
    expect(todoItems.length).toBe(0);
  });

  test("creating todos with priority", async () => {
    const todoList = screen.getByTestId(TEST_ID.todoList);
    const noTodos = screen.getByTestId(TEST_ID.noTodos);

    expect(todoList).toBeInTheDocument();
    // first of all there are no todos in the list
    // if there are no them in the local storage
    // but that's not this case
    expect(noTodos).toBeInTheDocument();
    expect(screen.queryByTestId(TEST_ID.todoItemUncompleted)).toBeNull();

    // add the first todo
    await createTodo(TEXT);

    expect(noTodos).not.toBeInTheDocument();

    const todoItem = screen.getByTestId(TEST_ID.todoItemUncompleted);

    expect(todoItem).toBeInTheDocument();
    expect(todoItem).toHaveTextContent(TEXT);
    expect(screen.queryByTestId(TEST_ID.todoItemPriorityBadge)).toBeNull();

    // add the second todo with priority
    await createTodo(TEXT, true);

    const todoItems = screen.getAllByTestId(TEST_ID.todoItemUncompleted);
    expect(todoItems.length).toBe(2);

    // a prior todo is inserted at the start of the list so it's index will be 0
    expect(todoItems[0]).toHaveTextContent("Priority");
  });

  test("remove todo", async () => {
    await createTodo();
    await createTodo();

    const todoItems = screen.getAllByTestId(TEST_ID.todoItemUncompleted);
    expect(todoItems.length).toBe(2);

    const todoItemsRemoveButtons = screen.getAllByTestId(TEST_ID.buttonRemoveTodo);
    expect(todoItemsRemoveButtons.length).toBe(2);

    // no alert
    expect(screen.queryByTestId(TEST_ID.alertRemoveTodo)).toBeNull();

    await userEvent.click(todoItemsRemoveButtons[0]);

    // the alert has appeared
    expect(screen.queryByTestId(TEST_ID.alertRemoveTodo)).not.toBeNull();

    const cancelButton = screen.getByTestId(TEST_ID.alertRemoveTodoCancel);
    await userEvent.click(cancelButton);

    // the alert has disappeared
    expect(screen.queryByTestId(TEST_ID.alertRemoveTodo)).toBeNull();

    // try to remove the todo another time
    await userEvent.click(todoItemsRemoveButtons[0]);

    expect(screen.queryByTestId(TEST_ID.alertRemoveTodo)).not.toBeNull();
    const acceptButton = screen.getByTestId(TEST_ID.alertRemoveTodoAccept);

    // this time we are sure we want to remove the tood
    await userEvent.click(acceptButton);

    expect(screen.queryByTestId(TEST_ID.alertRemoveTodo)).toBeNull();

    // there are only one todo are on the screen
    expect(screen.getAllByTestId(TEST_ID.todoItemUncompleted).length).toBe(1);
  });

  test("mark todo as completed", async () => {
    const TODOS_COUNT = 3;

    for (let i = 0; i < TODOS_COUNT; i++) {
      await createTodo();
    }

    const completedTodos = screen.queryAllByTestId(TEST_ID.todoItemCompleted);
    const uncompletedTodos = screen.queryAllByTestId(TEST_ID.todoItemUncompleted);
    const initialCheckboxes = screen.queryAllByTestId(TEST_ID.checkboxCompleteTodo);

    expect(completedTodos.length).toBe(0);
    expect(uncompletedTodos.length).toBe(TODOS_COUNT);

    for (const checkbox of initialCheckboxes) {
      expect(checkbox).not.toBeChecked();
    }

    await userEvent.click(initialCheckboxes[0]);

    // due to rerender and todos rearrangement we should get new checkboxes list
    const checkboxesAfterInteraction = screen.queryAllByTestId(TEST_ID.checkboxCompleteTodo);
    const completedTodosAfterInteraction = screen.queryAllByTestId(TEST_ID.todoItemCompleted);
    // and the logic is that checked todo are moved at the end of the todos
    const lastCheckbox = checkboxesAfterInteraction[TODOS_COUNT - 1];

    // and all todos except the last will be unchecked as recently
    for (const checkbox of checkboxesAfterInteraction.slice(0, -1)) {
      expect(checkbox).not.toBeChecked();
    }

    // but the last one will be checked
    expect(lastCheckbox).toBeChecked();
    // and the todo is completed
    expect(completedTodosAfterInteraction.length).toBe(1);

    // unchecked this todo
    await userEvent.click(lastCheckbox);

    const checkboxesAfterAnotherInteraction = screen.getAllByTestId(TEST_ID.checkboxCompleteTodo);
    const completedTodosAfterSecondInteraction = screen.queryAllByTestId(TEST_ID.todoItemCompleted);

    // and again all the checkboxes are unchecked (i.e. all todos are uncompleted)
    for (const checkbox of checkboxesAfterAnotherInteraction) {
      expect(checkbox).not.toBeChecked();
    }

    expect(completedTodosAfterSecondInteraction.length).toBe(0);
  });

  test("remove all todos", async () => {
    const removeAllTodosButton = screen.getByTestId(TEST_ID.buttonRemoveAllTodos);
    expect(removeAllTodosButton).toBeDisabled();

    const TODOS_COUNT = 2;

    for (let i = 0; i < TODOS_COUNT; i++) {
      await createTodo();
    }

    expect(screen.queryAllByTestId(TEST_ID.todoItemUncompleted).length).toBe(TODOS_COUNT);
    expect(removeAllTodosButton).not.toBeDisabled();

    expect(screen.queryByTestId(TEST_ID.alertRemoveAllTodos)).toBeNull();

    await userEvent.click(removeAllTodosButton);

    expect(screen.queryByTestId(TEST_ID.alertRemoveAllTodos)).not.toBeNull();

    // cancel action and hide the alert
    await userEvent.click(screen.getByTestId(TEST_ID.alertRemoveAllTodosCancel));

    expect(screen.queryByTestId(TEST_ID.alertRemoveAllTodos)).toBeNull();
    expect(screen.queryAllByTestId(TEST_ID.todoItemUncompleted).length).toBe(TODOS_COUNT);

    await userEvent.click(removeAllTodosButton);

    expect(screen.queryByTestId(TEST_ID.alertRemoveAllTodos)).not.toBeNull();

    // accept removing all todos
    await userEvent.click(screen.getByTestId(TEST_ID.alertRemoveAllTodosAccept));

    expect(screen.queryByTestId(TEST_ID.alertRemoveAllTodos)).toBeNull();
    expect(screen.queryAllByTestId(TEST_ID.todoItemUncompleted).length).toBe(0);
  });
});
