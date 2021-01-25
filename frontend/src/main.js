// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import axios from 'axios';
import VueClipboard from 'vue-clipboard2'
//import 'babel-polyfill' //兼容IE6
import Cookies from 'js-cookie'

import './assets/site.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.use(VueClipboard)
Vue.use(Vuex)

Vue.config.productionTip = false

//开启debug模式
Vue.config.debug = true;
axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
// This will be bundled by Vue CLI
axios.defaults.baseURL = process.env.VUE_APP_API_ROOT
Vue.prototype.$axios = axios;

const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: sessionStorage
  })],
  state: {
    // -- account relatex --
    loggedIn: false,
    userID: 0,
    username: "",
    isSuperUser: false
  },
  mutations: {
    logIn (state, payload) {
      state.loggedIn = true;
      state.userID = payload.userID;
      state.username = payload.username;
      state.isSuperUser = payload.isSuperUser;
    },
    logOut (state) {
      state.loggedIn = false;
      state.userID = 0;
      state.username = "";
      state.isSuperUser = false;
    }
  }
})

// 根据cookie里设置的userid，获取用户信息；但这个是异步的，可能需要刷新一下页面
// const userid = Cookies.get('userid');
// if (userid == undefined) {
//   sessionStorage.setItem("userid", "");
//   sessionStorage.setItem("username", "");
//   sessionStorage.setItem("name", "");
//   sessionStorage.setItem("is_admin", false);
// } else {
//   if(sessionStorage.getItem("userid") == undefined || sessionStorage.getItem("userid") == ""){
//     sessionStorage.setItem("userid", userid);
//     axios.get("/users/" + userid + "/").then(response => {
//       sessionStorage.setItem("username", response.data.username);
//       var name = response.data.last_name+response.data.first_name;
//       if(name == "")
//         name = response.data.username;
//       sessionStorage.setItem("name", name);
//       sessionStorage.setItem("isadmin", response.data.is_superuser);
//     })
//   }
// }

new Vue({
  el: '#app',
  router,
  components: { App },
  store: store,
  template: '<App/>',
  render: h => h(App),
  created() {

  }
})

