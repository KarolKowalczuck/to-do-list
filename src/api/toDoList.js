import { privateApi } from "./index";

export const toDoListsApiMixin = {
  methods: {
    async list() {
      return await privateApi.get("/lists");
    },
    async newList(payload) {
      return await privateApi.post("/lists/new", payload);
    },
  },
};
