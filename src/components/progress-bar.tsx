import { Progress } from "@radix-ui/themes";
import { useStateContext } from "../lib/context";

export const ProgressBar = () => {
  const state = useStateContext();

  const progress =
    (state.completedTodos.length / (state.completedTodos.length + state.uncompletedTodos.length)) *
    100;

  if (!state.completedTodos.length && !state.uncompletedTodos.length) {
    return null;
  }

  return (
    <Progress value={progress} variant="classic" className="w-[95%] grow-0 dark:border-slate-100" />
  );
};
