<script></script>

<template>
  <div
    class="d-flex align-center justify-center h-100 overflow-hidden bg-grey-lighten-5"
  >
    <v-container class="container d-flex flex-column align-center justify-center text-center fill-height">
      <img src="../components/images/coffecroqui.png" class="image" />
      <h1 class="text-brown-lighten-1">To do list</h1>

      <v-row class="links d-flex align-center justify-center">
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
    </v-container>
  </div>
</template>

<style scoped>
h1 {
  font-family: "Architects Daughter", cursive;
  font-size: 140px;
  font-weight: lighter;
  z-index: 2;
  margin-top: 300px;
  padding-bottom: 0px;
}

.link {
  font-size: 1.7rem;
  padding-left: 15px;
  padding-right: 15px;
}
.container{
  overflow: hidden;
  position: relative;
  height: 100vh;
  width: 100vw;
}
.image {
  width: 100%;
  height: auto;
  margin-bottom: 50px;
  opacity: 8%;
  z-index: 1;

  position: absolute;
}

@media (max-width: 500px) {
  h1 {
    font-size: 70px;
    margin-top: 120px;
  }
  .link {
    font-size: 1rem;
  }
}
</style>
