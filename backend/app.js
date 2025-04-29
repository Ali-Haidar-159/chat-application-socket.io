// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let express = require("express") ;
let app = express() ;

let http = require("http") ;
let path = require("path") ;

let {Server} = require("socket.io") ;

// creating server 

let myServer = http.createServer(app) ;

// Socket Code :

let io = new Server(myServer) ;

io.on("connection" , function(socket){

    console.log("user is connected : " , socket.id) ;

    socket.emit("user-details" , socket.id) ;

    socket.on("chatting" , function({roomValue , msgValue}){

        if(roomValue === "")
        {
            io.sockets.emit("chatting2" , msgValue , socket.id) ; //
            // console.log(msgValue) ;
        }
        else
        {
            socket.join(roomValue) ;
            io.sockets.to(roomValue).emit("chatting2" , msgValue , socket.id) ;
        }

    })

    socket.on("disconnect" , function(){

        console.log("user is disconnected : " , socket.id) ;

    })

})

// Connect With Server : 

app.use(express.static(path.join(__dirname , ".." , "frontend" , "public"))) ;

// Request-Response-Cycle : 

app.get("/" , function(req,res){

    res.status(200).sendFile(path.join(__dirname , ".." , "frontend" , "home.html")) ;

}) ;

// handle the route error 

app.use(function(req,res,next){

    res.status(404).json({

        status : 404 ,
        message : "page not found"

    });

});

// handle the server error 

app.use(function(err,req,res,next){
    
    res.status(500).json({

        status : 500 ,
        message : "Find server error",
        error : err

    });

});

// Exports Code :

module.exports = myServer ;
