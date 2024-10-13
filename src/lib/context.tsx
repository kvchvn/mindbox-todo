import React, { useContext, useReducer } from "react";
import { COLORS, LS_KEY } from "./constants";
import { reducer } from "./reducer";
import { Colors, State, TodoAction } from "./types";

const FROM_LS = {
  uncompletedTodos: localStorage.getItem(LS_KEY.uncompletedTodos),
  completedTodos: localStorage.getItem(LS_KEY.completedTodos),
  theme: localStorage.getItem(LS_KEY.theme),
  color: localStorage.getItem(LS_KEY.color),
};

export const initialState: State = {
  uncompletedTodos: FROM_LS.uncompletedTodos ? JSON.parse(FROM_LS.uncompletedTodos) : [],
  completedTodos: FROM_LS.completedTodos ? JSON.parse(FROM_LS.completedTodos) : [],
  inputValue: "",
  tab: "all",
  prepareToRemoveTodo: null,
  prepareToClearTodos: false,
  theme:
    FROM_LS.theme === "dark" ||
    (!FROM_LS.theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light",
  color: (FROM_LS.color as Colors | null) ?? (Object.keys(COLORS)[0] as Colors),
};

const DispatchContext = React.createContext<React.Dispatch<TodoAction>>((_: TodoAction) => {});
export const useDispatchContext = () => useContext(DispatchContext);

const TodoContext = React.createContext<State>(initialState);
export const useStateContext = () => useContext(TodoContext);

export const ContextProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodoContext.Provider value={state}>{children}</TodoContext.Provider>
    </DispatchContext.Provider>
  );
};
