const fs = require('fs')
const request = require('request')

const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url)
      .pipe(fs.createWriteStream(path))
      .on('close', callback)
  })
}

var fecha = Date.now();
const path = './images/'+fecha+'.jpg'

module.exports.imageDownload = async(req,res)=>{
    console.log("\nempezando a descargar ",req)
    download(req, path, () => {
  console.log('✅ Done!')
})
}