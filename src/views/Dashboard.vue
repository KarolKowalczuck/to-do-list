<script>
import { toDoListsApiMixin } from "@/api/toDoList";

export default {
  mixins: [toDoListsApiMixin],
  data() {
    return {
      toDoLists: [],
    };
  },
  methods: {
    async getLists() {
      try {
        const { data } = await this.list();
        this.toDoLists = data;
        console.log(data);
      } catch (err) {
        alert("Error");
      }
    },
  },
  mounted() {
    this.getLists();
  },
};
</script>

<template>
  <v-card v-for="list in toDoLists" :key="list.id">
    <v-card-title>{{ list.title }}</v-card-title>
  </v-card>
</template>
