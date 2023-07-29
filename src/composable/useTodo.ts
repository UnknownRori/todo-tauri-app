import TodoType from "@/types/TodoType";
import { provide, ref } from "vue";

function reorderTodo(todos: Array<TodoType>): Array<TodoType> {
    let temp: Array<TodoType> = [];

    temp = temp.concat(todos.filter((todo) => {
        return !todo.isCompleted;
    }));

    temp = temp.concat(todos.filter((todo) => {
        return todo.isCompleted;
    }));

    return temp;
}

type UpdateTodoIsCompleteProvider = (id: number) => void;
type CreateTodoProvider = (body: string) => void;
type DestroyTodoProvider = (id: number) => void;

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

    provide('update:todo:isCompleted', function (id: number) {
        todoArray.value.map(function (todo: TodoType) {
            if (todo.id == id) {
                todo.isCompleted = !todo.isCompleted;
                return;
            }
        })

        todoArray.value = reorderTodo(todoArray.value);
    });

    provide('destroy:todo', function (id: number) {
        todoArray.value = todoArray.value.filter(function (todo) {
            return todo.id != id;
        });

        todoArray.value = reorderTodo(todoArray.value);
    });

    provide('create:todo', function (body: string) {

        currentIndex.value++;

        todoArray.value.push({
            id: currentIndex.value,
            body: body,
            isCompleted: false,
        });
    })

    return todoArray;
}