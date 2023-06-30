<script>
import { toDoListsApiMixin } from "@/api/toDoList";
import ToDoList from "@/components/ToDo.vue";
import Loading from "@/components/Loading.vue";

export default {
  mixins: [toDoListsApiMixin],
  data() {
    return {
      toDoLists: [],
      listTitle: "",
      listId: this.$route.params.id,
      loading: false,
    };
  },
  components: {
    ToDoList,
    Loading,
  },
  methods: {
    async getLists() {
      this.loading = true;
      try {
        const { data } = await this.list();
        this.toDoLists = data;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getLists();
  },
};
</script>
<template>
   <Loading v-if="loading"></Loading>
  <v-sheet
    class="d-flex align-center justify-center overflow-hidden bg-brown-lighten-5"
    rounded
    height="100vh"
  >
    <v-card
      class="d-md-xxl-mx-auto px-6 py-6 bg-grey-lighten-5"
      height="80vh"
      width="70vw"
      rounded="xl"
      elevation="16"
    >
      <p class="text-h5 font-weight-medium text-brown-darken-1 ml-6 mb-4">
        Your Lists:
      </p>
      <v-divider/>
      <v-card 
      class="bg-transparent overflow-auto mt-4" 
      elevation="0"
      height="78%">
        <div
          v-for="list in toDoLists"
          :key="list.id"
          class="titulos mx-auto ma-5"
          width="90%"
        >
          <v-hover v-slot="{ isHovering, props }" open-delay="200">
            <v-card
              :elevation="isHovering ? 8 : 4"
              :class="{ 'on-hover': isHovering }"
              class="mx-auto bg-brown-lighten-5"
              height="100%"
              max-width="95%"
              rounded="lg"
              v-bind="props"
            >
              <router-link
                class="text-decoration-none text-pink-lighten-3"
                :to="`/list-detail/${list.id}`"
              >
                <v-card-title> {{ list.title }}</v-card-title>
              </router-link>
            </v-card>
          </v-hover>
        </div>
      </v-card>
      <br/>
      <v-divider />
      <br/>
      <div
      class="d-flex justify-end">
        <v-btn
        class="rounded-xl"
        color="teal-lighten-3"
        size="large"
        variant="elevated"
        elevation="4"
        height="50px"
        width="200px"
        >
        <router-link 
        class="text-decoration-none text-white font-weight-bold"
        to="/create-list">criar</router-link>
      </v-btn>
    </div>
    </v-card>
  </v-sheet>
</template>

<style scoped>
.titulos {
  height: 55px;
}
::-webkit-scrollbar {
  width: 10px;
  box-shadow: inset 0 0 2px #F8BBD0;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  background: #F8BBD0;
  border-radius: 5px;
}
</style>
