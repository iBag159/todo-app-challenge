<template>
  <v-layout row wrap>
    <v-flex text-xs-center>
      <THeader />
      <slot />
      <TFooter />
    </v-flex>
  </v-layout>
</template>
<script>
import THeader from "@/components/common/THeader";
import TFooter from "@/components/common/TFooter";

export default {
  components: {
    THeader,
    TFooter,
  },
};
</script>
