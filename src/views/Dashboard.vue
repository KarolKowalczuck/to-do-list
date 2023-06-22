<script>
import { toDoListsApiMixin } from "@/api/toDoList";

export default {
  mixins: [toDoListsApiMixin],
  methods: {
    async getLists() {
      try {
        const { data } = await this.list();
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

<template>Welcome</template>
