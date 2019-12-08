<template>
  <section>
    <b-container>
      <b-card header="Track User" style="width: 50vw; margin:auto" v-if="!isSearched">
        <b-card-body>
          <b-row class="my-1">
            <b-col sm="12" style="text-align: left">
              <label for="input-large">Search User By:</label>
              <b-form-select
                v-model="selected"
                :options="options"
                placeholder="Select type of Search"
              ></b-form-select>
            </b-col>
          </b-row>
          <b-row class="my-1" v-if="selected == 'phone'">
            <b-col sm="12" style="text-align: left">
              <label for="input-large">Country Code:</label>
              <b-form-input v-model="country" placeholder="Enter Country Code"></b-form-input>
            </b-col>
            <b-col sm="12" style="text-align: left">
              <label for="input-large">Phone Number:</label>
              <b-form-input v-model="phone" placeholder="Enter Phone Number"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1" v-if="selected == 'walletAddr'">
            <b-col sm="12" style="text-align: left">
              <label for="input-large">Wallet Address:</label>
              <b-form-input v-model="walletAddr" placeholder="Enter Wallet Address"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1" v-if="selected == 'username'">
            <b-col sm="12" style="text-align: left">
              <label for="input-large">Username:</label>
              <b-form-input v-model="username" placeholder="Enter Username"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1" v-if="selected == 'refrence'">
            <b-col sm="12" style="text-align: left">
              <label for="input-large">Refrence ID:</label>
              <b-form-input v-model="refer" placeholder="Enter Refrence ID"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1" style="padding: 5% 4% 2%">
            <b-button pill block size="lg" variant="primary" @click="searchUserCheck">search User</b-button>
          </b-row>
        </b-card-body>
      </b-card>
    </b-container>
    <b-card v-if="isSearched">
      <template v-slot:header>
        <b-row>
          <b-col>
            <h4 class="mb-0">User Detial Searched by {{selected}}</h4>
          </b-col>
          <b-col>
            <b-button variant="outline-primary" pill @click="reSearchUser">Search Another User</b-button>
          </b-col>
        </b-row>
      </template>
      <b-card-body v-if="userNamesList.length == 0">
        <b-form>
          <b-row class="my-1" v-if="userInfoObj.name !== null">
            <b-col sm="12" style="text-align: left">
              <label for="input-large">Full Name:</label>
              <b-form-input id="input-2" v-model="userInfoObj.name" readonly></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="12" style="text-align: left">
              <label for="input-large">UserName:</label>
              <b-form-input id="input-2" v-model="userInfoObj.username" readonly></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="12" style="text-align: left">
              <label for="input-large">Promotion Power::</label>
              <b-form-input id="input-2" v-model="userInfoObj.promopwr" readonly></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="12" style="text-align: left">
              <label for="input-large">Refer ID:</label>
              <b-form-input id="input-2" v-model="userInfoObj.refid" readonly></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="12" style="text-align: left">
              <label for="input-large">Refrence ID:</label>
              <b-form-input id="input-2" v-model="userInfoObj.uid" readonly></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="12" style="text-align: left">
              <label for="input-large">Wallet Address:</label>
            </b-col>
            <b-col
              sm="12"
              style="text-align: left"
              v-for="(address , index) in userInfoObj.addresses"
              :key="index"
            >
              <label for="input-large">{{address.atype}}:</label>
              <b-input-group>
                <b-form-input :value="address.address" readonly></b-form-input>
                <b-input-group-append>
                  <b-button variant="info" @click="walletAddressInfo(address)">View Info</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-row>
        </b-form>
      </b-card-body>
      <b-card-body v-if="userNamesList.length > 0">
        <b-tabs content-class="mt-3" justified>
          <b-tab :title="userInfoObj.username">
            <b-form>
              <b-row class="my-1" v-if="userInfoObj.name !== null">
                <b-col sm="12" style="text-align: left">
                  <label for="input-large">Full Name:</label>
                  <b-form-input id="input-2" v-model="userInfoObj.name" readonly></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="12" style="text-align: left">
                  <label for="input-large">UserName:</label>
                  <b-form-input id="input-2" v-model="userInfoObj.username" readonly></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="12" style="text-align: left">
                  <label for="input-large">Promotion Power::</label>
                  <b-form-input id="input-2" v-model="userInfoObj.promopwr" readonly></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="12" style="text-align: left">
                  <label for="input-large">Refer ID:</label>
                  <b-form-input id="input-2" v-model="userInfoObj.refid" readonly></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="12" style="text-align: left">
                  <label for="input-large">Refrence ID:</label>
                  <b-form-input id="input-2" v-model="userInfoObj.uid" readonly></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="12" style="text-align: left">
                  <label for="input-large">Wallet Address:</label>
                </b-col>
                <b-col
                  sm="12"
                  style="text-align: left"
                  v-for="(address , index) in userInfoObj.addresses"
                  :key="index"
                >
                  <label for="input-large">{{address.atype}}:</label>
                  <b-input-group>
                    <b-form-input :value="address.address" readonly></b-form-input>
                    <b-input-group-append>
                      <b-button variant="info" @click="walletAddressInfo(address)">View Info</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-col>
              </b-row>
            </b-form>
          </b-tab>
          <b-tab
            v-for="(account , index) in userNamesListData"
            :title="account.username"
            :key="index"
          >
            <b-form>
              <b-row class="my-1" v-if="account.name !== null">
                <b-col sm="12" style="text-align: left">
                  <label for="input-large">Full Name:</label>
                  <b-form-input id="input-2" v-model="account.name" readonly></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="12" style="text-align: left">
                  <label for="input-large">UserName:</label>
                  <b-form-input id="input-2" v-model="account.username" readonly></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="12" style="text-align: left">
                  <label for="input-large">Promotion Power::</label>
                  <b-form-input id="input-2" v-model="account.promopwr" readonly></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="12" style="text-align: left">
                  <label for="input-large">Refer ID:</label>
                  <b-form-input id="input-2" v-model="account.refid" readonly></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="12" style="text-align: left">
                  <label for="input-large">Refrence ID:</label>
                  <b-form-input id="input-2" v-model="account.uid" readonly></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="12" style="text-align: left">
                  <label for="input-large">Wallet Address:</label>
                </b-col>
                <b-col
                  sm="12"
                  style="text-align: left"
                  v-for="(address , index) in account.addresses"
                  :key="index"
                >
                  <label for="input-large">{{address.atype}}:</label>
                  <b-input-group>
                    <b-form-input :value="address.address" readonly></b-form-input>
                    <b-input-group-append>
                      <b-button variant="info" @click="walletAddressInfo(address)">View Info</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-col>
              </b-row>
            </b-form>
          </b-tab>
        </b-tabs>
      </b-card-body>
    </b-card>
    <b-modal
      :title="`${userInfoObj.username} ${targetWallet.atype} Wallet Info`"
      v-model="walletInfoPopup"
      hide-footer
    >
      <form ref="form">
        <b-form-group label="Wallet Address" label-for="name-input">
          <b-form-input id="name-input" v-model="targetWallet.address" readonly></b-form-input>
        </b-form-group>
        <b-form-group label="Wallet Amount">
          <b-form-input v-model="targetWalletAmount" readonly></b-form-input>
        </b-form-group>

        <b-row class="my-1" style="padding: 1% 4%" v-if="targetWallet.atype == 'checking'">
          <b-button pill block size="lg" variant="success" @click="transferAmount">Transfer</b-button>
        </b-row>

        <b-row class="my-1" style="padding: 1% 4%">
          <b-button
            pill
            block
            size="lg"
            variant="primary"
            @click="ViewWalletTransactions"
          >View Transactions</b-button>
        </b-row>
      </form>
    </b-modal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      country: "86",
      phone: "",
      walletAddr: "",
      username: "",
      refer: "",
      selected: "phone",
      isSearched: false,
      userInfoObj: {},
      userNamesList: [],
      options: [
        { value: "phone", text: "By Phone Number" },
        { value: "walletAddr", text: "By Wallet Address" },
        { value: "username", text: "By Username" },
        { value: "refrence", text: "By Refrence Id" }
      ],
      walletInfoPopup: false,
      targetWallet: {},
      targetWalletAmount: 0,
      userNamesListData: []
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
      getUserData: "getUserData",
      getWalletBalance: "getWalletBalance",
      toggelLoader: "toggelLoader",
      getUserNamesList: "getUserNamesList",
      batchProcessing: "batchProcessing"
    }),
    searchUserCheck() {
      let that = this;
      let selected = that.selected;
      let data = {
        token: that.userToken
      };
      if (selected == "phone") {
        if (!that.isValid(that.phone)) {
          this.$notify({
            group: "notify",
            type: "error",
            title: "Invalid Info",
            text: `Phone Number Required`
          });
        } else {
          data.phone = that.phone;
          data.country = that.country;
          that.searchUserByData(data);
        }
      } else if (selected == "walletAddr") {
        if (!that.isValid(that.walletAddr)) {
          this.$notify({
            group: "notify",
            type: "error",
            title: "Invalid Info",
            text: `Wallet Address Required Required`
          });
        } else {
          let walletAddr = that.walletAddr;
          let isStartedWith0x = /^0x/.test(walletAddr);
          if (isStartedWith0x) {
            walletAddr = that.walletAddr.substr(2);
            data.address = walletAddr;
          } else {
            data.address = walletAddr;
          }
          that.searchUserByData(data);
        }
      } else if (selected == "username") {
        if (!that.isValid(that.username)) {
          this.$notify({
            group: "notify",
            type: "error",
            title: "Invalid Info",
            text: `Username Required`
          });
        } else {
          data.username = that.username;
          that.searchUserByData(data);
        }
      } else if (selected == "refrence") {
        if (!that.isValid(that.refer)) {
          this.$notify({
            group: "notify",
            type: "error",
            title: "Invalid Info",
            text: `Refrence ID Required Required`
          });
        } else {
          data.uid = that.refer;
          that.searchUserByData(data);
        }
      }
    },
    getUserNames(data) {
      let that = this;
      that.toggelLoader();
      that
        .getUserNamesList(data)
        .then(res => {
          that.toggelLoader();
          that.userNamesList = res;
          that.getDataofUSernamesLIst(res);
        })
        .catch(err => {
          that.toggelLoader();
          this.$notify({
            group: "notify",
            type: "error",
            title: "User Search Error",
            text: `${err.message}`
          });
        });
    },
    searchUserByData(infoObj) {
      let that = this;
      let data = infoObj;
      that.toggelLoader();
      that
        .getUserData(data)
        .then(res => {
          that.userInfo(res);
          that.getUserNames(infoObj);
          that.isSearched = true;
          that.toggelLoader();
        })
        .catch(err => {
          that.toggelLoader();
          this.$notify({
            group: "notify",
            type: "error",
            title: "User Search Error",
            text: `${err.message}`
          });
        });
    },
    userInfo(data) {
      let that = this;
      that.userInfoObj = data;
    },
    walletAddressInfo(address) {
      let that = this;
      that.toggelLoader();
      (that.targetWallet = address), (that.walletInfoPopup = true);
      let data = {
        token: that.userToken,
        address: address.address
      };
      that
        .getWalletBalance(data)
        .then(res => {
          that.toggelLoader();
          that.targetWalletAmount = res.result;
        })
        .catch(err => {
          that.toggelLoader();
          this.$notify({
            group: "notify",
            type: "error",
            title: "Wallet Info Error",
            text: `${err.message}`
          });
        });
    },
    ViewWalletTransactions() {
      let that = this;
      that.$router.push(
        `/transactions?walletAddr=${that.targetWallet.address}`
      );
    },
    transferAmount() {
      let that = this;
      that.$router.push(`/transfer?walletAddr=${that.targetWallet.address}`);
    },
    getDataofUSernamesLIst(list) {
      let that = this;
      that.toggelLoader();
      let data = [];
      list.forEach(uname => {
        data.push({
          function: "userdata",
          params: {
            token: that.userToken,
            username: uname
          }
        });
      });
      let userNamesListData = [];
      that
        .batchProcessing(data)
        .then(res => {
          res.forEach(function(udata) {
            userNamesListData.push(udata.result.result);
          });
          that.userNamesListData = userNamesListData;
          that.toggelLoader();
        })
        .catch(err => {
          that.toggelLoader();
          this.$notify({
            group: "notify",
            type: "error",
            title: "Wallet Info Error",
            text: `${err.message}`
          });
        });
    },
    reSearchUser() {
      let that = this;
      that.userInfoObj = {};
      (that.country = "86"),
        (that.phone = ""),
        (that.walletAddr = ""),
        (that.username = ""),
        (that.refer = ""),
        (that.selected = "phone"),
        (that.isSearched = false),
        (that.userInfoOb = {}),
        (that.userNamesLis = []),
        (that.walletInfoPopup = false),
        (that.targetWallet = {}),
        (that.targetWalletAmount = 0),
        (that.userNamesListData = []);
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
      that.selected = "walletAddr";
      setTimeout(function() {
        that.searchUserCheck();
      }, 1000);
    }
  }
};
</script>
<style scoped>
</style>