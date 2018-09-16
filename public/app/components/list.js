const list = Vue.component('list', {
  template:`
    <div class="component-list">

      <div class="container-list">
        <pre id="objeto"></pre>
        <ul id="lista"></ul>
      </div>

    </div>
  `,
  data: function() {
    return {
      listas: []
    }
  },
  methods: {
    prueba: function() {
      console.log('función de prueba')
    }
  },
  // Antes de renderear el template
  created: function () {
    verificarLogin();
  },
  // Después de renderear el template
  mounted: function() {
    // Consultas a la base
    var query = firebase.database().ref().child('listas');

    query.once('value', function(snapshot) {
      var messages = [];
      snapshot.forEach(function(snap) {
        console.log(snap.key + ' ' + snap.val())
        if(snap.val() === 'Música') {
          messages.push(snap.val());
        }
      });
      console.log('lista encontrada: ' + messages);
    });

    var preObject = document.getElementById('objeto');
    var ulLista = document.getElementById('lista');

    var dbRefList = query.child('numeracion');

    query.on('value', snap => {
      preObject.innerText = JSON.stringify(snap.val(), null, 3)
    });

    dbRefList.on('child_added', snap => {
      var lista = document.createElement('li');
      lista.innerText = snap.val();
      lista.id = snap.key;
      ulLista.appendChild(lista)
    });

    dbRefList.on('child_changed', snap => {

      var liChanged = ulLista.children[snap.key]
      liChanged.innerText = snap.val();
    })

    dbRefList.on('child_removed', snap => {
      var liToRemove = ulLista.children[snap.key]
      liToRemove.remove()
    })
  }
});
