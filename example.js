
var fs = require('fs')

 fs.writeFile('maharjan.json', '{"firstname" : "nischal", "lname" : "maharjan" }', function (err) {
    if (err) throw err;
    console.log('Updated!');
});

