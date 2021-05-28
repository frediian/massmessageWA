const fs = require('fs')

const CSVToJSON = require('csvtojson')
CSVToJSON({
    delimiter:";",
    checkType:true,
    headers:['ced','nombre','phone','city'],
    colParser:{
        
		"ced":"omit",
        "phone":function(num){
            num = parseInt(num)
            if (num.toString().length>=9){
                return num
            }
            else{
                return "omit"
            }
        },
        "nombre":"string",
		"city":"omit",
	}
}).fromFile('dddd.csv')
    .then(whatsa=>{
        console.log(whatsa);
        fs.writeFile('fdsfsdf.json', JSON.stringify(whatsa, null,4), (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON array is saved.");
        });


    }).catch(err => {
        // log error if any
        console.log(err);
    });

// {

//     var lines=csv.split("\n");
  
//     var result = [];
  
//     // NOTE: If your columns contain commas in their values, you'll need
//     // to deal with those before doing the next step 
//     // (you might convert them to &&& or something, then covert them back later)
//     // jsfiddle showing the issue https://jsfiddle.net/
//     var headers=lines[0].split(";");
  
//     for(var i=1;i<lines.length;i++){
  
//         var obj = {};
//         var currentline=lines[i].split(";");
  
//         for(var j=0;j<headers.length;j++){
//             obj[headers[j]] = currentline[j];
//         }
  
//         result.push(obj);
  
//     }
  
//     //return result; //JavaScript object
//     return JSON.stringify(result); //JSON
//   }

//   csvJSON(whatsa);