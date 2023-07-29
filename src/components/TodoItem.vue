<script setup lang='ts'>
import { inject } from 'vue';

import { DestroyTodoProvider, UpdateTodoIsCompleteProvider } from '@/composable/useTodo';
import TodoType from '@/types/TodoType';

defineProps<{
    todo: TodoType,
}>();

const toggleComplete = inject('update:todo:isCompleted') as UpdateTodoIsCompleteProvider;
const destroyTodoProvider = inject('destroy:todo') as DestroyTodoProvider;
</script>

<template>
    <li class='flex flex-row justify-between gap-2 w-80 cursor-pointer
         bg-slate-700 rounded-md p-2 hover:bg-slate-500 duration-300'>
        <button @click='() => toggleComplete($props.todo.id)'
            :class='`w-8 h-6 p-[0.1rem] self-center ${$props.todo.isCompleted ? "bg-green-700 hover:bg-green-500" : "bg-red-700 hover:bg-red-500"} rounded - md shadow - md`'>
            <span>
                <svg v-if='$props.todo.isCompleted' class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
                <svg v-else class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </span>
        </button>

        <p :class='`w-full h-full break-word ${$props.todo.isCompleted ? "line-through" : ""}`'>
            {{ $props.todo.body }}
        </p>

        <button>
            <span>
                <svg class="h-4 w-4 text-white" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                    <line x1="16" y1="5" x2="19" y2="8" />
                </svg>
            </span>
        </button>

        <button class='w-8 h-6 p-[0.1rem] self-center bg-red-700 hover:bg-red-500 rounded-md shadow-md'
            @click='() => destroyTodoProvider($props.todo.id)'>
            <span>
                <svg class="h-5 w-5 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
            </span>
        </button>
    </li>
</template>