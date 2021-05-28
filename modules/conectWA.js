const fs = require('fs')
const connectAPI = require('../whatsapp').connectAPI

const pathAUTH = './auth/auth_info.json'
const log = './logs/Session.csv'
const date = new Date()

function conectar(authInfo) {
    logSession =''
    const time = date.toString()
    logSession+=time
    if (fs.existsSync(authInfo)) {
        const logInfo = JSON.parse(fs.readFileSync(authInfo, 'utf-8'))
        connectAPI(logInfo)
            .then(
                (authJSON) => {
                    console.log("Coneccion Establecida ")
                    b=JSON.stringify(authJSON.ID.phone,'utf-8')
                    logSession+=';'+authJSON.ID.id+';'+b+'\n'
                    fs.appendFileSync(log, logSession,'utf-8')
                }
            )
            .catch(err => console.error("Error inesperado al Iniciar sesion: " + err))
    }
    else {
        connectAPI(null)
            .then(
                (authJSON) => {
                    console.log("Nueva coneccion Establecida ")
                    fs.writeFileSync(pathAUTH, JSON.stringify(authJSON.KEY, null))
                    b=JSON.stringify(authJSON.ID.phone,'utf-8')
                    logSession+=';'+authJSON.ID.id+';'+b+'\n'
                    logON= 'START SESSION;NUMBER;PHONE\n'+logSession
                    fs.writeFileSync(log, logON, 'utf-8')
                }
            )
            .catch(
                err => console.error("Error inesperado al Iniciar sesion: " + err)
            )
    }

}

module.exports.conectWA = async (req, res) => {
    conectar(pathAUTH)
    res.jsonp({ mensaje: "Estableciendo conexion" })
}