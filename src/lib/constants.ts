import { Colors, Languages } from "./types";

export const TEST_ID = {
  inputWriteNewTodo: "input-write-new-todo",
  buttonCreateNewTodo: "button-create-new-todo",
  priorityToggle: "priority-toggle",
  todoList: "todo-list",
  todoItemUncompleted: "todo-item-uncompleted",
  todoItemCompleted: "todo-item-completed",
  checkboxCompleteTodo: "checkbox-complete-todo",
  todoItemPriorityBadge: "todo-item-priority-badge",
  noTodos: "no-todos",
  buttonRemoveTodo: "button-remove-todo",
  alertRemoveTodo: "alert-remove-todo",
  alertRemoveTodoAccept: "alert-remove-todo-accept",
  alertRemoveTodoCancel: "alert-remove-todo-cancel",
  buttonRemoveAllTodos: "button-remove-all-todos",
  alertRemoveAllTodos: "alert-remove-all-todos",
  alertRemoveAllTodosAccept: "alert-remove-all-todos-accept",
  alertRemoveAllTodosCancel: "alert-remove-all-todos-cancel",
  tabAll: "taball",
  tabCompleted: "tab-completed",
  tabUncompleted: "tab-uncompleted",
} as const;

export const LS_KEY = {
  completedTodos: "completedTodos",
  uncompletedTodos: "uncompletedTodos",
  theme: "theme",
  color: "color",
  lang: "lang",
} as const;

export const COLORS: Partial<Record<Colors, { en: string; ru: string }>> = {
  jade: { en: "jade", ru: "нефрит" },
  bronze: { en: "bronze", ru: "бронза" },
  indigo: { en: "indigo", ru: "индиго" },
};

export const LANGUAGES: Record<Languages, string> = {
  en: "English",
  ru: "Русский",
};
