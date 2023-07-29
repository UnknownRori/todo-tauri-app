<script setup lang="ts">
import Layout from '@/layout/Layout.vue'
import TodoList from '@/components/TodoList.vue';
import useTodo from '@/composable/useTodo';
import TodoDummyData from '@/data/TodoDummyData';

const todoArray = useTodo(TodoDummyData);

</script>

<template>
  <Layout>
    <h2 class='font-sans text-center text-2xl'>
      Todo Tauri App
    </h2>

    <div class="w-full flex flex-col gap-4">
      <TodoList :todos='todoArray' />
    </div>
  </Layout>
</template>