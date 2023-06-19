<template>
  <div
    class="d-flex align-center justify-center h-100 overflow-hidden bg-grey-lighten-5"
  >
    <v-responsive class="align-center justify-center text-center fill-height">
      <h1 class="text-brown-lighten-2">To do list</h1>
      <br />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <router-link
            to="/new-account"
            class="text-pink-lighten-3 font-weight-regular text-decoration-none text-h5"
          >
            Sign Up
          </router-link>
        </v-col>

        <v-col cols="auto">
          <router-link
            to="/login"
            class="text-pink-lighten-3 font-weight-regular text-decoration-none text-h5"
            >Login</router-link
          >
        </v-col>
      </v-row>
    </v-responsive>
  </div>
</template>

<script setup></script>

<style scoped>
h1 {
  font-family: "Architects Daughter", cursive;
  font-size: 120px;
  font-weight: lighter;
}
</style>
