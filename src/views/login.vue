<template>
  <div class="loginPage">
    <b-card title="Please Login" img-top tag="article" style="width: 20rem;" class="mb-2">
      <b-form>
        <b-form-group id="input-group-1" label="Username:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.username"
            type="text"
            placeholder="Enter Username"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            v-model="form.password"
            placeholder="Enter Password"
          ></b-form-input>
        </b-form-group>
        <b-button variant="success" size="lg" block @click="onSubmitLogin">Submit</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "home",
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIN: "getLoginStatus",
      userToken: "getUserToken"
    })
  },
  methods: {
    ...mapActions({
      userLogin: "userLogin",
      toggelLoader: "toggelLoader"
    }),
    onSubmitLogin() {
      let that = this;
      let username = that.form.username;
      let password = that.form.password;
      if (!that.isValid(username)) {
        this.$notify({
          group: "notify",
          type: "error",
          title: "Invalid credentials",
          text: "Username required"
        });
      } else if (!that.isValid(password)) {
        this.$notify({
          group: "notify",
          type: "error",
          title: "Invalid credentials",
          text: "Password required"
        });
      } else {
      that.toggelLoader()
        let data = {
          username: username,
          password: password
        }
        that.userLogin(data).then((res) => {
      that.toggelLoader()

        }).catch((err) => {
      that.toggelLoader()
          this.$notify({
          group: "notify",
          type: "error",
          title: "Login Error",
          text: err.message
        });
        })
      }
    },
    isValid(value) {
      if (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
<style scoped>
.loginPage {
  width: 100vw;
  height: 100vh;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #3a338c;
}
</style>