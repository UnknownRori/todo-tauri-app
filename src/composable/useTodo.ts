import { provide, ref, onMounted } from "vue";
import { invoke } from '@tauri-apps/api';

import TodoType from "@/types/TodoType";

function reorderTodo(todos: Array<TodoType>): Array<TodoType> {
    let temp: Array<TodoType> = [];

    temp = temp.concat(todos.filter((todo) => {
        return !todo.is_completed;
    }));

    temp = temp.concat(todos.filter((todo) => {
        return todo.is_completed;
    }));

    return temp;
}

type UpdateTodoIsCompleteProvider = (id: number) => Promise<void>;
type CreateTodoProvider = (body: string) => Promise<void>;
type DestroyTodoProvider = (id: number) => Promise<void>;

export type { UpdateTodoIsCompleteProvider, CreateTodoProvider, DestroyTodoProvider };

export default function (todos?: Array<TodoType>) {
    const currentIndex = ref(0);
    const todoArray = ref(todos ?? []);

    if (todos) {
        let temp = 0;

        todoArray.value.map(function (todo: TodoType) {
            temp = todo.id;
        });

        currentIndex.value = temp;
        todoArray.value = reorderTodo(todoArray.value);
    }

    provide('update:todo:is_completed', async function (id: number) {
        todoArray.value.map(function (todo: TodoType) {
            if (todo.id == id) {
                todo.is_completed = !todo.is_completed;
                return;
            }
        })

        todoArray.value = reorderTodo(todoArray.value);

        await invoke('save_todos', {
            todos: todoArray.value,
        });
    });

    provide('destroy:todo', async function (id: number) {
        todoArray.value = todoArray.value.filter(function (todo) {
            return todo.id != id;
        });

        todoArray.value = reorderTodo(todoArray.value);

        await invoke('save_todos', {
            todos: todoArray.value,
        });
    });

    provide('create:todo', async function (body: string) {

        currentIndex.value++;

        todoArray.value.push({
            id: currentIndex.value,
            body: body,
            is_completed: false,
        });

        todoArray.value = reorderTodo(todoArray.value);

        await invoke('save_todos', {
            todos: todoArray.value,
        });
    })

    onMounted(async () => {
        await invoke('save_todos', {
            todos: todoArray.value,
        });
    })

    return todoArray;
}
