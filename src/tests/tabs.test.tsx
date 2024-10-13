import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";
import App from "../App";
import { TEST_ID } from "../lib/constants";
import { createTodo } from "./utils/helpers";

describe("tabs", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("change active tab", async () => {
    const TODOS_COUNT = 3;

    for (let i = 0; i < TODOS_COUNT; i++) {
      await createTodo();
    }

    await userEvent.click(screen.getAllByTestId(TEST_ID.checkboxCompleteTodo)[0]);

    expect(screen.getAllByTestId(TEST_ID.todoItemCompleted).length).toBe(1);
    expect(screen.getAllByTestId(TEST_ID.todoItemUncompleted).length).toBe(TODOS_COUNT - 1);

    expect(screen.getByTestId(TEST_ID.tabAll)).toBeChecked();
    expect(screen.getByTestId(TEST_ID.tabCompleted)).not.toBeChecked();
    expect(screen.getByTestId(TEST_ID.tabUncompleted)).not.toBeChecked();

    // go onto "completed" tab
    await userEvent.click(screen.getByTestId(TEST_ID.tabCompleted));

    expect(screen.getByTestId(TEST_ID.tabAll)).not.toBeChecked();
    expect(screen.getByTestId(TEST_ID.tabCompleted)).toBeChecked();
    expect(screen.getByTestId(TEST_ID.tabUncompleted)).not.toBeChecked();

    expect(screen.getAllByTestId(TEST_ID.todoItemCompleted).length).toBe(1);
    // no uncompleted todos in the list of completed these ones
    expect(screen.queryAllByTestId(TEST_ID.todoItemUncompleted).length).toBe(0);

    // go onto "uncompleted" tabs
    await userEvent.click(screen.getByTestId(TEST_ID.tabUncompleted));

    expect(screen.getByTestId(TEST_ID.tabAll)).not.toBeChecked();
    expect(screen.getByTestId(TEST_ID.tabCompleted)).not.toBeChecked();
    expect(screen.getByTestId(TEST_ID.tabUncompleted)).toBeChecked();

    // no completed todos
    expect(screen.queryAllByTestId(TEST_ID.todoItemCompleted).length).toBe(0);
    expect(screen.getAllByTestId(TEST_ID.todoItemUncompleted).length).toBe(TODOS_COUNT - 1);
  });

  test("clear all only completed todos", async () => {
    const TODOS_COUNT = 3;

    for (let i = 0; i < TODOS_COUNT; i++) {
      await createTodo();
    }

    // first of all we have {TODOS_COUNT} uncompleted todos
    expect(screen.getAllByTestId(TEST_ID.todoItemUncompleted).length).toBe(TODOS_COUNT);

    await userEvent.click(screen.getAllByTestId(TEST_ID.checkboxCompleteTodo)[0]);

    // one completed todo
    expect(screen.getAllByTestId(TEST_ID.todoItemCompleted).length).toBe(1);
    expect(screen.getAllByTestId(TEST_ID.todoItemUncompleted).length).toBe(TODOS_COUNT - 1);

    await userEvent.click(screen.getByTestId(TEST_ID.tabCompleted));

    // there are no uncompleted todos
    expect(screen.queryAllByTestId(TEST_ID.todoItemUncompleted).length).toBe(0);

    // show the alert
    await userEvent.click(screen.getByTestId(TEST_ID.buttonRemoveAllTodos));
    // accept the action
    await userEvent.click(screen.getByTestId(TEST_ID.alertRemoveAllTodosAccept));
    // so there are already no completed todos
    expect(screen.queryAllByTestId(TEST_ID.todoItemCompleted).length).toBe(0);

    // return to "all" tab
    await userEvent.click(screen.getByTestId(TEST_ID.tabAll));

    // at last we have {TODOS_COUNT - 1} the rest todos
    expect(screen.queryAllByTestId(TEST_ID.todoItemUncompleted).length).toBe(TODOS_COUNT - 1);
  });
});
