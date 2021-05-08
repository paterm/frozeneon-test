<template>
  <v-app>
    <v-main>
      <SearchField />
      <Table :hits="$store.state.hits" />
      <Dialog :activeHit="$store.state.activeHit" />
    </v-main>

    <v-footer>
      <Footer />
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchField from '@/components/SearchField.vue';
import Table from '@/components/Table.vue';
import Dialog from '@/components/Dialog.vue';
import Footer from '@/components/Footer.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Footer,
    Dialog,
    Table,
    SearchField,
  },

  data: () => ({
    search: '',
  }),
});
</script>
