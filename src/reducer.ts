import { ActionType, State, Todo, TodoAction } from "./types";

export const reducer = (state: State, action: TodoAction): State => {
  const { type, payload } = action;

  console.log({ action });

  switch (type) {
    case ActionType.ADD_TODO:
      return {
        ...state,
        uncompletedTodos: payload.priority
          ? [payload, ...state.uncompletedTodos]
          : [...state.uncompletedTodos, payload],
      };

    case ActionType.SET_INPUT_VALUE:
      return {
        ...state,
        inputValue: payload,
      };

    case ActionType.REMOVE_TODO: {
      let isFound = false;
      const updatedCompletedTodos: Todo[] = [];
      const updatedUncompletedTodos: Todo[] = [];

      for (const t of state.completedTodos) {
        if (t.id === payload) {
          isFound = true;
        } else {
          updatedCompletedTodos.push(t);
        }
      }

      if (!isFound) {
        for (const t of state.uncompletedTodos) {
          if (t.id !== payload) {
            updatedUncompletedTodos.push(t);
          }
        }

        return {
          ...state,
          uncompletedTodos: updatedUncompletedTodos,
        };
      }

      return {
        ...state,
        completedTodos: updatedCompletedTodos,
      };
    }

    case ActionType.CHANGE_STATUS: {
      const updatedTodos: Todo[] = [];
      const todos = payload.completed ? state.completedTodos : state.uncompletedTodos;

      for (const t of todos) {
        if (t.id !== payload.todo.id) {
          updatedTodos.push(t);
        }
      }

      if (payload.completed) {
        return {
          ...state,
          completedTodos: updatedTodos,
          uncompletedTodos: payload.todo.priority
            ? [payload.todo, ...state.uncompletedTodos]
            : [...state.uncompletedTodos, payload.todo],
        };
      } else {
        return {
          ...state,
          completedTodos: payload.todo.priority
            ? [payload.todo, ...state.completedTodos]
            : [...state.completedTodos, payload.todo],
          uncompletedTodos: updatedTodos,
        };
      }
    }

    case ActionType.SET_TAB:
      return {
        ...state,
        tab: payload,
      };

    case ActionType.PREPARE_TO_REMOVE_TODO:
      return {
        ...state,
        prepareToRemoveTodo: payload,
      };

    case ActionType.CHANGE_THEME:
      return {
        ...state,
        theme: payload,
      };

    case ActionType.CHANGE_COLOR:
      return {
        ...state,
        color: payload,
      };

    case ActionType.PREPARE_TO_CLEAR_TODOS:
      return {
        ...state,
        prepareToClearTodos: payload,
      };

    case ActionType.CLEAR_TODOS:
      return {
        ...state,
        completedTodos: payload === "all" || payload === "completed" ? [] : state.completedTodos,
        uncompletedTodos:
          payload === "all" || payload === "uncompleted" ? [] : state.uncompletedTodos,
      };
  }
};
