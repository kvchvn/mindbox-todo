import { Heading, ScrollArea } from "@radix-ui/themes";
import { ClearTodosAlert } from "./components/clear-todos-alert";
import { Confetti } from "./components/confetti";
import { Container } from "./components/container";
import { Input } from "./components/input";
import { ProgressBar } from "./components/progress-bar";
import { RemoveTodoAlert } from "./components/remove-todo-alert";
import { ResetButton } from "./components/reset-button";
import { Settings } from "./components/settings";
import { Tabs } from "./components/tabs";
import { ThemeProvider } from "./components/theme-provider";
import { TodoList } from "./components/todo-list";
import { ContextProvider } from "./context";

function App() {
  return (
    <ContextProvider>
      <ThemeProvider>
        <main className="bg-slate-200 dark:bg-slate-500 h-dvh overflow-hidden dark:text-slate-100 flex justify-center">
          <Container>
            {" "}
            <Heading as="h1" className="font-title text-3xl">
              todo-list
            </Heading>
            <Tabs />
            <Input />
            <ProgressBar />
            <ScrollArea scrollbars="vertical" type="auto" className="h-64">
              <ul className="flex flex-col self-stretch">
                <TodoList type="uncompletedTodos" />
                <TodoList type="completedTodos" />
              </ul>
            </ScrollArea>
            <ResetButton />
          </Container>
        </main>
        <RemoveTodoAlert />
        <ClearTodosAlert />
        <Settings />
        <Confetti />
      </ThemeProvider>
    </ContextProvider>
  );
}

export default App;
