<template>
  <section>
    <b-card header="Transaction Record Filter">
      <b-card-body>
        <b-row>
          <b-col sm="6" style="text-align: left">
            <label for="input-large">Wallet Address:</label>
            <b-form-input v-model="walletAddr" placeholder="Enter Wallet Address"></b-form-input>
          </b-col>
          <b-col sm="6" style="text-align: left">
            <label for="input-large">Transaction Type:</label>
            <b-form-select v-model="selected" :options="options"></b-form-select>
          </b-col>
        </b-row>
        <b-row class="my-4">
          <b-col sm="4" style="text-align: left">
            <label for="input-large">From Date:</label>
            <datepicker
              input-class="input-group-text"
              :value="sdate"
              name="edate"
              :format="formate"
              @selected="selectSDate"
            ></datepicker>
          </b-col>
          <b-col sm="4" style="text-align: left">
            <label for="input-large">To Date:</label>
            <datepicker
              :value="edate"
              input-class="input-group-text"
              name="sdate"
              :format="formate"
              @selected="selectEDate"
            ></datepicker>
          </b-col>
          <b-col sm="4" style="text-align: left">
            <label for="input-large"></label>
            <b-button pill block size="lg" variant="primary" @click="applyFIlters">Apply Filters</b-button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-card class="mt-2" v-if="transactionList.length > 0">
      <b-table
        id="my-table"
        :items="transactionList"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        responsive
        small
        selectable
        select-mode="single"
        @row-clicked="getRowInfo"
      ></b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </b-card>
    <b-card class="mt-2" v-if="noSuchTrans">
      <b-alert show variant="warning">No Such Transactions</b-alert>
    </b-card>
    <b-modal :title="`Transaction Detail`" v-model="transactionInfo" hide-footer>
      <div class="rowSB">
        <h5>Id</h5>
        <p>{{targetTrans.id}}</p>
      </div>
      <div class="rowSB">
        <h5>Time</h5>
        <p>{{targetTrans.time}}</p>
      </div>
      <div class="rowSB">
        <h5>Type</h5>
        <p>{{targetTrans.type}}</p>
      </div>
      <div class="rowSB">
        <h5>From</h5>
        <p>
          <a :href="`/info?walletAddr=${targetTrans.from}`">{{targetTrans.from}}</a>
        </p>
      </div>
      <div class="rowSB">
        <h5>From Balance</h5>
        <p>{{targetTrans.frombal}}</p>
      </div>
      <div class="rowSB">
        <h5>To</h5>
        <p>
          <a :href="`/info?walletAddr=${targetTrans.to}`">{{targetTrans.to}}</a>
        </p>
      </div>
      <div class="rowSB">
        <h5>To Balance</h5>
        <p>{{targetTrans.tobal}}</p>
      </div>
      <div class="rowSB">
        <h5>Amount</h5>
        <p>{{targetTrans.amount}} {{targetTrans.symbol}}</p>
      </div>
    </b-modal>
  </section>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { mapGetters, mapActions } from "vuex";
import { _ } from "vue-underscore";

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      walletAddr: "",
      selected: "all",
      options: [
        { value: "all", text: "All Transactions" },
        { value: "other", text: "Regular Transactions" },
        { value: "other", text: "Regular Transactions" },
        { value: "tostake", text: "deposit from checking to saving" },
        { value: "fromstake", text: "withdraw from saving to " },
        { value: "airdrop", text: "airdrop from system airdrop account" },
        { value: "stakereward", text: "daily reward for saving account" },
        { value: "salesreward", text: "daily referral reward" },
        {
          value: "increase",
          text: "daily increment for system checking account"
        },
        { value: "team", text: "from team acct to team members" },
        { value: "advisor", text: "From advisors acct to advisors" }
      ],
      formate: "yyyy-MM-dd",
      sdate: "",
      edate: "",
      perPage: 10,
      currentPage: 1,
      transactionList: [],
      generalList: [],
      noSuchTrans: false,
      //filters
      fields: [
        { key: "id", label: "Transaction ID", sortable: false },
        {
          key: "from",
          label: "From Wallet",
          sortable: false,
          class: "text-center"
        },
        { key: "time", label: "Time", sortable: false, class: "text-center" },
        {
          key: "amount",
          label: "Amount",
          sortable: false,
          class: "text-center"
        },
        {
          key: "amount",
          label: "Amount",
          sortable: false,
          class: "text-center"
        },
        {
          key: "tobal",
          label: "Total",
          sortable: false,
          class: "text-center"
        }
      ],
      transactionInfo: false,
      targetTrans: {}
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIN: "getLoginStatus",
      userToken: "getUserToken"
    }),
    rows() {
      return this.transactionList.length;
    }
  },
  methods: {
    ...mapActions({
      transferToUser: "transferToUser",
      toggelLoader: "toggelLoader",
      getTransactionList: "getTransactionList"
    }),

    generateDates() {
      let that = this;
      //today date
      let today = new Date();
      var tdd = today.getDate();
      var tmm = today.getMonth() + 1; //January is 0!

      var tyyyy = today.getFullYear();
      if (tdd < 10) {
        tdd = "0" + tdd;
      }
      if (tmm < 10) {
        tmm = "0" + tmm;
      }
      that.edate = tyyyy + "-" + tmm + "-" + tdd;
      //yesterday date
      let yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      var dd = yesterday.getDate();
      var mm = yesterday.getMonth() + 1; //January is 0!

      var yyyy = yesterday.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      that.sdate = yyyy + "-" + mm + "-" + dd;
      that.applyFIlters();
    },
    applyFIlters() {
      let that = this;
      let walletAddr = that.walletAddr;
      if (!that.isValid(walletAddr)) {
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
          sdate: that.sdate,
          edate: that.edate
        };
        let walletAddr = that.walletAddr;
        let isStartedWith0x = /^0x/.test(walletAddr);
        if (isStartedWith0x) {
          walletAddr = that.walletAddr.substr(2);
          data.address = walletAddr;
        } else {
          data.address = walletAddr;
        }
        if (that.selected !== "all") {
          data.type = that.selected;
        }
        that
          .getTransactionList(data)
          .then(res => {
            let generalList = res.result;
            let transactionList = [];
            _.forEach(generalList, tran => {
              tran.amount = Number(tran.amount).toFixed(4);
              tran.frombal = Number(tran.frombal).toFixed(4);
              tran.tobal = Number(tran.tobal).toFixed(4);
              tran.time = tran.time.substring(0, 19);
              if (tran.type == "") {
                tran.type = "normal";
              }
              transactionList.push(tran);
            });
            if (transactionList.length > 0) {
              that.noSuchTrans = false;
              that.transactionList = transactionList;
            } else {
              that.transactionList = [];
              that.noSuchTrans = true;
            }
            that.toggelLoader();
          })
          .catch(err => {
            that.toggelLoader();
            this.$notify({
              group: "notify",
              type: "error",
              title: "Transaction History Error",
              text: `${err.message}`
            });
          });
      }
    },
    selectEDate(dd) {
      let that = this;
      let date = new Date(dd);
      var dd = date.getDate();
      var mm = date.getMonth() + 1; //January is 0!

      var yyyy = date.getFullYear();
      that.edate = `${yyyy}-${mm}-${dd}`;
    },
    selectSDate(dd) {
      let that = this;
      let date = new Date(dd);
      var dd = date.getDate();
      var mm = date.getMonth() + 1; //January is 0!

      var yyyy = date.getFullYear();
      that.sdate = `${yyyy}-${mm}-${dd}`;
    },
    getRowInfo(row) {
      let that = this;
      that.targetTrans = row;
      that.transactionInfo = true;
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
    that.generateDates();
  }
};
</script>

<style scoped>
.rowSB {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 2px;
}
.bt {
  border-top: 1px solid lightgray;
}
</style>