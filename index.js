const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = express.Router()

app.use (bodyParser.json())

const whatsapp = require('./whatsapp')
const conectar = require('./modules/conectWA').conectWA
// const sendMessage = require('./modules/sendMessage')
// const sendImage = require('./modules/sendImages')
// const findContact = require('./findContact')


const findContact = require('./modules/findContact').findContact
// const status = require('./modules/phoneStatus')
// app.post('/ver', whatsapp.estaWhatsapp)
app.post('/find', findContact)

// app.post('/iniciar', whatsapp.connectAPI)
app.post('/iniciar', conectar)

// app.post('/enviar', sendMessage.sendMessages)
// app.post('/find', whatsapp.findPhone)

// app.post('/status', status)
// app.post('/imagen', sendImage.sendImageMessage)

app.post('/crear', whatsapp.createCSV)

app.listen(3001,()=>{
    console.log('Servidor Express En linea')
})