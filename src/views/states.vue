<template>
  <section>
    <b-container>
      <b-container class="card text-center" style="margin-top: 2vh">
        <div class="card-header">
          <b>General System Setting</b>
        </div>
        <b-container>
          <div class="card-body" v-for="(variable , index) in variables" :key="index">
            <label :for="variable.var">
              <b>{{variable.comments}}</b>
            </label>
            <div class="input-group input-group-lg">
              <div class="input-group-prepend"></div>
              <input
                type="text"
                :value="variable.val"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                readonly
              />
              <div class="input-group-append">
                <button class="btn btn-info" type="button" @click="editVar(variable)">Edit</button>
              </div>
            </div>
          </div>
        </b-container>
      </b-container>
    </b-container>
    <b-modal
      :title="`Update ${currentVar.var}`"
      @hidden="resetCurrentVar"
      @ok="updateVar"
      v-model="variableUpdateModel"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :label="currentVar.comments"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input id="name-input" v-model="currentVar.val" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      variables: [],
      variableUpdateModel: false,
      currentVar: {}
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
      getSystemVariables: "getSystemVariables",
      setSystemVariable: "setSystemVariable",
      toggelLoader: "toggelLoader"
    }),
    editVar(variable) {
      let that = this;
      that.currentVar = variable;
      that.variableUpdateModel = true;
    },
    resetCurrentVar() {
      let that = this;
    },
    updateVar() {
      let that = this;
      that.toggelLoader();
      let currentVar = that.currentVar;
      let data = {
        token: that.userToken,
        var: currentVar.var,
        val: currentVar.val
      };
      that
        .setSystemVariable(data)
        .then(res => {
          that.getAllvariables();
          this.$notify({
            group: "notify",
            type: "success",
            title: "updated",
            text: `${that.currentVar.var} updated`
          });
          that.toggelLoader();
        })
        .catch(err => {
          that.getAllvariables();
          this.$notify({
            group: "notify",
            type: "error",
            title: "Error",
            text: err.message
          });
          that.toggelLoader();
        });
    },
    getAllvariables() {
      let that = this;
      that.toggelLoader();
      let data = {
        var: "_ALL_"
      };
      that
        .getSystemVariables(data)
        .then(res => {
          let variables = res.result;
          that.variables = variables;
          that.toggelLoader();
        })
        .catch(err => {
          that.toggelLoader();
          console.log("err ", err);
        });
    }
  },
  mounted() {
    let that = this;
    that.getAllvariables();
  }
};
</script>

<style scoped>
.card-body {
  text-align: left;
}
</style>