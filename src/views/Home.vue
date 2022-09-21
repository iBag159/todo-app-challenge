<template>
  <Layout>
    <TodoField :todos="todos" />
    <!-- main -->
    <TodoList :filter="filter" :todos="todos" />
    <v-btn
      @click="clearCompleted"
      block
      class="mt-3"
      color="primary"
      depressed
      round
      v-show="todos.length > remaining"
    >
      Clear completed
    </v-btn>
    <!-- footer -->
  </Layout>
</template>

<script>
import { mapActions } from "vuex";
import Layout from "@/components/layout/Layout";
import TodoField from "@/components/TodoField";
import TodoList from "@/components/TodoList";

export default {
  props: ["filter"],
  data() {
    return {
      visibility: this.filter,
      editing: false,
    };
  },
  directives: {
    focus(el, value, context) {
      if (value.value) {
        context.context.$nextTick(function () {
          return context.context.$refs.input.focus();
        });
      }
    },
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    remaining() {
      return this.todos.filter((todo) => !todo.done).length;
    },
  },
  methods: {
    ...mapActions(["clearCompleted"]),
  },
  components: {
    Layout,
    TodoField,
    TodoList,
  },
};
</script>
