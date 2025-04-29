// initial code 
"use strict" 
console.clear() ;

// main code

// select all html component

let history = document.getElementById("history") ;
let msg = document.getElementById("msg") ;
let sendBtn = document.getElementById("sendBtn") ;
let room = document.getElementById("room") ;
let joinBtn = document.getElementById("joinBtn") ;
let user = document.getElementById("user") ;

// Socket Code 

let socket = io() ;

socket.on("user-details" , function(data){

    user.textContent = data ;

}) ;

let roomValue = room.value || "" ;
let msgValue = msg.value  ;

sendBtn.addEventListener("click", function(e){

    roomValue = room.value || "" ;
    msgValue = msg.value  ;

    if(roomValue === "")
        {
            socket.emit("chatting" , {msgValue , roomValue}) ;
        }
        else
        {
            socket.emit("chatting" , {roomValue , msgValue}) ;
        }

})

joinBtn.addEventListener("click" , function(){

    roomValue = room.value || "" ;
    msgValue = msg.value  ;

    if(roomValue === "")
    {
        alert("Write a room name or user id.") ;
    }
    else
    {
        alert(`Successfully connected with "${roomValue}" this user or room .`) ;
    }

})

socket.on("chatting2" , function(data , userID){ //

    let tag = document.createElement("li") ;
    tag.textContent = data ;

    if(userID === user.textContent) {
        tag.classList.add("my-msg");  
    } else {
        tag.classList.add("other-msg");  
    }

    history.appendChild(tag) ;

}) ;

