const fs = require('fs');


function getProductdata (){
    const file = fs.readFileSync('../files/product.json', {encoding:'utf8'});
return JSON.parse(file) ;
}
module.exports = { getProductdata };