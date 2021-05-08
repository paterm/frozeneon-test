<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="$store.state.hits"
      :page="$store.state.page + 1"
      :loading="$store.state.inProgress"
      :server-items-length="$store.state.totalHits"
      :footer-props="{
        'items-per-page-options': [5, 10, 15]
      }"
      :items-per-page="$store.state.hitsPerPage"
      @update:page="handleChangePage"
      @update:items-per-page="handleChangePerPage"
      @click:row="handleClickRow"
      no-results-text="No results..."
      class="elevation-1 mt-8 mb-8"
      disable-filtering
      disable-sort
    />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { TSearchHit, TUnknownObj } from '@/types';
import STORE_TYPES from '@/store/types.store';

const {
  STORE_SET_PAGE,
  STORE_SET_PER_PAGE,
  STORE_SET_ACTIVE_HIT,
} = STORE_TYPES;

export default Vue.extend({
  name: 'Table',

  data(): TUnknownObj {
    return {
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Description',
          value: 'description',
        },
        {
          text: 'Version',
          value: 'version',
        },
        {
          text: 'License',
          value: 'license',
        },
      ],
    };
  },

  methods: {
    handleChangePage(page: number): void {
      if (this.$store.state.page !== page - 1) {
        this.$store.dispatch(STORE_SET_PAGE, page - 1);
      }
    },
    handleChangePerPage(perPage: number): void {
      this.$store.dispatch(STORE_SET_PER_PAGE, perPage);
    },
    handleClickRow(hit: TSearchHit): void {
      this.$store.dispatch(STORE_SET_ACTIVE_HIT, hit);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
