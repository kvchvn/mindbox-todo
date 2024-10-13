import React, { useEffect } from "react";
import { LS_KEY } from "../constants";
import { useStateContext } from "../context";

export const Container = ({ children }: React.PropsWithChildren) => {
  const state = useStateContext();

  useEffect(() => {
    localStorage.setItem(LS_KEY.completedTodos, JSON.stringify(state.completedTodos));
    localStorage.setItem(LS_KEY.uncompletedTodos, JSON.stringify(state.uncompletedTodos));
  }, [state.completedTodos.length, state.uncompletedTodos.length]);

  return (
    <section className="flex w-full mx-2 my-8 flex-col xs:my-16 items-center gap-5 xs:max-w-[420px] rounded-xl px-4 pt-8 pb-4 xs:px-6 xs:pt-10 bg-white dark:bg-slate-600 h-fit">
      {children}
    </section>
  );
};
