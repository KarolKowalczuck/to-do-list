<script>
import { toDoListsApiMixin } from "@/api/toDoList";
import { itemsApiMixin } from "@/api/itens";

export default {
  mixins: [toDoListsApiMixin, itemsApiMixin],
  data() {
    return {
      items: [],
      title: "",
      listTitle: "",
      itemUp: "",
      listId: this.$route.params.id,
    };
  },
  methods: {
    async showList() {
      try {
        const { data } = await this.view(this.listId);
        this.items = data.items;
        this.listTitle = data.title;
      } catch (err) {
        console.log(err);
      }
    },
    async createTask() {
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
      }
    },
    async deleteList() {
      try {
        await this.remove(this.listId);
        this.$router.push("/dashboard");
      } catch (err) {
        console.log(err);
      }
    },
    async deleteTask(itemId) {
      try {
        await this.removeItem(itemId);
        this.showList();
      } catch (err) {
        console.log(err);
      }
    },
    async updatedTask(id, title) {
      // qual tarefa?
      try {
        await this.updateItem(id, { title });
      } catch (err) {
        console.log(err);
      }
    },
    async updateTitle() {
      console.log(this.listId);
      const payload = {
        title: this.listTitle,
      };
      try {
        await this.updateList(this.listId, payload);
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
  <v-sheet
    class="d-flex flex-column justify-center align-center bg-brown-lighten-5"
    height="100vh"
    width="100vw"
  >
    <div>
      <v-card
        class="my-4"
        height="7vh"
        width="70vw"
        rounded="xl"
        elevation="14"
      >
        <v-text-field
          class="bg-grey-lighten-4 py-3 pl-6 pr-12 text-brown-darken-2"
          label="List Title"
          v-model="listTitle"
          color="pink-lighten-2"
          variant="plain"
          append-icon="mdi-check-circle-outline text-brown-darken-5 pb-4"
          @click:append="updateTitle"
        ></v-text-field>
      </v-card>

      <v-card
        class="my-4 text-brown-darken-2 bg-grey-lighten-4"
        width="70vw"
        rounded="xl"
        elevation="14"
      >
        <v-text-field
          class="text-brown-darken-2 bg-transparent pt-6 px-6"
          v-model="title"
          rounded="xl"
          label="New Item"
          color="pink-lighten-3"
          variant="outlined"
          append-inner-icon="mdi-plus-circle mr-4"
          @click:append-inner="createTask"
        >
        </v-text-field>
        <v-divider class="mb-4 mx-8"/>

        <v-card
          class="overflow-auto mx-6 bg-transparent"
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
                  prepend-icon="mdi-coffee-outline text-pink-lighten-3"
                  color="brown-darken-1"
                  append-inner-icon="mdi-check text-teal-darken-1"
                  append-icon="mdi-close text-red-darken-3"
                  @click:append-inner="updatedTask(item.id, item.title)"
                  @click:append="deleteTask(item.id)"
                >
                </v-text-field>
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-card>
        <v-divider class="mt-6 mx-8" />
        <div class="d-flex justify-center my-2">
          <v-btn
          color="grey-lighten-4"
            class="my-4"
            width="15vw"
            height="5vh"
            rounded="xl"
            elevation="8"
          >
            <router-link
              class="text-decoration-none text-teal-darken-1 d-flex justify-center align-center botao"
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
.botao {
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
</style>
