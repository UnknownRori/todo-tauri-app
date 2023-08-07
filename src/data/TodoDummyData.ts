import TodoType from "../types/TodoType";

let TodoDummyData = [
    { id: 1, body: "Hello, Tauri", is_completed: true },
    { id: 2, body: "Finish some stuff", is_completed: false },
    { id: 3, body: "Touch some grass", is_completed: false },
    { id: 4, body: "Sleep", is_completed: false },
] as Array<TodoType>;

export default TodoDummyData;