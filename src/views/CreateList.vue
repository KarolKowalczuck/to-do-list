<script>
import { toDoListsApiMixin } from "@/api/toDoList";
export default {
  mixins: [toDoListsApiMixin],
  data(){
    return{
      toDoLists: [], //toDoLists vai ser um conjunto de arrays
      title: "",
    };
  }, 
  methods: {
    async getTitle() {
      const payload = {
        title: this.title,
      };
      try {
        await this.newList(payload);
        alert("User successfully created!");
        this.$router.push("/dashboard");
      } catch (err) {
        alert("Error");
      }
  },
},
}

</script>


<template>
<v-text-field
            v-model="title"
            label="Title"
            placeholder="Enter your ToDo title"
            variant="underlined"
            class="text-brown-darken-4"
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
          @click="getTitle"
        >
          Sign Up
        </v-btn>

</template>
