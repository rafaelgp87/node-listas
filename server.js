const usuarios = require ('./api/usuarios')
const express = require('express')
const bodyParser = require('body-parser')
const puerto = 5000

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

// api Usuarios
app.post('/login', usuarios.login)
app.post('/registrarse', usuarios.registrarse)

app.listen(puerto, function(err){
  if(err) return console.log('Hubo un error al iniciar el servidor'), process.exit(1)
  console.log(`Servidor escuchando en el puerto ${puerto}`)
})
