<template>
  <v-container>
    <v-row justify="center">
      <v-text-field
        autofocus
        @input="debounceInput"
        label="Search of npm packages"
        class="mt-8 search-field"
        background-color="teal lighten-3"
        color="white"
        clearable
        filled
        rounded
      />
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue';
import debounce from 'lodash.debounce';
import types from '../store/types.store';

export default Vue.extend({
  name: 'SearchField',

  data: () => ({
    search: '',
  }),

  methods: {
    debounceInput: debounce(function (text) {
      this.$store.dispatch(types.STORE_UPDATE_INPUT, text);
    }, 500),
  },
});
</script>

<style scoped lang="scss">
.search-field {
  max-width: 90%;
}
</style>
