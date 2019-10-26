<template>
  <section>
    <b-container>
      <div class="accounts">
        <b-card-group deck>
          <b-card header="Total Supply" class="text-center">
            <b-card-text>
              <h6>Amount: {{totsupply.balance}}</h6>
            </b-card-text>
          </b-card>

          <b-card header="Checking" class="text-center">
            <b-card-text>
              <h6>Amount: {{checking.balance}}</h6>
            </b-card-text>
          </b-card>

          <b-card header="Mining" class="text-center">
            <b-card-text>
              <h6>Amount: {{mining.balance}}</h6>
            </b-card-text>
          </b-card>
        </b-card-group>

        <div class="mt-3 accounts">
          <b-card-group deck>
            <b-card header="Advisors" class="text-center">
              <b-card-text>
                <h6>Amount: {{advisors.balance}}</h6>
              </b-card-text>
              <template v-slot:footer>
                <b-row>
                  <b-col lg="6" class="pb-2">
                    <b-button size="md" variant="info" @click="addAmount(advisors)">Add Amount</b-button>
                  </b-col>
                  <b-col lg="6" class="pb-2">
                    <b-button size="md" variant="success" @click="outAmount(advisors)">Transfer out</b-button>
                  </b-col>
                </b-row>
              </template>
            </b-card>

            <b-card header="Airdrop" class="text-center">
              <b-card-text>Amount: {{airdrop.balance}}</b-card-text>
              <template v-slot:footer>
                <b-row>
                  <b-col lg="6" class="pb-2">
                    <b-button size="md" variant="info" @click="addAmount(airdrop)">Add Amount</b-button>
                  </b-col>
                  <b-col lg="6" class="pb-2">
                    <b-button size="md" variant="success" @click="outAmount(airdrop)">Transfer out</b-button>
                  </b-col>
                </b-row>
              </template>
            </b-card>

            <b-card header="Team" class="text-center">
              <b-card-text>
                <h6>Amount: {{team.balance}}</h6>
              </b-card-text>
              <template v-slot:footer>
                <b-row>
                  <b-col lg="6" class="pb-2">
                    <b-button size="md" variant="info" @click="addAmount(team)">Add Amount</b-button>
                  </b-col>
                  <b-col lg="6" class="pb-2">
                    <b-button size="md" variant="success" @click="outAmount(team)">Transfer out</b-button>
                  </b-col>
                </b-row>
              </template>
            </b-card>
          </b-card-group>
        </div>
      </div>
    </b-container>
    <!-- add amount modal -->

    <b-modal
      :title="`Add amount to ${activeAdd}`"
      @ok="addAmounttoAcoount"
      v-model="addamountModel"
    >
      <form ref="form">
        <b-form-group
          :label="`Enter Amount for ${activeAdd}`"
          label-for="name-input"
          placeholder="Enter Amount"
        >
          <b-form-input id="name-input" type="number" v-model="newValue" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

    <!-- add amount modal -->

    <b-modal
      :title="`Tranfer Amount from ${activeAdd} Account`"
      @ok="transferAmountOut"
      v-model="amountToWalletPopup"
    >
      <form ref="form">
        <b-form-group
          :label="`Enter Amount  (Max: ${activeOutRange})`"
          label-for="name-input"
          placeholder="Enter Amount"
        >
          <b-form-input id="name-input" type="number" v-model="newOutValue" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="Enter Wallet Address"
          label-for="name-input"
          placeholder="Enter Wallet Address"
        >
          <b-form-input id="name-input" v-model="walletAddr" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { _ } from "vue-underscore";

export default {
  data() {
    return {
      accountWallets: [],
      totsupply: {},
      checking: {},
      team: {},
      advisors: {},
      airdrop: {},
      mining: {},
      activeAdd: "",
      activeOut: "",
      newOutValue: 0,
      activeOutRange: 0,
      walletAddr: "",
      addamountModel: false,
      newValue: "",
      amountToWalletPopup: false
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
      getAccountTypes: "getAccountTypes",
      getWalletBalance: "getWalletBalance",
      tranToAdvisors: "tranToAdvisors",
      tranToAirdrop: "tranToAirdrop",
      tranToTeam: "tranToTeam",
      toggelLoader: "toggelLoader",
      tranFromAdvisors: "tranFromAdvisors",
      tranFromAirdrop: "tranFromAirdrop",
      tranFromTeam: "tranFromTeam"
    }),
    getAccountDatas() {
      let that = this;
      let accountTypes = [
        "totsupply",
        "checking",
        "team",
        "advisors",
        "airdrop",
        "mining"
      ];
      let accountWallets = [];
      _.each(accountTypes, function(type) {
        that
          .getAccountTypes({
            type: type
          })
          .then(res => {
            let obj = {
              account: type,
              address: res.address
            };
            return that.getWalletBalance({ address: res.address });
          })
          .then(wres => {
            that[type] = {
              type: type,
              balance: wres.result
            };
          })
          .catch(err => {
            console.log("error ", err);
          });
      });
      that.accountWallets = accountWallets;
    },
    addAmount(type) {
      let that = this;
      that.activeAdd = type.type;
      that.newValue = "";
      that.addamountModel = true;
    },
    addAmounttoAcoount() {
      let that = this;
      let activeAdd = that.activeAdd;
      let amount = that.newValue;
      if (that.isValid(amount)) {
        that.toggelLoader();
        let data = {
          token: that.userToken,
          amount: amount
        };
        if (activeAdd == "advisors") {
          that
            .tranToAdvisors(data)
            .then(res => {
              that.getAccountDatas();
              that.toggelLoader();
              this.$notify({
                group: "notify",
                type: "success",
                title: "Amount Added",
                text: `${data.amount} added to ${activeAdd} account`
              });
            })
            .catch(err => {
              this.$notify({
                group: "notify",
                type: "error",
                title: "Amount Error",
                text: `${res.message}`
              });
            });
        } else if (activeAdd == "team") {
          that
            .tranToTeam(data)
            .then(res => {
              that.getAccountDatas();
              that.toggelLoader();
              this.$notify({
                group: "notify",
                type: "success",
                title: "Amount Added",
                text: `${data.amount} added to ${activeAdd} account`
              });
            })
            .catch(err => {
              this.$notify({
                group: "notify",
                type: "error",
                title: "Amount Error",
                text: `${res.message}`
              });
            });
        } else if (activeAdd == "airdrop") {
          that
            .tranToAirdrop(data)
            .then(res => {
              that.getAccountDatas();
              that.toggelLoader();
              this.$notify({
                group: "notify",
                type: "success",
                title: "Amount Added",
                text: `${data.amount} added to ${activeAdd} account`
              });
            })
            .catch(err => {
              this.$notify({
                group: "notify",
                type: "error",
                title: "Amount Error",
                text: `${res.message}`
              });
            });
        } else {
        }
      } else {
        this.$notify({
          group: "notify",
          type: "error",
          title: "Invalid Amount"
        });
      }
    },
    outAmount(type) {
      let that = this;
      that.activeOut = type.type;
      that.activeOutRange = type.balance;
      that.newOutValue = "";
      that.walletAddr = "";
      that.amountToWalletPopup = true;
    },
    transferAmountOut() {
      let that = this;
      let activeOut = that.activeOut;
      let newOutValue = that.newOutValue;
      let walletAddr = that.walletAddr;
      if (!that.isValid(newOutValue)) {
        this.$notify({
          group: "notify",
          type: "error",
          title: "Amount Error",
          text: `Invalid Amount`
        });
      } else if (!that.isValid(walletAddr)) {
        this.$notify({
          group: "notify",
          type: "error",
          title: "Wallet Error",
          text: `Invalid Wallet Address`
        });
      } else {
        that.toggelLoader();
        let data = {
          token: that.userToken,
          to: that.walletAddr,
          amount: that.newOutValue
        };
        if (activeOut == "advisors") {
          that
            .tranFromAdvisors(data)
            .then(res => {
              that.getAccountDatas();
              that.toggelLoader();
              this.$notify({
                group: "notify",
                type: "success",
                title: "Amount Transfered",
                text: `${data.amount} Transfered from ${activeOut} account`
              });
            })
            .catch(err => {
              this.$notify({
                group: "notify",
                type: "error",
                title: "Amount Error",
                text: `${res.message}`
              });
            });
        } else if (activeOut == "team") {
          that
            .tranFromTeam(data)
            .then(res => {
              that.getAccountDatas();
              that.toggelLoader();
              this.$notify({
                group: "notify",
                type: "success",
                title: "Amount Transfered",
                text: `${data.amount} Transfered from ${activeOut} account`
              });
            })
            .catch(err => {
              this.$notify({
                group: "notify",
                type: "error",
                title: "Amount Error",
                text: `${err.message}`
              });
            });
        } else if (activeOut == "airdrop") {
          that
            .tranFromAirdrop(data)
            .then(res => {
              that.getAccountDatas();
              that.toggelLoader();
              this.$notify({
                group: "notify",
                type: "success",
                title: "Amount Transfered",
                text: `${data.amount} Transfered from ${activeOut} account`
              });
            })
            .catch(err => {
              this.$notify({
                group: "notify",
                type: "error",
                title: "Amount Error",
                text: `${err.message}`
              });
            });
        } else {
        }
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
  watch: {
    newOutValue(newVal, oldVal) {
      let that = this;
      let range = that.activeOutRange;
      if (Number(newVal) > Number(range)) {
        this.$notify({
          group: "notify",
          type: "error",
          title: "Amount Error",
          text: "Invalid Amount"
        });
      }
    }
  },
  mounted() {
    this.getAccountDatas();
  }
};
</script>

<style scoped>
</style>