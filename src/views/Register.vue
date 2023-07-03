<script>
import { authApiMixin } from "@/api/auth";
export default {
  mixins: [authApiMixin],
  data: () => ({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordtest: "",
    show1: false,
    loading: false,
    form: false,
    rules: {
      required: (value) => !!value || "Required",
      fullName: (value) =>
        !!value.includes(" ") || "You must enter a full name!",
      noSpace: (value) => !value.includes(" ") || "No spaces",
      min: (v) => v.length >= 8 || "Minimum 8 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),
  methods: {
    confirmPassword() {
      if (this.passwordtest !== this.password) return "Passwords do not match";
      return true;
    },
    confirmUserName(value) {
      if (value.toLowerCase() !== value) return "Only lower case";
      return true;
      // (v) =>
      //     /^[a-z]+$/.test(v) || "Username must contain only lowercase letters",
      //   (v) => !/\s/.test(v) || "Username must not contain spaces",
    },
    passwordRules(value) {
      const senhaRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      if (!senhaRegex.test(value)) {
        return "Password must be at least 8 characters long, contain at least 1 special character and 1 number";
      }
      return true;
    },
    async handleSubmit() {
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      try {
        await this.register(payload);
        alert("User successfully created!");
        this.$router.push("/login");
      } catch (err) {
        const status = err.response.status;
        if (status >= 500 && status < 600) {
          alert("Server error!");
        } else {
          console.log(err);
        }
      }
    },
  },
};
</script>

<template>
  <div
    class="d-flex align-center justify-center flex-column bg-brown-lighten-5 h-100 overflow-hidden"
  >
    <v-card
      class="card bg-gret-lighten-5 text-brown-darken-1 px-6"
      rounded="xl"
      elevation="16"
      width="550"
    >
      <p class="text-brown-darken-1 pl-3 pt-8 pb-2 text-h4 font-weight-medium">
        Create new account
      </p>

      <v-container>
        <v-form v-model="form">
          <v-text-field
            v-model="name"
            :rules="[rules.required, rules.fullName]"
            label="Name"
            placeholder="Enter your full name"
            variant="underlined"
            color="pink-lighten-3"
            class="text-brown-darken-4"
          ></v-text-field>

          <v-text-field
            v-model="username"
            :rules="[rules.required, rules.noSpace, confirmUserName]"
            label="Username"
            placeholder="Enter your username"
            variant="underlined"
            color="pink-lighten-3"
            class="text-brown-darken-4"
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="Email"
            variant="underlined"
            color="pink-lighten-3"
            class="text-brown-darken-4"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.noSpace, passwordRules]"
            :type="show1 ? 'text' : 'password'"
            hint="At least 8 characters"
            label="Password"
            color="pink-lighten-3"
            variant="underlined"
            class="text-brown-darken-4"
            @click:append-inner="show1 = !show1"
          ></v-text-field>

          <v-text-field
            v-model="passwordtest"
            :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, confirmPassword]"
            :type="show1 ? 'text' : 'password'"
            label="Confirm Password"
            variant="underlined"
            color="pink-lighten-3"
            class="text-brown-darken-4"
            @click:append-inner="show1 = !show1"
          ></v-text-field>
        </v-form>
      </v-container>

      <v-divider class="mx-6 my-2"/>

      <v-card-actions class="py-4 px-16">
        <v-btn
          :disabled="!form"
          block
          color="teal-lighten-3"
          size="large"
          type="submit"
          variant="elevated"
          class="rounded-xl font-weight-bold text-white text-h7"
          elevation="4"
          height="55px"
          @click="handleSubmit"
        >
          SIGN UP
        </v-btn>
      </v-card-actions>

      <v-divider class="mx-6 my-2"/>

      <v-card-actions
        class="text-body-1 d-flex flex-column align-center justify-center"
      >
        <p class="text-brown-darken-1">Alredy have an account?</p>
        <router-link
          to="./login"
          class="text-pink-lighten-2 text-decoration-none"
        >
          Log In
        </router-link>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.card {
  margin: auto;
}

@media (max-width: 500px) {
  .card {
    max-width: 350px;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    max-height: 550px;
    overflow: auto;
  }
}
</style>
