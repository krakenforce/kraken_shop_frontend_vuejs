import Vuex from "vuex"
import auth from "./AuthModule"
import shoppingCart from "./ShoppingCartModule"
import Vue from "vue"

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth, shoppingCart,
    },
});

export default store;
