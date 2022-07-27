
const fs = require('fs');

function getUserdata (){
const data = fs.readFileSync('../files/users.json', {encoding:'utf8'});
return JSON.parse(data) ;
}



 function getUserdataupdate(user) {

//if(fs.writeFileSync('../files/users.json', JSON.stringify(datab ,null ,2)))
try{
  fs.writeFileSync('../files/users.json', JSON.stringify(user,null ,2))
  return true;
}catch(e){
  return false;
}
}

module.exports = { getUserdata  , getUserdataupdate } 

