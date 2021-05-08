<template>
  <v-dialog
    max-width="500px"
    :value="activeHit"
    @input="handleInput"
  >
    <v-card v-if="activeHit">
      <v-card-title>
        <v-img
          :src="activeHit.owner.avatar"
          max-width="16"
          max-height="16"
          class="mr-4"
        />
        {{ activeHit.name }}
      </v-card-title>

      <v-card-text>
        <p class="mb-8">{{ activeHit.description }}</p>

        <v-row align="center" class="mb-4">
          <v-chip color="blue-grey" outlined>
            <v-icon class="mr-2">mdi-scale-balance</v-icon>
            {{ activeHit.license }}
          </v-chip>

          <v-btn
            :href="activeHit.homepage"
            target="_blank"
            text
            color="primary"
          >
            <v-icon class="mr-2">mdi-open-in-new</v-icon>
            <span>Home Page</span>
          </v-btn>

          <v-btn
            :href="`https://github.com/${activeHit.githubRepo.user}/${activeHit.githubRepo.project}`"
            target="_blank"
            text
            color="primary"
          >
            <v-icon class="mr-2">mdi-github</v-icon>
            <span>GitHub</span>
          </v-btn>
        </v-row>

        <v-row>
          <v-chip-group
            show-arrows
          >
            <v-chip
              v-for="item in activeHit.keywords"
              :key="item"
              outlined
              color="teal"
              class="mr-2 mb-2"
              small
            >
              <v-icon
                class="mr-2"
                small
              >
                mdi-tag
              </v-icon>
              {{ item }}
            </v-chip>
          </v-chip-group>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="primary"
          text
          @click="() => handleInput(false)"
          class="ml-auto"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import STORE_TYPES from '@/store/types.store';

const { STORE_SET_ACTIVE_HIT } = STORE_TYPES;

export default Vue.extend({
  props: ['activeHit'],

  name: 'Dialog',

  methods: {
    handleInput(isOpen: boolean) {
      if (!isOpen) {
        this.$store.dispatch(STORE_SET_ACTIVE_HIT, null);
      }
    },
  },
});
</script>

<style scoped>

</style>
