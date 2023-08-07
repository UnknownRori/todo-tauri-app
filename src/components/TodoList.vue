<script setup lang='ts'>
import { inject, ref, TransitionGroup } from "vue";

import TodoItem from "./TodoItem.vue";
import type { CreateTodoProvider } from '@/composable/useTodo';
import TodoType from '@/types/TodoType';

defineProps<{
    todos: Array<TodoType>,
}>();

const input = ref('');
const addTodoProvider = inject('create:todo') as CreateTodoProvider;

function addTodo() {
    if (input.value == '')
        return

    addTodoProvider(input.value);
    input.value = '';
}
</script>

<template>
    <form @submit.prevent='() => addTodo()' class='rounded-md flex flex-row gap-2 justify-center items-center'>
        <div class='flex bg-gray-700 border-[1px] border-gray-600 p-2 rounded-md'>
            <input type="text" v-model='input' class='bg-transparent'>
            <button type='submit'>
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>
    </form>

    <ul class='relative flex flex-col gap-4 min-w-full items-center justify-center mx-auto p-2 mb-20'>
        <TransitionGroup name='list' tag='li' class='flex flex-col relative gap-4'>
            <TodoItem v-for='todo in todos' :todo='todo' :key='todo.id' />
        </TransitionGroup>
    </ul>
</template>

<style scoped>
.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}
</style>
