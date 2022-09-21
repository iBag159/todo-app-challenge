<template>
  <v-card-actions class="px-3">
    <span class="primary--text">
      {{ remaining }} {{ remaining | pluralize("item") }} left
    </span>
    <v-spacer></v-spacer>
    <v-btn-toggle class="elevation-0" mandatory v-model="visibility">
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
</template>
<script>
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
      visibility: this.filter,
    };
  },
  props: {
    filter: {
      type: String,
      default: "all",
    },
    filters: {
      type: Object,
      default: () => {},
    },
    remaining: {
      type: Number,
      default: 0,
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
  watch: {
    visibility(newVisibility) {
      this.$emit("update-visibility", newVisibility);
    },
  },
};
</script>
