import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import { TEST_ID } from "../../lib/constants";

export const createTodo = async (text: string = "blablabla", priority: boolean = false) => {
  const input = screen.getByTestId<HTMLInputElement>(TEST_ID.inputWriteNewTodo);
  const checkbox = screen.getByTestId<HTMLButtonElement>(TEST_ID.priorityToggle);

  await userEvent.type(input, text);

  if (priority) {
    await userEvent.keyboard("{Control>}{p}{/Control}");
    expect(checkbox).toBeChecked();
  }

  await userEvent.keyboard("[Enter]");
};
