<template>
  <v-app-bar app>
    <nav>
      <div class="wrapper">
        <div class="logo"><a href="/">Kraken Shop</a></div>
        <input type="radio" name="slider" id="menu-btn" />
        <input type="radio" name="slider" id="close-btn" />

        <ul class="nav-links">
          <label for="close-btn" class="btn close-btn"
            ><v-icon>mdi-dots-vertical-circle</v-icon>
          </label>
          <li>
            <a href="#" class="desktop-item">GENRE</a>
            <input type="checkbox" id="showMega1" />
            <label for="showMega1" class="mobile-item">THỂ LOẠI</label>
            <div class="mega-box">
              <div class="content">
                <div class="row">
                  <ul class="mega-links">
                    <li><a href="/search/genre/action">Action</a></li>
                    <li><a href="#">Adventure</a></li>
                    <li><a href="#">Casual</a></li>
                    <li><a href="#">Early Access</a></li>
                    <li><a href="#">Indie</a></li>
                  </ul>
                </div>
                <div class="row">
                  <ul class="mega-links">
                    <li><a href="#">Massively Multiplayer</a></li>
                    <li><a href="#">Racing</a></li>
                    <li><a href="#">RPG</a></li>
                    <li><a href="#">Sexual Content</a></li>
                    <li><a href="#">Simulation</a></li>
                  </ul>
                </div>
                <div class="row">
                  <ul class="mega-links">
                    <li><a href="#">Sports</a></li>
                    <li><a href="#">Strategy</a></li>
                    <li><a href="#">Utilities</a></li>
                    <li><a href="#">Violent</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <a href="#" class="desktop-item">CATEGORY</a>
            <input type="checkbox" id="showMega2" />
            <label for="showMega2" class="mobile-item">DANH MỤC</label>
            <div class="mega-box">
              <div class="content">
                <div class="row">
                  <ul class="mega-links">
                    <li><a href="#">Battle.Net</a></li>
                    <li><a href="#">Game Mobile</a></li>
                    <li><a href="#">Game Origin</a></li>
                    <li><a href="#">Game Steam</a></li>
                    <li><a href="#">Game Uplay</a></li>
                    <li><a href="#">Genshin Impact</a></li>
                  </ul>
                </div>
                <div class="row">
                  <ul class="mega-links">
                    <li><a href="#">Khác</a></li>
                    <li><a href="#">Microsoft-Xbox</a></li>
                    <li><a href="#">Package Steam</a></li>
                    <li><a href="#">PlayStation</a></li>
                    <li><a href="#">Wallet Code</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <a href="#" class="desktop-item">INFOMATION</a>
            <input type="checkbox" id="showDrop" />
            <label for="showDrop" class="mobile-item">THÔNG TIN</label>
            <ul class="drop-menu">
              <li><a href="#">HƯỚNG DẪN</a></li>
              <li><a href="#">TIN TỨC</a></li>
            </ul>
          </li>

          <li><a href="/contact">CONTACT</a></li>
          <li v-if="user">
            <v-row>
              <v-col cols="12" sm="4">
                <v-menu open-on-hover top offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-badge bordered color="green" overlap>
                      <span slot="badge">{{
                        $store.state.shoppingCart.cartCount
                      }}</span>
                      <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
                        <v-icon>mdi-cart</v-icon>
                      </v-btn>
                    </v-badge>
                  </template>
                  <div v-if="$store.state.shoppingCart.cart.length > 0">
                    <v-list class="pa-5">
                      <v-list-item
                        v-for="item in $store.state.shoppingCart.cart"
                        :key="item.productId"
                      >
                        <v-list-item-title>{{ item.name }} x {{ item.quantity }} - ${{ item.totalPrice }}</v-list-item-title>
                        <v-list-item-action>
                          <v-btn color="red" @click.prevent="removeFromCart(item)">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-list-item-action>

                      </v-list-item>
                      <v-divider></v-divider>
                      <h2>Total: $ {{totalPrice}}</h2>
                      <v-divider></v-divider>
                      <v-btn @click.prevent="checkWalletBalance" class="mt-3" color="blue">Checkout</v-btn>
                    </v-list>
                  </div>
                  <div v-else>
                    <v-list class="pa-5">
                      <h2>Cart is empty</h2>
                    </v-list>
                  </div>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="8">
                <v-menu open-on-hover bottom offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" @click="goToUserDetail">
                      <v-avatar color="blue">
                        <v-icon v-if="user.avatarImageUrl == null" dark>
                          mdi-account-circle
                        </v-icon>
                        <v-img
                          v-if="user.avatarImageUrl != null"
                          :src="user.avatarImageUrl"
                        ></v-img>
                      </v-avatar>
                      <span class="ml-2">{{ user.username }}</span>
                    </v-btn>
                  </template>

                  <v-list dense class="black pa-5">
                    <v-list-item-group color="primary">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            <span>WALLET: {{ user.walletBalance }} $</span>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        @click="item.action"
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.text"
                            class="white--text"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </li>
          <li v-if="!user">
            <a href="/login" class="blue--text">LOGIN/SIGNUP</a>
          </li>
          <li>
            <v-dialog transition="dialog-top-transition" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon class="ml-10" v-bind="attrs" v-on="on">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </template>
              <template v-slot:default="dialog">
                <v-card class="pa-10">
                  <v-card-text>
                    <v-text-field
                      dense
                      placeholder="ENTER PRODUCT NAME TO SEARCH"
                      label="PRODUCT NAME"
                      v-model="searchKeyword"
                    >
                    </v-text-field>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn text color="blue"  @click="searchProduct">
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                    <v-btn text color="red" @click="dialog.value = false"
                      >Close</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </li>
        </ul>
        <label for="menu-btn" class="btn menu-btn"
          ><v-icon>mdi-dots-horizontal-circle</v-icon>
        </label>
      </div>
    </nav>
  </v-app-bar>
</template>

<script>
import api from "../../services/api";

export default {
  name: "Menu",

  data() {
    return {
      searchKeyword: '',
      user: null,
      items: [{ text: "Log Out", action: this.logout }],
    };
  },
  computed:{
    totalPrice(){
      let total = 0;
      for(let item of this.$store.state.shoppingCart.cart){
        total += item.totalPrice;
      } 

      return total;
    }
  },
  methods: {

    checkWalletBalance(){
      let total = this.totalPrice;
      let walletBalance = this.user.walletBalance;
      console.log(walletBalance);
      console.log(total);
      if(walletBalance < total){
        alert("số dư không đủ, nạp thêm tiền");
        this.$router.push("/userInfo");
      }
    },

    removeFromCart(item){
      this.$store.commit('removeFromCart', item);
    },

    goToUserDetail() {
      this.$router.push("/userInfo");
    },

    getShoppingCart() {
      let userId = this.user.id;
      api
        .get("/cart/user/" + userId)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          Promise.reject(error);
        });
    },

    searchProduct() {
      this.$router.push("/search/keyword/" + this.searchKeyword);
    },

    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },

    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
  mounted() {
    this.getUser();
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
nav {
  position: fixed;
  z-index: 99;
  width: 100%;

  background: #242526;
}
nav .wrapper {
  position: relative;
  max-width: 1300px;
  padding: 0px 30px;
  height: 70px;
  line-height: 70px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wrapper .logo a {
  color: #f2f2f2;
  font-size: 30px;
  font-weight: 600;
  text-decoration: none;
}
.wrapper .nav-links {
  display: inline-flex;
}
.nav-links li {
  list-style: none;
}
.nav-links li a {
  color: #f2f2f2;
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
  padding: 9px 15px;
  border-radius: 5px;
  transition: all 0.3s ease;
}
.nav-links li a:hover {
  background: #3a3b3c;
}
.nav-links .mobile-item {
  display: none;
}
.nav-links .drop-menu {
  position: absolute;
  background: #242526;
  width: 180px;
  line-height: 45px;
  top: 85px;
  opacity: 0;
  visibility: hidden;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}
.nav-links li:hover .drop-menu,
.nav-links li:hover .mega-box {
  transition: all 0.3s ease;
  top: 70px;
  opacity: 1;
  visibility: visible;
}
.drop-menu li a {
  width: 100%;
  display: block;
  padding: 0 0 0 15px;
  font-weight: 400;
  border-radius: 0px;
}
.mega-box {
  position: absolute;
  left: 0;
  width: 100%;
  padding: 0 30px;
  top: 85px;
  opacity: 0;
  visibility: hidden;
}
.mega-box .content {
  background: #242526;
  padding: 25px 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}
.mega-box .content .row {
  width: calc(25% - 30px);
  line-height: 45px;
}

.content .row .mega-links {
  margin-left: -40px;
  border-left: 1px solid rgba(255, 255, 255, 0.09);
}
.row .mega-links li {
  padding: 0 20px;
}
.row .mega-links li a {
  padding: 0px;
  padding: 0 20px;
  color: #d9d9d9;
  font-size: 17px;
  display: block;
}
.row .mega-links li a:hover {
  color: #f2f2f2;
}
.wrapper .btn {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  display: none;
}
.wrapper .btn.close-btn {
  position: absolute;
  right: 30px;
  top: 10px;
}
@media screen and (max-width: 970px) {
  .wrapper .btn {
    display: block;
  }
  .wrapper .nav-links {
    position: fixed;
    height: 100vh;
    width: 100%;
    max-width: 350px;
    top: 0;
    left: -100%;
    background: #242526;
    display: block;
    padding: 50px 10px;
    line-height: 50px;
    overflow-y: auto;
    box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.18);
    transition: all 0.3s ease;
  }
  /* custom scroll bar */
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #242526;
  }
  ::-webkit-scrollbar-thumb {
    background: #3a3b3c;
  }
  #menu-btn:checked ~ .nav-links {
    left: 0%;
  }
  #menu-btn:checked ~ .btn.menu-btn {
    display: none;
  }
  #close-btn:checked ~ .btn.menu-btn {
    display: block;
  }
  .nav-links li {
    margin: 15px 20px;
  }
  .nav-links li a {
    padding: 0 20px;
    display: block;
    font-size: 20px;
  }
  .nav-links .drop-menu {
    position: static;
    opacity: 1;
    top: 65px;
    visibility: visible;
    padding-left: 20px;
    width: 100%;
    max-height: 0px;
    overflow: hidden;
    box-shadow: none;
    transition: all 0.3s ease;
  }
  #showDrop:checked ~ .drop-menu,
  #showMega1:checked ~ .mega-box {
    max-height: 100%;
  }
  #showMega2:checked ~ .mega-box {
    max-height: 100%;
  }
  .nav-links .desktop-item {
    display: none;
  }
  .nav-links .mobile-item {
    display: block;
    color: #f2f2f2;
    font-size: 20px;
    font-weight: 500;
    padding-left: 20px;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s ease;
  }
  .nav-links .mobile-item:hover {
    background: #3a3b3c;
  }
  .drop-menu li {
    margin: 0;
  }
  .drop-menu li a {
    border-radius: 5px;
    font-size: 18px;
  }
  .mega-box {
    position: static;
    top: 65px;
    opacity: 1;
    visibility: visible;
    padding: 0 20px;
    max-height: 0px;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .mega-box .content {
    box-shadow: none;
    flex-direction: column;
    padding: 20px 20px 0 20px;
  }
  .mega-box .content .row {
    width: 100%;
    margin-bottom: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  .mega-box .content .row:nth-child(1),
  .mega-box .content .row:nth-child(2) {
    border-top: 0px;
  }
  .content .row .mega-links {
    border-left: 0px;
    padding-left: 15px;
  }
  .row .mega-links li {
    margin: 0;
  }
}
nav input {
  display: none;
}
.body-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  padding: 0 30px;
}
.body-text div {
  font-size: 45px;
  font-weight: 600;
}
</style>