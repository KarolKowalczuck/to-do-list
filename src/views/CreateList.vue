<script>
import { toDoListsApiMixin } from "@/api/toDoList";

export default {
  mixins: [toDoListsApiMixin],
  data() {
    return {
      title: "",
      items: [],
    };
  },
  methods: {
    async CreatList() {
      try {
        const title = {
          title: this.title,
        };
        const { data } = await this.create(title);
        // this.toDoList.push(data);
       this.$router.push("/dashboard")
      } catch (err) {
        console.log(err);
      } finally {
        this.title = "";
      }
    },
  },
};
</script>

<template>
<v-text-field
            v-model="title"
            label="Title"
            placeholder="Enter your ToDo title"
            variant="underlined"
            class="text-brown-darken-4"
            @keydown.enter="CreatList"
          ></v-text-field>

          <v-btn
          block
          color="teal-lighten-3"
          size="large"
          type="submit"
          variant="elevated"
          class="rounded-xl font-weight-bold text-white"
          elevation="4"
          height="50px"
          @click="CreatList"
        >
          Sign Up
        </v-btn>
</template>
