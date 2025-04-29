// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let myServer = require("./app") ;

//Listen the server 

let port = 3000 ;

myServer.listen(port , function(){

    console.log(`Server is running @  ${port}`) ;

});

// Exports Code :


