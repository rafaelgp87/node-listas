const login = Vue.component('login', {
  template:`
    <div class="component-login">

      <div class="formulario-login">
        <div>
          <input type="text" v-model="email" placeholder="email">
        </div>

        <div>
          <input type="password" v-model="pass" placeholder="contraseña">
        </div>

        <div>
          <button type="button" v-on:click="loginGoogle">
              <img src="img/icons8-google-48.png" class="google">
          </button>
        </div>

        <div>
          <button type="button" v-on:click="loginFacebook">
              <img src="img/icons8-facebook-40.png" class="facebook">
          </button>
        </div>

        <div>
          <button type="button" v-on:click="loginEmail">
            login
          </button>
        </div>

        <div>
          <button type="button" v-on:click="registrarEmail">
            registrarse
          </button>
        </div>

        <div>
          <button type="button" v-on:click="logout">
            logout
          </button>
        </div>
      </div>

      <div class="subir-archivos">
        <div>
          <progress value="0" max="100" id="uploader">0%</progress>
        </div>
        <div>
          <input type="file" value="upload" id="fileButton" v-on:change="uploadFile" />
        </div>
        <button type="button" v-on:click="guardarImagen">
          guardar imagen
        </button>
        <div>
          <img :src="image" />
        </div>
      </div>

    </div>
  `,
  data: function() {
    return {
      email: '',
      pass: '',
      image: 'img/icons8-picture-512.png',
      fileImage: ''
    }
  },
  methods: {
    loginEmail: function() {
      var promise = firebase.auth().signInWithEmailAndPassword(this.email, this.pass);
      promise.catch(e => console.log(e));
    },
    registrarEmail: function() {
      var auth = firebase.auth();
      var promise = auth.createUserWithEmailAndPassword(this.email, this.pass);
      promise.catch(e => console.log(e));
      //Si e.message viene nulo no hubo problema de authenticación
    },
    logout: function() {
      firebase.auth().signOut().then(function() {
        console.log('Signout successful!')
      }, function(error) {
        console.log('Signout failed')
      });
    },
    loginGoogle: function() {
      var googleProvider = new firebase.auth.GoogleAuthProvider();
      googleProvider.addScope('email');
      googleProvider.addScope('profile');
      //provider.addScope('https://www.googleapis.com/auth/plus.login');

      /*firebase.auth().signInWithPopup(googleProvider).then(function(result) {
        console.log(result)
      }).catch(function(error) {

        console.log(error)
      });*/

      firebase.auth().signInWithRedirect(googleProvider);
      firebase.auth().getRedirectResult().then(function(authData) {
        console.log('****************')
        console.log(authData)
        console.log('****************')
      }).catch(function(error) {
        console.log(error)
      });
    },
    loginFacebook: function() {
      var facebookProvider = new firebase.auth.FacebookAuthProvider();
      facebookProvider.addScope('email');
      facebookProvider.addScope('public_profile');

      firebase.auth().signInWithRedirect(facebookProvider);

      firebase.auth().getRedirectResult().then(function(authData) {
        console.log('****************')
        console.log(authData);
        console.log('****************')
      }).catch(function(error) {
          console.log(error.code);
          console.log(error.message);
      });
    },
    uploadFile: function(e) {

      var file = e.target.files[0];
      var reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
      };

      reader.readAsDataURL(file);

      this.fileImage = file;
    },
    guardarImagen: function() {

      var uploader = document.getElementById('uploader');
      var storageRef = firebase.storage().ref('avatar-usuarios/' + this.fileImage.name);
      var task = storageRef.put(this.fileImage);

      task.on('state_changed',
        function progress(snapshot) {
          var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploader.value = percentage;
        },
        function error(err) {

        },
        function completed() {

        }
      )
    }
  },
  // Antes de renderear el template
  created: function () {
    verificarLogin();
  }
});
