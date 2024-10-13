import { PlusIcon } from "@radix-ui/react-icons";
import { Badge, Checkbox, IconButton, Kbd, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { TEST_ID } from "../lib/constants";
import { useDispatchContext, useStateContext } from "../lib/context";
import { ActionType, Todo } from "../lib/types";

export const Input = () => {
  const { t } = useTranslation();

  const dispatch = useDispatchContext();
  const state = useStateContext();
  const [priority, setPriority] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.SET_INPUT_VALUE, payload: e.target.value });
  };

  const handleCreateTodo = () => {
    if (!state.inputValue) {
      return;
    }

    const newTodo: Todo = {
      id: uuidv4(),
      value: state.inputValue,
      priority,
    };

    dispatch({ type: ActionType.ADD_TODO, payload: newTodo });
    dispatch({ type: ActionType.SET_INPUT_VALUE, payload: "" });
    setPriority(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.code === "Enter") {
      handleCreateTodo();
    }

    if (e.ctrlKey && (e.key === "p" || e.code === "KeyP")) {
      e.preventDefault();
      setPriority(!priority);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <TextField.Root
        placeholder={t("input placeholder")}
        size="3"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={state.inputValue}
        maxLength={40}
        className="w-full"
        data-testid={TEST_ID.inputWriteNewTodo}
      >
        <TextField.Slot side="right">
          <Kbd onClick={handleCreateTodo} className="hidden sm:block">
            Enter
          </Kbd>
          <IconButton
            size="1"
            onClick={handleCreateTodo}
            disabled={!state.inputValue}
            className="sm:hidden"
            data-testid={TEST_ID.buttonCreateNewTodo}
          >
            <PlusIcon width={16} height={16} />
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
      <label className="flex items-center gap-1">
        <Checkbox
          size="3"
          color="ruby"
          variant="classic"
          checked={priority}
          onCheckedChange={() => setPriority(!priority)}
          data-testid={TEST_ID.priorityToggle}
        />
        <p className="text-sm flex gap-1 items-center">
          <span className="lowercase">{t("add")}</span>
          <Badge color="ruby">{t("priority")}</Badge>
        </p>
        <Kbd>Ctrl+P</Kbd>
      </label>
    </div>
  );
};
