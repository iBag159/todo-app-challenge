<template>
  <Layout>
    <TodoField
      v-on:add-todo="addTodo"
      :all-checked="allChecked"
      :todos="todos"
      v-on:toggle-all="toggleAll"
    />
    <!-- main -->
    <v-card class="mt-3" v-show="todos.length">
      <v-progress-linear class="my-0" v-model="progressPercentage" />
      <v-card-actions class="px-3" v-show="todos.length">
        <span class="primary--text">
          {{ remaining }} {{ remaining | pluralize("item") }} left
        </span>
        <v-spacer></v-spacer>
        <v-btn-toggle
          class="elevation-0"
          mandatory
          v-model="visibility"
          v-show="todos.length"
        >
          <v-btn
            :key="key"
            :to="key"
            :value="key"
            class="mx-0"
            color="primary"
            flat
            small
            v-for="(val, key) in filters"
          >
            {{ key | capitalize }}
          </v-btn>
        </v-btn-toggle>
      </v-card-actions>
      <v-list class="pa-0">
        <template v-for="todo in filteredTodos">
          <v-divider :key="`${todo.uid}-divider`"></v-divider>
          <v-list-tile
            :key="todo.uid"
            class="todo-item"
            :class="{ editing: editing }"
          >
            <v-list-tile-action>
              <v-checkbox
                :input-value="todo.done"
                @change="toggleTodo(todo)"
                color="primary"
                v-if="!!!editing"
              ></v-checkbox>
              <v-icon color="primary" v-else>edit</v-icon>
            </v-list-tile-action>
            <template v-if="!!!editing">
              <v-list-tile-content
                :class="{ 'primary--text': todo.done }"
                @dblclick="editing = true"
              >
                {{ todo.text }}
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn
                  @click="removeTodo(todo)"
                  color="red lighten-3"
                  flat
                  icon
                >
                  <v-icon>close</v-icon>
                </v-btn>
              </v-list-tile-action>
            </template>
            <v-text-field
              :value="todo.text"
              @blur="doneEdit"
              @keyup.enter="doneEdit"
              @keyup.esc="cancelEdit"
              clearable
              color="primary"
              flat
              hide-details
              maxlength="1023"
              ref="input"
              solo
              v-else
              v-focus="editing"
            ></v-text-field>
          </v-list-tile>
        </template>
      </v-list>
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
import vuex from "vuex";
import Layout from "@/components/layout/Layout";
import TodoField from "@/components/TodoField";

var filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      console.log("INGRESÓ A ACTIVE");
      return !todo.done;
    });
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.done;
    });
  },
};

function filterFunction(n, w) {
  console.log("holaaa");
  if (n === 1) {
    return w;
  } else {
    return w + "s";
  }
}

export default {
  props: ["filter"],
  data() {
    return {
      filters: filters,
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
    allChecked() {
      return this.todos.every((todo) => todo.done);
    },
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return this.todos.filter((todo) => !todo.done).length;
    },
    progressPercentage() {
      var len = this.todos.length;
      return ((len - this.remaining) * 100) / len;
    },
  },
  methods: {
    ...vuex.mapActions([
      "toggleAll",
      "clearCompleted",
      "editTodo",
      "removeTodo",
      "toggleTodo",
    ]),
    addTodo(newTodo) {
      var text = newTodo.trim();
      if (text) {
        this.$store.dispatch("addTodo", text);
      }
    },
    doneEdit(e) {
      var value = e.target.value.trim();
      var todo = this.todo;
      if (!value) {
        this.removeTodo(todo);
      } else if (this.editing) {
        this.editTodo({
          todo,
          value,
        });
        this.editing = false;
      }
    },
    cancelEdit() {
      this.editing = false;
    },
  },
  filters: {
    pluralize: function (n, w) {
      console.log("TODO");
      return filterFunction(n, w);
    },
    capitalize: function (s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
  },
  components: {
    Layout,
    TodoField,
  },
};
</script>

<style lang="stylus">
.v-text-field .v-input__slot
  padding: 0 !important

.todo-item
  .v-list__tile
    height: auto
    padding-top: 12px
    padding-bottom: 12px
  &.editing .v-list__tile
    height: 48px
</style>
