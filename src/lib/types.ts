import { themePropDefs } from "@radix-ui/themes/props";

export enum ActionType {
  ADD_TODO = "ADD_TODO",
  CHANGE_STATUS = "CHANGE_STATUS",
  PREPARE_TO_REMOVE_TODO = "PREPARE_TO_REMOVE_TODO",
  REMOVE_TODO = "REMOVE_TODO",
  SET_INPUT_VALUE = "SET_INPUT_VALUE",
  SET_TAB = "SET_TAB",
  CHANGE_THEME = "CHANGE_THEME",
  CHANGE_COLOR = "CHANGE_COLOR",
  PREPARE_TO_CLEAR_TODOS = "PREPARE_TO_CLEAR_TODOS",
  CLEAR_TODOS = "CLEAR_TODOS",
}

export type Todo = {
  id: string;
  value: string;
  priority: boolean;
};

export type Theme = "dark" | "light";

export type Colors = (typeof themePropDefs)["accentColor"]["values"] extends readonly (infer Key)[]
  ? Key
  : never;

export type Languages = "en" | "ru";

export type Tab = "all" | "completed" | "uncompleted";

export type TodoAction =
  | {
      type: ActionType.ADD_TODO;
      payload: Todo;
    }
  | {
      type: ActionType.CHANGE_STATUS;
      payload: { todo: Todo; completed: boolean };
    }
  | {
      type: Extract<ActionType, ActionType.REMOVE_TODO | ActionType.SET_INPUT_VALUE>;
      payload: string;
    }
  | {
      type: ActionType.SET_TAB;
      payload: Tab;
    }
  | {
      type: ActionType.PREPARE_TO_REMOVE_TODO;
      payload: Todo | null;
    }
  | {
      type: ActionType.CHANGE_THEME;
      payload: Theme;
    }
  | {
      type: ActionType.CHANGE_COLOR;
      payload: Colors;
    }
  | {
      type: ActionType.PREPARE_TO_CLEAR_TODOS;
      payload: boolean;
    }
  | {
      type: ActionType.CLEAR_TODOS;
      payload: Tab;
    };

export type State = {
  inputValue: string;
  completedTodos: Todo[];
  uncompletedTodos: Todo[];
  tab: Tab;
  prepareToRemoveTodo: Todo | null;
  prepareToClearTodos: boolean;
  theme: Theme;
  color: Colors;
};
