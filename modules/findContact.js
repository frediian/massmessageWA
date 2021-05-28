const { numberWhatsApp } = require("./numberWhatsApp");
const fs = require('fs')
// const numberWhatsApp=require('./numberWhatsApp')
// const data = JSON.parse(fs.readFileSync("llll.json"))
// const phones = data.data

// const createCsWriter = require('csv-writer').createObjectCsvWriter;

// const datosWhats = []

const sendWhatsapp = require('../whatsapp').findPhone

function findPhone(numeros) {

    console.log("Verificando numeros en WhatsApp/n")

    // for(i=1;i<=Object.keys(numeros).length;i++){
    // phone = numeros[i].phone
    const phoneWhats = numberWhatsApp(numeros)
    sendWhatsapp(phoneWhats)
        .then(
            (j) => {
                console.log('numero econtrado ', j)
            }
        )
        .catch(err => console.error("Error inesperado al buscar telefono: " + err))

    //     return j})
    // console.log(verificado)
    // datosWhats.push({phone:phone,isonWhats:verificado})
}

// const csvWriter = createCsWriter({
//     path: 'tieneWhats.csv',
//     header:[
//         {id:'phone', title:'Celular'},
//         {id:'isonWhats', title:'Tiene Whatsapp'}
//     ]
// })

module.exports.findContact = async (req, res) => {
    findPhone(   )//numero de celular
    res.jsonp({ mensaje: 'verificando numero en whatsapp' })
    // csvWriter.writeRecords(datosWhats).then(()=>console.log("Csv creado"))
}