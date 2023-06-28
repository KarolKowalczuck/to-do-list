import { publicApi } from "./index";

export const authApiMixin = {
  methods: {
    async register(payload) {
      const res = await publicApi.post("/auth/register", payload);
      return res;
    },
    async login(payload) {
      const res = await publicApi.post("/auth/login", payload);
      return res;
    },
    // async creat(payload) {
    //   const res = await publicApi.post("/auth/creat", payload);
    //   return res;
    // },
  },
};
