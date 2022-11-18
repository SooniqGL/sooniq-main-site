<script lang="ts">
// give each todo a unique id
let id = 0

export default {
  data() {
    return {
      message: 'Hello World!',
      counter: {
        count: 0
      }, 
      titleClass: 'title',
      text: '',
      awesome: true,
      newTodo: '',
      todos: [
        { id: id++, text: 'Learn HTML' },
        { id: id++, text: 'Learn JavaScript' },
        { id: id++, text: 'Learn Vue' }
      ]
    }
  },
  methods: {
    increment() {
      this.counter.count++
    },
    toggle() {
      this.awesome = !this.awesome
    },
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo })
      this.newTodo = ''
    },
    removeTodo(todo: { id: number; text: string }) {
      this.todos = this.todos.filter((t) => t !== todo)
    }
  }
}
</script>

<template>
  <h1 :class="titleClass">{{ message }}</h1>
  <button @click="increment">count is: {{ counter.count }}</button>
  <input v-model="text" placeholder="Type here">
  <p>{{ text }}</p>

  <button @click="toggle">toggle</button>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>

  <form @submit.prevent="addTodo">
    <input v-model="newTodo">
    <button>Add Todo</button>    
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
</template>

<style>
.title {
  color: red;
}
</style>