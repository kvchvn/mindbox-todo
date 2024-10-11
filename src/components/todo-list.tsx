import { TrashIcon } from "@radix-ui/react-icons";
import { Badge, Checkbox, IconButton } from "@radix-ui/themes";
import clsx from "clsx";
import { useDispatchContext, useStateContext } from "../context";
import { ActionType, State, Todo } from "../types";

type Props = {
  type: Extract<keyof State, "completedTodos" | "uncompletedTodos">;
};

export const TodoList = ({ type }: Props) => {
  const dispatch = useDispatchContext();
  const state = useStateContext();

  const isCompleted = type === "completedTodos";

  const handleChangeTodoStatus = ({ todo, completed }: { todo: Todo; completed: boolean }) => {
    dispatch({ type: ActionType.CHANGE_STATUS, payload: { todo, completed } });
  };

  const handlePrepareToRemove = (todo: Todo) => {
    dispatch({ type: ActionType.PREPARE_TO_REMOVE_TODO, payload: todo });
  };

  if (state.tab === "completed" && !isCompleted) {
    return null;
  }

  if (state.tab === "uncompleted" && isCompleted) {
    return null;
  }

  if (state.tab !== "all" && !state[type].length) {
    return <li className="self-center text-slate-400 dark:text-slate-400 text-sm">No todos</li>;
  }

  if (!isCompleted && !state.completedTodos.length && !state.uncompletedTodos.length) {
    return <li className="self-center text-slate-400 dark:text-slate-400 text-sm">No todos</li>;
  }

  return state[type].map((todo) => (
    <li
      key={todo.id}
      className="flex justify-between items-center px-2 py-2 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-lg group"
    >
      <label className="flex items-center gap-2 cursor-pointer w-full">
        <Checkbox
          checked={isCompleted}
          size="3"
          variant="classic"
          onClick={() => handleChangeTodoStatus({ todo, completed: isCompleted })}
        />
        {todo.priority && (
          <Badge
            color={isCompleted ? undefined : "ruby"}
            variant={isCompleted ? "outline" : "soft"}
          >
            Priority
          </Badge>
        )}
        <span className={clsx(isCompleted && "line-through opacity-60")}>{todo.value}</span>
      </label>
      <IconButton
        size="1"
        color="gray"
        onClick={() => handlePrepareToRemove(todo)}
        className="group-hover:opacity-100 opacity-100 sm:opacity-0 mr-2"
      >
        <TrashIcon width={16} height={16} />
      </IconButton>
    </li>
  ));
};
