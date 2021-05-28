const WhatsAppWeb = require('baileys')
const fs = require('fs')
// const request = require('request')
const { numberWhatsApp } = require('./modules/numberWhatsApp');
const image = require('./modules/image-download')

const client = new WhatsAppWeb()
client.autoReconnect = true // auto reconnect on disconnect

// const numero = JSON.parse(fs.readFileSync("numero.json"))
// const cellphone = numberWhatsApp(numero.phone)
module.exports.phoneStatus = async (req, res) => {
    console.log("Verificando numero en WhatsApp\n")

    client.getStatus(cellphone)
        .then(
            ([a, b]) => {
                console.log("\neste es su estado: ", a.status)
            })
        .catch(err => console.log(err))

    client.getProfilePicture(cellphone)
        .then(
            ([a, b]) => {
                if (a.eurl != null) {
                    const fileUrl = a.eurl
                    image.imageDownload(fileUrl)
                }
                else {
                    console.log("\nel contacto de whatsapp no tiene foto: ", a)

                }
            })
        .catch(err => console.log(err))

    client.requestPresenceUpdate(cellphone)
        .then(
            () => {

            }
        )
    return res
}

const createCsWriter = require('csv-writer').createObjectCsvWriter;
// const { startKeepAliveRequest } = require('baileys/WhatsAppWeb.Session');

const datosWhats = []

module.exports.createCSV = async () => {
    const csvWriter = createCsWriter({
        path: 'tieneWhats.csv',
        header: [
            { id: 'phone', title: 'Celular' },
            { id: 'isonWhats', title: 'Tiene Whatsapp' }
        ]
    })
    csvWriter.writeRecords(datosWhats)
        .then(() => console.log("Csv creado"))

}


module.exports.findPhone = async (req, res) => {
    cellphone = req
    const datosWhats = []
    res = await client.isOnWhatsApp(cellphone)
        .then(
            ([status, phone]) => {
                datosWhats.push({ phone: phone, isonWhats: status })
                return datosWhats
            }
        )
        .catch(
            err =>
                console.log('No se puede encontrar el telefono: ',err)
        )
    return res
}

module.exports.connectAPI = async (req, res) => {
    const AUTH = req
    res = {}
    a = await client.connectSlim(AUTH, null)
        .then(
            b => {
                console.log('Hola : ', b.name)
                return b
            }
        )
        .catch(err => console.log("Desconectado Inesperadamente: " + err))
    if (req == null) {
        b = client.base64EncodedAuthInfo()
        res['KEY'] = b
    }
    res['ID'] = a
    return res
}

module.exports.enviarMensaje = async (req, res) => {
    cellphone = req.phone
    text = req.text
    client.sendTextMessage(cellphone, text)
        .then(a => console.log(a))
        .catch(err => console.log("error con el numero para enviar: " + err))
}

const buffer = fs.readFileSync("media/2.mp4")
module.exports.enviarImagen = async (req, res) => {
    const cellphone = req.phone
    // const buffer = req.buffMedia
    const options = { gif: false, caption: "*Video 1:*\nNombre del video que hace tal cosa" }
    // mediaType=req.media
    client.sendMediaMessage(cellphone, buffer, WhatsAppWeb.MessageType.video, options)
        .then(([a, b]) => {
            console.log("\nnum: ", b[2][0][2].key.remoteJid, " Estado: ", a.status)
        }
            // ,(rejected)=>console.log("rechazada : ",rejected)
        )
        .catch(err => console.log("error en el envio del video: " + err))
    // .then ( res.jsonp({mensaje:"enviado"}))

}
