const fs = require('fs')
const { numberWhatsApp } = require('./numberWhatsApp')
const datos = JSON.parse(fs.readFileSync("datos.json"))
const send = require('./whatsapp')

const destination = datos.destiny
const data = datos.data

function sendToContacts(contacts) {
    contacts = parseInt(contacts)
    const phones = Object.keys(data).length
    console.log("Se procede a enviar a " + contacts + " contacto(s) los mensajes\n")
    if (contacts > 1)
        multiplePhones(phones)
    else if (contacts == 1)
        singularPhone(phones)
    return "mensajes enviados correctamente"
}

function multiplePhones(phones) {

    const jul = () => {
            for (i = 0; i < 10; i++) {
                singularPhone(1)
                if(i==10){
                    clearInterval(timerId)
                }
            }
    }
    const timerId= setInterval(jul, 60000)
    // timerId()
       
    }

    function singularPhone(phonePos) {
        var numero = data[phonePos].phone
        var cell = numberWhatsApp(numero)

        send.enviarImagen({ "phone": cell })
        // send.enviarImagen({"phone":cell,"buffMedia":text})
        console.log("Mensaje N° " + phonePos + " del " + numero + "\n")
    }

    module.exports.sendImageMessage = async (req, res) => {
        sendToContacts(destination.phones)
        res.jsonp({mensaje: 'Enviando Imagenes'})
    }