<script></script>

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
            to="/register"
            class="link text-pink-lighten-3 font-weight-regular text-decoration-none"
          >
            Sign Up
          </router-link>
        </v-col>

        <v-col cols="auto">
          <router-link
            to="/login"
            class="link text-pink-lighten-3 font-weight-regular text-decoration-none"
            >Login</router-link
          >
        </v-col>
      </v-row>
    </v-responsive>
  </div>
</template>

<style scoped>
h1 {
  font-family: "Architects Daughter", cursive;
  font-size: 140px;
  font-weight: lighter;
}

.link {
  font-size: 1.7rem;
}

@media (max-width: 500px) {
  h1{
    font-size: 70px;
  }
  .link{
    font-size: 1rem
  }
}
</style>
