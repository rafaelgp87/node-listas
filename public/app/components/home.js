const home = Vue.component('home', {
  template:`
    <div class="component-home">

      <p>Home</p>

    </div>
  `,
  // Antes de renderear el template
  created: function () {
    verificarLogin();
  }
});
