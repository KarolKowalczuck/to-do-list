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
      listTitle: "",
      itemUp: "",
      listId: this.$route.params.id,
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
    async createTask() {
      this.loading = true;
      try {
        const item = {
          title: this.title,
          listId: this.listId,
        };
        const { data } = await this.createItem(item);
        this.items.push(data);
        this.showList();
      } catch (err) {
        console.log(err);
      } finally {
        this.title = "";
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
    async deleteTask(itemId) {
      this.loading = true;
      try {
        await this.removeItem(itemId);
        this.showList();
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    async updatedTask(id, title) {
      this.loading = true;
      try {
        await this.updateItem(id, { title });
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    async updateTitle() {
      this.loading = true;
      console.log(this.listId);
      const payload = {
        title: this.listTitle,
      };
      try {
        await this.updateList(this.listId, payload);
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
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
    class="sheet d-flex flex-column justify-center align-center bg-brown-lighten-5"
    height="100vh"
    width="100vw"
  >
    <div class="card">
      <v-card
        class="title my-4"
        height="70px"
        width="80vw"
        rounded="xl"
        elevation="14"
      >
        <v-text-field
          class="titleText bg-grey-lighten-4 py-3 pl-6 pr-12 text-brown-darken-2"
          label="List Title"
          v-model="listTitle"
          color="pink-lighten-2"
          variant="plain"
          append-icon="mdi-check-circle-outline text-brown-darken-5 pb-4"
          @click:append="updateTitle"
        ></v-text-field>
      </v-card>

      <v-card
        class="content my-4 text-brown-darken-2 bg-grey-lighten-4"
        width="80vw"
        rounded="xl"
        elevation="14"
      >
        <v-text-field
          class="itemtitle text-brown-darken-2 bg-transparent pt-6 px-6"
          v-model="title"
          rounded="xl"
          label="New Item"
          color="pink-lighten-3"
          variant="outlined"
          append-inner-icon="mdi-plus-circle mr-4"
          @click:append-inner="createTask"
        >
        </v-text-field>
        <v-divider class="mb-4 mx-8" />

        <v-card
          class="carditem overflow-auto mx-6 bg-transparent"
          elevation="0"
          height="60vh"
          v-if="items.length > 0"
        >
          <template v-for="(item, i) in items" :key="`${i}-${item.text}`">
            <v-list-item
              class="mb-5 mt-1 bg-grey-lighten-4 mx-1"
              elevation="4"
              rounded="xl"
              height="6vh"
            >
              <v-list-item-title class="d-flex align-center item mx-3">
                <v-text-field
                  v-model="item.title"
                  variant="plain"
                  color="brown-darken-1"
                  append-inner-icon="mdi-check text-teal-darken-1"
                  append-icon="mdi-close text-red-darken-3"
                  @click:append-inner="updatedTask(item.id, item.title)"
                  @click:append="deleteTask(item.id)"
                >
                  <img
                    src="../components/images/cafe.png"
                    height="30"
                    class="mr-3"
                  />
                </v-text-field>
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-card>
        <v-divider class="mt-6 mx-8" />
        <div class="d-flex justify-center my-2">
          <v-btn
            color="teal-lighten-2"
            class="bttn my-4"
            width="100px"
            height="50px"
            rounded="xl"
            elevation="8"
          >
            <router-link
              class="text-decoration-none text-white d-flex justify-center align-center router"
              @click="updateTitle"
              :to="`/list-detail/${listId}`"
              >Salvar
            </router-link>
          </v-btn>
        </div>
      </v-card>
    </div>
  </v-sheet>
</template>

<style scoped>
.item {
  height: 4vh;
}
.router {
  height: 5vh;
  width: 15vw;
}
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
  .sheet {
    justify-content: start !important;
  }
  .card {
    height: 580px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .title {
    max-height: 60px;
    margin-top: 0 !important;
  }
  .titleText {
    padding-right: 15px !important;
  }
  .content {
    max-height: 90%;
  }
  .itemtitle {
    width: 80vw;
  }
  .carditem {
    overflow: auto;
    max-height: 300px;
    margin-left: 15px !important;
    margin-right: 15px !important;
  }
  .item {
    margin-left: 2px !important;
    margin-right: 1px !important;
  }

}
</style>
