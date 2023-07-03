<script>
import { toDoListsApiMixin } from "@/api/toDoList";
import { itemsApiMixin } from "@/api/itens";
import Loading from "@/components/Loading.vue";

export default {
  mixins: [toDoListsApiMixin, itemsApiMixin],
  data() {
    return {
      items: [],
      title: "",
      newItem: null,
      listTitle: "",
      listId: this.$route.params.id,
      dialog: false,
      loading: false,
    };
  },
  components: {
    Loading,
  },
  methods: {
    async showList() {
      this.loading = true;
      try {
        const { data } = await this.view(this.listId);
        this.items = data.items;
        this.listTitle = data.title;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    async deleteList() {
      this.loading = true;
      try {
        await this.remove(this.listId);
        this.$router.push("/dashboard");
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    async updatedTask(item) {
      try {
        let updatetask = {
          done: item.done,
        };
        await this.updateItem(item.id, updatetask);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.showList();
  },
};
</script>

<template>
  <Loading v-if="loading"></Loading>
  <v-sheet
    class="d-flex flex-column align-center justify-center overflow-auto bg-brown-lighten-5"
    rounded
    height="100vh"
  >
    <v-card
      class="bg-grey-lighten-5 text-brown-darken-1 ma-4"
      rounded="xl"
      elevation="16"
      width="80vw"
      height="80vh"
    >
      <div>
        <h1
          class="d-flex align-end font-weight-medium text-brown-darken-1 ml-12 mt-4"
        >
          <img src="../components/images/coffee.png" height="55" class="pr-2" />
          {{ listTitle }}
        </h1>
      </div>
      <v-divider class="mt-6 mx-8" />
      <v-card
        class="card bg-transparent overflow-y-auto mx-4"
        height="70%"
        width="90%"
        elevation="0"
        v-if="items.length > 0"
      >
        <template v-for="(item, i) in items" :key="`${i}-${item.text}`">
          <div class="d-flex flex-row align-center justify-center">
            <img src="../components/images/cafe.png" height="30" class="mr-3" />
            <!-- <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider> -->
            <v-list-item
              class="itens mb-6 mt-6 text-pink-lighten-"
              height="6vh"
              elevation="3"
              rounded="xl"
              width="80%"
            >
              <template v-slot:prepend>
                <v-checkbox-btn
                  @change="updatedTask(item)"
                  v-model="item.done"
                  color="teal-lighten-2"
                ></v-checkbox-btn>
              </template>
              <v-list-item-title
                :class="
                  item.done
                    ? 'text-grey text-decoration-line-through'
                    : 'text-brown-darken-1'
                "
              >
                {{ item.title }}
              </v-list-item-title>
              <template v-slot:append>
                <v-icon v-if="item.done" color="teal-lighten-2"
                  >mdi-check</v-icon
                >
              </template>
            </v-list-item>
          </div>
        </template>
      </v-card>
      <v-divider class="divider mt-4 mx-8 pb-8" />
      <div class="button d-flex justify-space-between align-center">
        <div class="buttons d-flex justify-start">
          <v-btn
            class="edition rounded-xl ml-4"
            color="white"
            size="large"
            variant="elevated"
            elevation="4"
            height="50px"
            width="150px"
          >
            <router-link
              class="text-decoration-none text-teal-lighten-1"
              :to="`/edit-list/${listId}`"
            >
              Edit Tasks
            </router-link>
          </v-btn>
          <v-btn
            class="edition rounded-xl mx-3 text-decoration-none text-red-lighten-1"
            color="white"
            size="large"
            variant="elevated"
            elevation="4"
            height="50px"
            width="150px"
            @click="setupModal(deleteList)"
          >
            Delete List
            <v-dialog v-model="dialog" activator="parent" width="auto">
              <v-card class="bg-grey-lighten-4" rounded="xl">
                <v-card-text
                  class="d-flex flex-column justify-center align-center"
                >
                  <h3
                    class="text-brown-darken-1 font-weight-medium text-h5 pb-4 mr-6"
                  >
                    Delete List
                  </h3>
                  <p>
                    Are you sure you want to delete the list '{{ listTitle }}'?
                  </p>
                </v-card-text>
                <v-card-actions
                  class="d-flex justify-space-around mx-10 px-14 my-3"
                >
                  <v-btn
                    class="rounded-xl text-brown-darken-3"
                    color="white"
                    size="large"
                    variant="elevated"
                    elevation="4"
                    height="50px"
                    width="50px"
                    @click="dialog = false"
                    >No</v-btn
                  >
                  <v-btn
                    class="rounded-xl mx-3 text-red-lighten-1"
                    color="white"
                    size="large"
                    variant="elevated"
                    elevation="4"
                    height="50px"
                    width="50px"
                    @click="deleteList"
                    >Yes</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-btn>
        </div>
        <v-btn
          class="edition red rounded-xl mx-3"
          color="white"
          size="large"
          variant="elevated"
          elevation="4"
          height="50px"
          width="200px"
        >
          <router-link
            class="text-decoration-none text-brown-darken-1"
            to="/dashboard"
            >Home
          </router-link>
        </v-btn>
      </div>
    </v-card>
  </v-sheet>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
  box-shadow: inset 0 0 2px #f8bbd0;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  background: #f8bbd0;
  border-radius: 5px;
}
@media (max-width: 500px) {
  .card {
    max-height: 45%;
    overflow-y: auto;
  }
  h1 {
    font-size: 25px;
    margin-left: 20px !important;
  }
  .itens {
    margin-bottom: 10px !important;
    margin-top: 10px !important;
  }
  .divider {
    margin-bottom: 2px;
  }
  .button {
    flex-direction: column;
    justify-content: space-around;
    justify-items: center;
    padding-bottom: 10px;
    align-items: center;
    overflow: auto;
  }
  .buttons {
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 2px;
    padding-bottom: 2px;
  }
  .edition {
    margin-bottom: 10px;
    max-height: 40px;
    max-width: 120px;
  }
}
</style>
