
// Node.js program to demonstrate the 
// fs.readFileSync() method
 
// Include fs module
const fs = require('fs');
  
// Calling the readFileSync() method
// to read 'input.txt' file
function getUserdata () {
const data = fs.readFileSync('../files/users.json', {encoding:'utf8'});
return JSON.parse(data) ;
}

 module.exports = {getUserdata};
            
            
 
// Display the file data
