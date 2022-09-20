<template>
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
              <v-btn @click="removeTodo(todo)" color="red lighten-3" flat icon>
                <v-icon>close</v-icon>
              </v-btn>
            </v-list-tile-action>
          </template>
          <v-text-field
            :value="todo.text"
            @blur="doneEdit($event.target.value, todo)"
            @keyup.enter="doneEdit($event.target.value, todo)"
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
</template>
<script>
import { mapActions } from "vuex";
const filters = {
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
  data() {
    return {
      filters: filters,
      visibility: this.filter,
      editing: false,
    };
  },
  props: {
    filter: {
      type: String,
      default: "",
    },
    todos: {
      type: Array,
      default: () => [],
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
  methods: {
    ...mapActions(["editTodo", "removeTodo", "toggleTodo"]),
    doneEdit(newValue, todo) {
      if (!newValue) {
        this.removeTodo(todo);
      } else if (this.editing) {
        this.editTodo({
          todo,
          value: newValue,
        });
        this.editing = false;
      }
    },
    cancelEdit() {
      this.editing = false;
    },
  },
  computed: {
    remaining() {
      return this.todos.filter((todo) => !todo.done).length;
    },
    progressPercentage() {
      var len = this.todos.length;
      return ((len - this.remaining) * 100) / len;
    },
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
  },
};
</script>
<style lang="stylus">
.todo-item
  .v-list__tile
    height: auto
    padding-top: 12px
    padding-bottom: 12px
  &.editing .v-list__tile
    height: 48px
</style>
