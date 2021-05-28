const fs = require('fs')
const datos = JSON.parse(fs.readFileSync("numerosF.json"))
var final = {}
// const longitud = datos.length+1
    for (var i=1; i<datos.length;i++){
        // console.log(datos[i].phone)
        phone1= datos[i].phone
        var phone = '593'+phone1
        var nombre = datos[i].nombre
        texto1="Buen día\n"+nombre+"\n\n"
        texto2=""
        texto3="*Video 1:*\nTitulo\n\nenlace de youtube"

        final[i]={"phone":phone,"text":{1:texto1,2:texto2}}
    }
var texto = {}
texto["destiny"]={"phones":Object.keys(final).length}
texto["data"]=final
// }
console.log(texto.destiny)
console.log(texto.data[1].text)

const datosFinal= JSON.stringify(texto)
fs.writeFileSync("mensajesenviados.json", datosFinal)

