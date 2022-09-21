<template>
  <Layout>
    <TodoField :todos="todos" />
    <!-- main -->
    <v-card class="mt-3" v-show="todos.length">
      <v-progress-linear class="my-0" v-model="progressPercentage" />
      <TodoControls
        v-on:update-visibility="updateVisibility"
        :filters="filters"
        :filter="filter"
        :remaining="remaining"
      />
      <TodoList :todos="filteredTodos" />
    </v-card>
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
import TodoControls from "@/components/TodoControls.vue";

const filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter((t) => !t.done);
  },
  completed: function (todos) {
    return todos.filter((t) => t.done);
  },
};

export default {
  props: ["filter"],
  data() {
    return {
      filters: filters,
      visibility: this.filter,
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
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    progressPercentage() {
      var len = this.todos.length;
      return ((len - this.remaining) * 100) / len;
    },
    remaining() {
      return this.filters["active"](this.todos).length;
    },
  },
  methods: {
    ...mapActions(["clearCompleted"]),
    updateVisibility(newVisibility) {
      this.visibility = newVisibility;
    },
  },
  components: {
    Layout,
    TodoField,
    TodoList,
    TodoControls,
  },
};
</script>
