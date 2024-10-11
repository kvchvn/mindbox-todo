import React, { useContext, useReducer } from "react";
import { reducer } from "./reducer";
import { State, TodoAction } from "./types";

export const initialState: State = {
  uncompletedTodos: localStorage.uncompletedTodos ? JSON.parse(localStorage.uncompletedTodos) : [],
  completedTodos: localStorage.completedTodos ? JSON.parse(localStorage.completedTodos) : [],
  inputValue: "",
  tab: "all",
  prepareToRemoveTodo: null,
  prepareToClearTodos: false,
  theme:
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light",
  color: localStorage.color ?? "jade",
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
