const { numberWhatsApp } = require("./numberWhatsApp");
const fs = require('fs')
const numero = JSON.parse(fs.readFileSync("numero.json"))

module.exports.phoneStatus = async(req,res)=>{
    console.log("Verificando numero en WhatsApp/n")
    var cellphone = numberWhatsApp( )//ingresar numero celular

    client.getStatus (cellphone)
    .then(
        ([a,b,c])=>
        {
        console.log(a)
        console.log(b)
        console.log(c)

    })
    .catch(err=>console.log(err))
}
