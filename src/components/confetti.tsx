import ReactConfetti from "react-confetti";
import { useStateContext } from "../lib/context";

export const Confetti = () => {
  const state = useStateContext();

  if (state.uncompletedTodos.length || !state.completedTodos.length) {
    return null;
  }

  return (
    <ReactConfetti
      recycle={false}
      numberOfPieces={600}
      gravity={0.2}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};
