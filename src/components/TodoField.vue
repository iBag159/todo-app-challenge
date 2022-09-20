<template>
  <v-card>
    <v-list class="pa-0">
      <v-list-tile>
        <v-list-tile-action>
          <v-checkbox
            :input-value="allChecked"
            @change="toggleCheckbox"
            color="primary"
            v-if="todos.length > 0"
          ></v-checkbox>
          <v-icon color="primary" v-else>check</v-icon>
        </v-list-tile-action>
        <v-text-field
          :label="'New todo input'"
          @keydown.enter="addTodo"
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
export default {
  data() {
    return {
      newTodo: "",
    };
  },
  props: {
    todos: {
      type: Array,
      default: () => [],
    },
    allChecked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleCheckbox() {
      this.$emit("toggle-all");
    },
    addTodo() {
      this.$emit("add-todo", this.newTodo);
      this.newTodo = "";
    },
  },
};
</script>
