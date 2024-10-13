import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import { LS_KEY } from "./constants";

const resources: Resource = {
  en: {
    translation: {
      "input placeholder": "What needs to be done?",
      add: "Add",
      priority: "Priority",
      all: "all",
      completed: "completed",
      uncompleted: "uncompleted",
      remove: "Remove",
      todos: "todos",
      "no todos": "No todos",
      warning: "Warning",
      "remove todo?": "Are you sure you want to remove the todo?",
      "remove todos?": "Are you sure you want to remove",
      cancel: "Cancel",
      accept: "Remove",
      jade: "jade",
      bronze: "bronze",
      indigo: "indigo",
    },
  },
  ru: {
    translation: {
      "input placeholder": "Что вы хотите сделать?",
      add: "Добавить",
      priority: "Приоритет",
      all: "все",
      completed: "завершённые",
      uncompleted: "незавершённые",
      remove: "Удалить",
      todos: "задачи",
      "no todos": "Нет задач",
      warning: "Внимание",
      "remove todo?": "Вы уверены, что хотите удалить задачу?",
      "remove todos?": "Вы уверены, что хотите удалить",
      cancel: "Отмена",
      accept: "Удалить",
      jade: "нефрит",
      bronze: "бронза",
      indigo: "индиго",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem(LS_KEY.lang) ?? "en",
  interpolation: {
    escapeValue: false,
  },
});
