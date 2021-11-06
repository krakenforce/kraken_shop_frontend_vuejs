import Vuex from "vuex"
import auth from "./AuthModule"
import Vue from "vue"

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth
    },
});

export default store;
