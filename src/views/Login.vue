<script>
import { setupPrivateApi } from "@/api";
import { authApiMixin } from "@/api/auth";
export default {
  mixins: [authApiMixin],
  data: () => ({
    form: false,
    email: "",
    password: "",
    loading: false,
    show1: false,
    show2: true,
    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) => value.length <= 20 || "Max 20 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),

  methods: {
    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    async handleSubmit() {
      const payload = {
        email: this.email,
        password: this.password,
      };

      try {
        const { data } = await this.login(payload);
        const { access_token } = data;
        setupPrivateApi(access_token);
        localStorage.setItem("access_token", access_token);

        alert("deu boa!");
        console.log(payload);
        console.log(data);
        this.$router.push("/dashboard");

      } catch (err) {
        alert("Server error");
      }
    },
  },
};
</script>

<template>
  <v-sheet
    class="d-flex align-center justify-center overflow-hidden bg-brown-lighten-5 h-100"
    rounded
  >
    <v-card
      class="d-md-xxl-mx-auto px-6 py-8 bg-grey-lighten-5 mx-4"
      height="450"
      width="550"
      rounded="xl"
      elevation="16"
    >
      <p class="text-brown-lighten-1 text-h5 font-weight-medium">Log In</p>
      <br />
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[rules.required, rules.email]"
          class="mb-2 text-brown-darken-2"
          clearable
          label="Email"
          append-icon="mdi-account-outline"
          variant="outlined"
          type="email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          placeholder="Enter your password"
          class="input-group--focused text-brown-darken-2"
          variant="outlined"
          @click:append="show1 = !show1"
        ></v-text-field>

        <br />
        <v-divider></v-divider>

        <div class="px-16 py-4">
          <v-btn
            :disabled="!form"
            :loading="loading"
            block
            class="rounded-xl font-weight-bold text-white"
            color="teal-lighten-3"
            size="large"
            type="submit"
            variant="elevated"
            elevation="4"
            height="50px"
            @click="handleSubmit"
          >
            Log In
          </v-btn>
        </div>

        <v-divider></v-divider>

        <br />
        <div
          class="footer text-body-1 d-flex flex-column align-center justify-space-around mx-4 mb-4 pb-4"
        >
          <p class="text-brown-darken-1">Don't have an account?</p>
          <router-link
            to="./register"
            class="text-pink-lighten-2 text-decoration-none"
          >
            Sign Up
          </router-link>
        </div>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<style scoped>
.footer {
  padding-left: 3rem;
  padding-right: 3rem;
}
@media (max-width: 500px) {
  .footer {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
