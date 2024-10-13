### simple todo-app  
___  
_Bundler:_ vite  
_Key stack:_ react + typescript  
_State management:_ react context + useReducer  
_UI:_ radix-ui + tailwindcss  
  
A few words about the app:  
- uses `localStorage` to persist todos after page reload
- supports keyboard events to quickly and without excess motions create todos using as laptop as phone
- theme(light/dark) switching
- color theme switching
- language switching (en, ru)
- filtering todos by status: all, uncompleted, completed
- ability to mark a todo as prior
- all main functionality is covered with unit-tests (`npm run test:coverage`)

To run the app locally:
- `cd app`
- `npm i`
- `npm run start`  
_P.S. Be sure you have installed node.js on your device._
