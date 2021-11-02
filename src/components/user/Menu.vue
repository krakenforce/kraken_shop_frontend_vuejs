<template>
  <nav>
    <div class="wrapper">
      <div class="logo"><a href="#">Draken Shop</a></div>
      <ul class="nav-links">
        <li>
          <a href="#" class="desktop-item">THỂ LOẠI</a>
          <div class="mega-box">
            <div class="content">
              <div class="row">
                <ul class="mega-links">
                  <li><a href="#">Action</a></li>
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
          <a href="#" class="desktop-item">DANH MỤC</a>
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
          <a href="#" class="desktop-item">THÔNG TIN</a>
          <ul class="drop-menu">
            <li><a href="#">HƯỚNG DẪN</a></li>
            <li><a href="#">TIN TỨC</a></li>
          </ul>
        </li>
        <li><a href="#">LIÊN HỆ</a></li>
      </ul>

      <v-spacer></v-spacer>

      <div v-if="test" >
        <v-row>
          <v-col cols="12" sm="2" >
            <v-btn icon color="blue" class="mr-15">
              <v-badge color="green" content="6">
                <v-icon>add_shopping_cart</v-icon>
              </v-badge>
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6">
            <v-btn icon>
              <v-avatar color="red">
                <v-icon dark> mdi-account-circle </v-icon>
              </v-avatar>
              <div class="text-caption ml-2 white--text">username</div>           
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <div v-if="!test">
        <v-btn icon color="blue"> LOGIN/SIGNUP </v-btn>
      </div>

      <v-btn icon color="white" class="ml-10">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Menu",

  data() {
    return {
      test: false,
    };
  },
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
    margin: 15px 10px;
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
  #showMega:checked ~ .mega-box {
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