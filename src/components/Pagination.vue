<template>
  <v-pagination
    :length="$store.state.totalPages"
    :value="$store.state.page + 1"
    circle
  />
</template>

<script>
export default {
  name: 'Pagination',
};
</script>

<style scoped>

</style>
