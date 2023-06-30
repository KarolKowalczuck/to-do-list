<script>
import { toDoListsApiMixin } from "@/api/toDoList";

export default {
  mixins: [toDoListsApiMixin],
  data() {
    return {
      title: "",
      items: [],
      rules: {
        required: (value) => !!value || "Required.",
      },
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
        this.$router.push("/dashboard");
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
  <v-sheet
    class="d-flex align-center justify-center overflow-hidden bg-brown-lighten-5"
    rounded
    height="100vh"
  >
    <v-card
      class="bg-grey-lighten-5 text-brown-darken-1 ma-4"
      rounded="xl"
      elevation="16"
      width="60vw"
      height="30vh"
    >
    <v-card-title
    class="text-h5 ma-5">
      Choose a name for your list
    </v-card-title>
      <v-text-field
        v-model="title"
        :rules="[rules.required]"
        label="List Title"
        variant="underlined"
        color="pink-lighten-2"
        class="titulo text-brown-darken-4 mx-8 mt-4"
        width="90%"
      ></v-text-field>
      <div class="d-flex justify-space-between mt-8 mx-8">
        <v-btn
          class="rounded-xl"
          size="large"
          variant="elevated"
          elevation="4"
          height="50px"
          width="200px"
        >
          <router-link
            to="/dashboard"
            class="text-decoration-none text-brown-darken-1"
          >
            Cancel
          </router-link>
        </v-btn>
        <v-btn
          :disabled="!title"
          class="rounded-xl"
          color="teal-lighten-2"
          size="large"
          variant="elevated"
          elevation="4"
          height="50px"
          width="200px"
          @click="CreatList"
        >
          Save
        </v-btn>
      </div>
    </v-card>
  </v-sheet>
</template>

<style scoped>
.titulo {
  height: 90px;
}
</style>
