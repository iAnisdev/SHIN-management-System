<template>
  <section class="container">
    <b-container>
      <b-container>
        <b-card header="Direct Transfer" style="width: 50vw; margin:auto">
          <b-card-body>
            <b-container>
              <b-row class="my-1">
                <b-col sm="12" style="text-align: left">
                  <label for="input-large">Wallet Address:</label>
                  <b-form-input
                    id="input-large"
                    size="lg"
                    v-model="walletAddr"
                    placeholder="Enter Wallet Address"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="12" style="text-align: left">
                  <label for="input-large">Amount:</label>
                  <b-form-input
                    id="input-large"
                    v-model="amount"
                    size="lg"
                    placeholder="Enter Amount"
                  ></b-form-input>
                </b-col>
              </b-row>

              <div style="margin-top: 5vh">
                <b-button block variant="primary" pill size="lg" @click="transfer">Transfer</b-button>
              </div>
            </b-container>
          </b-card-body>
        </b-card>
      </b-container>
    </b-container>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      walletAddr: "",
      amount: "",
      ttype: ""
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
      transferToUser: "transferToUser",
      toggelLoader: "toggelLoader"
    }),

    transfer() {
      console.log("clicked");
      let that = this;
      if (!that.isValid(that.walletAddr)) {
        this.$notify({
          group: "notify",
          type: "error",
          title: "Wallet Error",
          text: `Invalid Wallet Address`
        });
      } else if (!that.isValid(that.amount)) {
        this.$notify({
          group: "notify",
          type: "error",
          title: "Amount Error",
          text: "Invalid Amount"
        });
      } else {
        that.toggelLoader();
        let data = {
          token: that.userToken,
          to: that.walletAddr,
          amount: that.amount,
          type: "other"
        };
        that
          .transferToUser(data)
          .then(res => {
            that.walletAddr = "";
            that.amount = "";
            that.toggelLoader();
            this.$notify({
              group: "notify",
              type: "success",
              title: "Amount Transfered",
              text: `${data.amount} Transfered to ${data.to}`
            });
          })
          .catch(err => {
            that.toggelLoader();
            this.$notify({
              group: "notify",
              type: "error",
              title: "Transfer Error",
              text: `${err.message}`
            });
          });
      }
    },
    isValid(value) {
      if (
        value == 0 ||
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
  },
  mounted() {
    let that = this;
    let walletAddr = this.$router.history.current.query.walletAddr;
    if (walletAddr) {
      that.walletAddr = walletAddr;
    }
  }
};
</script>

<style scoped>
</style>