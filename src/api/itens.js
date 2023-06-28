import { privateApi } from "./index";

export const itemsApiMixin = {
  methods: {
    async list(){
      return await privateApi.get("/items");
    },
    async createItem(item) {
      return await privateApi.post("/items/new", item);
    },
    async removeItem(itemId) {
      return await privateApi.delete(`/items/${itemId}`);
    },
    async updateItem(itemId, item) {
      return await privateApi.patch(`/items/${itemId}`, item);
    },
  },
};