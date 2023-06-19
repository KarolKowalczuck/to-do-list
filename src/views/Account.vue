<script>
export default {
  data: () => ({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordtest: "",
    show1: false,
    show2: false,
    terms: false,
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
    },
    passwordRules(value) {
      const senhaRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      if (!senhaRegex.test(value)) {
        return "Password must be at least 8 characters long, contain at least 1 special character and 1 number";
      }
      return true;
    },
  },
};
</script>

<template>
  <div
    class="d-flex align-center justify-center flex-column bg-brown-lighten-5 h-100 overflow-hidden"
  >
    <v-card
      class="card mx-auto bg-grey-lighten-5 text-brown-darken-1"
      rounded="xl"
      elevation="16"
      width="550"
    >
      <p class="text-brown-darken-1 pl-5 pt-8 text-h5 font-weight-medium">
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
            class="text-brown-darken-4"
          ></v-text-field>

          <v-text-field
            v-model="username"
            :rules="[rules.required, rules.noSpace, confirmUserName]"
            label="Username"
            placeholder="Enter your username"
            variant="underlined"
            class="text-brown-darken-4"
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="Email"
            variant="underlined"
            class="text-brown-darken-4"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.noSpace, passwordRules]"
            :type="show1 ? 'text' : 'password'"
            hint="At least 8 characters"
            label="Password"
            variant="underlined"
            class="text-brown-darken-4"
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-text-field
            v-model="passwordtest"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, confirmPassword]"
            :type="show2 ? 'text' : 'password'"
            label="Confirm Password"
            variant="underlined"
            class="text-brown-darken-4"
            @click:append="show2 = !show2"
          ></v-text-field>
        </v-form>
        <v-checkbox
          v-model="terms"
          color="teal-lighten-3"
          label="I agree to site terms and conditions"
          class="text-brown-darken-4"
        ></v-checkbox>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions class="py-4 px-16">
        <v-btn
          :disabled="!terms || !form"
          block
          color="teal-lighten-3"
          size="large"
          type="submit"
          variant="elevated"
          class="rounded-xl font-weight-bold text-white"
          elevation="4"
          height="50px"
        >
          Sign Up
        </v-btn>
      </v-card-actions>

      <v-divider></v-divider>

      <v-card-actions
        class="text-body-1 d-flex flex-column align-center justify-space-around px-16 mx-4 pt-4"
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
