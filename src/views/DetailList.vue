<script>
import { toDoListsApiMixin } from "@/api/toDoList";
import { itemsApiMixin } from "@/api/itens";

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
    async deleteList() {
      try {
        await this.remove(this.listId);
        this.$router.push("/dashboard");
      } catch (err) {
        console.log(err);
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
      <v-container>
        <h1 class="font-weight-medium text-brown-darken-1 ml-4 mb-4">
          {{ listTitle }}</h1>
      </v-container>

      <v-container>
        <v-card v-if="items.length > 0">
          <template v-for="(item, i) in items" :key="`${i}-${item.text}`">
            <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
            <v-list-item>
              <template v-slot:prepend>
                <v-checkbox-btn
                  @change="updatedTask(item)"
                  v-model="item.done"
                  color="teal-lighten-2"
                ></v-checkbox-btn>
              </template>
              <v-list-item-title>
                <span :class="item.done ? 'text-grey' : 'text-primary'">
                  {{ item.title }}
                </span>
              </v-list-item-title>
              <template v-slot:append>
                <v-icon v-if="item.done" color="teal-lighten-2">mdi-check</v-icon>
              </template>
            </v-list-item>
          </template>
        </v-card>
        <br />

        <v-btn>
          <router-link :to="`/edit-list/${listId}`">Edit</router-link>
        </v-btn>
        <v-btn @click="setupModal(deleteList)">
          Delete
          <v-dialog v-model="dialog" activator="parent" width="auto">
            <v-card>
              <v-card-text>
                <h3>Delete List</h3>
                <p>Tem certeza que quer deletar a Lista '{{ listTitle }}'?</p>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="dialog = false">No</v-btn>
                <v-btn @click="deleteList">Yes</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
        <v-btn>
          <router-link to="/dashboard">Home </router-link>
        </v-btn>
      </v-container>

      <Modal v-show="showModal">
        <div class="modal-content">
          <h3>Deletar Lista</h3>
          <p>Tem certeza que quer deletar a Lista '{{ listTitle }}'?</p>

          <div class="modal-actions">
            <button class="btn-cancelar" @click="setupModal">cancelar</button>
            <button class="btn-confirmar" @click="deleteList">confirmar</button>
          </div>
        </div>
      </Modal>
    </v-card>
  </v-sheet>
</template>
