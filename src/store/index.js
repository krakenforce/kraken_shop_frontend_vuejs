import Vuex from "vuex"
import auth from "./AuthModule"
import test from "./test"
import Vue from "vue"

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth, test
    },
});

export default store;
