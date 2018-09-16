// Initialize Firebase
var config = {
  apiKey: "AIzaSyARFSSX-5jiaKbUEKHSFXOZ0TIDztP4oEc",
  authDomain: "proyecto-firebase-d9033.firebaseapp.com",
  databaseURL: "https://proyecto-firebase-d9033.firebaseio.com",
  projectId: "proyecto-firebase-d9033",
  storageBucket: "proyecto-firebase-d9033.appspot.com",
  messagingSenderId: "857132833562"
};

firebase.initializeApp(config);

function verificarLogin() {

  firebase.auth().onAuthStateChanged(user => {
    console.log('****************');
    console.log('Verificar login...');
    if (user) {
      if (user != null) {
        console.log('logueado');
        console.log('****************');
      }
    } else {
      console.log('no logueado');
      console.log('****************');
    }
  })
}

// Navegación
const routes = [
  { path: '/', component: home },
  { path: '/home', redirect: '/' },
  { path: '/listas', component: list },
  { path: '/login', component: login }
];

const router = new VueRouter({
  //mode: 'history',
  routes: routes
});

const app = new Vue({
  el: '#app',
  router
});
