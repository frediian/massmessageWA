const fs = require('fs')
const { numberWhatsApp } = require('./numberWhatsApp')
const datos = JSON.parse(fs.readFileSync("hhhhh.json"))
const send = require('./whatsapp')

const destination = datos.destiny
const data = datos.data

function sendToContacts(contacts){
    contacts= parseInt(contacts)
    const phones = Object.keys(data).length

    console.log("Se procede a enviar a "+contacts+" contacto(s) los mensajes\n")
    if (contacts>1)
        multiplePhones(phones)
    else if (contacts ==1)
        singularPhone(phones)

    return "mensajes enviados correctamente"
}

function multiplePhones (phones){
    phones = phones +1
    for(i=537; i<phones;i++){

    // for(i=1; i<phones;i++){
        singularPhone(i)
    }
}

function singularPhone(phonePos){
    var textsPos = Object.keys(data[phonePos].text).length
    lengthTexts(textsPos, phonePos)
}

function lengthTexts (textsPos, phonePos){
    var numero = data[phonePos].phone
    if (textsPos>1){
        textsPos = textsPos+1
        for(j=1; j<textsPos;j++){
            makeTexts(j, phonePos, numero)
        }
    }
    else if (textsPos==1){
        makeTexts(textsPos, phonePos, numero)
    }
    console.log("Enviado "+textsPos+" mensaje(s) al "+numero+"\n")
}

function makeTexts(textPos, phonePos, numero){
    var cell = numberWhatsApp(numero)
    var text = data[phonePos].text[textPos]
        send.enviarMensaje({"phone":cell,"text":text})
        console.log (cell+" "+ text)
}
module.exports.sendMessages = async (req,res)=>{
    sendToContacts(destination.phones);
} 