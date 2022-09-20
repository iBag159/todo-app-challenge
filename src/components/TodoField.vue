<template>
  <v-card>
    <v-list class="pa-0">
      <v-list-tile>
        <v-list-tile-action>
          <v-checkbox
            :input-value="allChecked"
            @change="toggleAll"
            color="primary"
            v-if="todos.length > 0"
          ></v-checkbox>
          <v-icon color="primary" v-else>check</v-icon>
        </v-list-tile-action>
        <v-text-field
          :label="'New todo input'"
          @keydown.enter="addNewTodo"
          autofocus
          browser-autocomplete="off"
          clearable
          color="primary"
          flat
          hide-details
          maxlength="1023"
          placeholder="What needs to be done?"
          solo
          v-model="newTodo"
        ></v-text-field>
      </v-list-tile>
    </v-list>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    todos: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      newTodo: "",
    };
  },
  methods: {
    ...mapActions(["toggleAll", "addTodo"]),
    addNewTodo() {
      this.addTodo(this.newTodo);
      this.newTodo = "";
    },
  },
  computed: {
    allChecked() {
      return this.todos.every((todo) => todo.done);
    },
  },
};
</script>

<style lang="stylus">
.v-text-field .v-input__slot
  padding: 0 !important
</style>
