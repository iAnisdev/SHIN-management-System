<template>
  <div class="home">
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <b-navbar-brand href="#">
          <img src="@/assets/logo.png" class="logo" srcset />
          <span class="d-none d-md-inline text" style="color: #fff">
            <b>SHIN</b>
          </span>
        </b-navbar-brand>
      </nav>
      <div class="container-fluid">
        <div class="row min-vh-100">
          <aside class="col-12 col-md-2 p-0 bg-dark">
            <nav
              class="navbar navbar-expand navbar-dark bg-dark flex-md-column flex-row align-items-start py-2"
            >
              <div class="collapse navbar-collapse">
                <ul class="flex-md-column flex-row navbar-nav w-100 justify-content-between">
                  <li class="nav-item">
                    <a class="nav-link pl-0" href="/">
                      <v-icon name="home" scale="2" />
                      <span class="d-none d-md-inline text">
                        <b>General</b>
                      </span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link pl-0" href="/transactions">
                      <v-icon name="list-alt" scale="2" />
                      <span class="d-none d-md-inline text">
                        <b>Records</b>
                      </span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link pl-0" href="/accounts">
                      <v-icon name="users" scale="2" />
                      <span class="d-none d-md-inline text">
                        <b>Accounts</b>
                      </span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link pl-0" href="/transfer">
                      <v-icon name="random" scale="2" />
                      <span class="d-none d-md-inline text">
                        <b>Transfer</b>
                      </span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link pl-0" href="/info">
                      <v-icon name="user" scale="2" />
                      <span class="d-none d-md-inline text">
                        <b>User Info</b>
                      </span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link pl-0" @click="logoutAdmin">
                      <v-icon name="sign-out-alt" scale="2" />
                      <span class="d-none d-md-inline text">
                        <b>Logout</b>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </aside>
          <main class="col bg-faded py-3">
            <router-view />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isLoggedIN: "getLoginStatus",
      userToken: "getUserToken"
    })
  },
  methods: {
    ...mapActions({
      getAccountTypes: "getAccountTypes",
      logoutUser: "logoutUser"
    }),
    logoutAdmin(){
      this.logoutUser().then((res) => {
        this.$router.push('/login')
      })
    }
  },
  mounted() {}
};
</script>
<style scoped>
.logo {
  width: 40px;
  height: 48px;
}
.nav-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.text {
  margin-left: 1vw;
}
</style>
