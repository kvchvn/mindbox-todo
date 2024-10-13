import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";
import App from "../App";
import { TEST_ID } from "../lib/constants";

const TEXT = "blablabla";

describe("input", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("check elements existence", () => {
    const input = screen.getByTestId<HTMLInputElement>(TEST_ID.inputWriteNewTodo);
    const checkbox = screen.getByTestId<HTMLButtonElement>(TEST_ID.priorityToggle);
    const button = screen.getByTestId<HTMLButtonElement>(TEST_ID.buttonCreateNewTodo);

    expect(input).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("check user typing", async () => {
    const input = screen.getByTestId<HTMLInputElement>(TEST_ID.inputWriteNewTodo);

    await userEvent.type(input, TEXT);

    expect(input).toHaveValue(TEXT);
  });

  test("check fields clearing after submit", async () => {
    const input = screen.getByTestId<HTMLInputElement>(TEST_ID.inputWriteNewTodo);
    const button = screen.getByTestId<HTMLButtonElement>(TEST_ID.buttonCreateNewTodo);

    await userEvent.type(input, TEXT);
    // test click by 'Enter' key
    await userEvent.keyboard("[Enter]");
    expect(input).toHaveValue("");

    // with empty input field button is disabled
    expect(button).toBeDisabled();

    await userEvent.type(input, TEXT);
    expect(input).toHaveValue(TEXT);
    expect(button).not.toBeDisabled();

    // test click by button (appearing only on small resolutions)
    await userEvent.click(button);
    expect(input).toHaveValue("");
  });

  test("check priority toggle", async () => {
    const input = screen.getByTestId<HTMLInputElement>(TEST_ID.inputWriteNewTodo);
    const checkbox = screen.getByTestId<HTMLButtonElement>(TEST_ID.priorityToggle);
    const button = screen.getByTestId<HTMLButtonElement>(TEST_ID.buttonCreateNewTodo);

    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    await userEvent.type(input, TEXT);

    expect(checkbox).toBeChecked();

    await userEvent.click(button);

    // checkbox should be reset to initial state (not checked)
    expect(checkbox).not.toBeChecked();
  });
});
