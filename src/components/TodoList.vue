<template>
  <v-list class="pa-0">
    <template v-for="todo in todos">
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
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      editing: false,
    };
  },
  props: {
    todos: {
      type: Array,
      default: () => [],
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
