// const express=require('express');
// const app=express();
// const http=require('http');
// const server=http.createServer(app);//app is a request listner// expess helpps to communicate with server
// const path=require('path');
// const socketio=require('socket.io');
// const io=socketio(server);   // io is a object of socket.io and it is used to communicate with server and client and by helpof we make a websocket connection

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const socketio = require('socket.io');
const io = socketio(server);


const users={}; // to store all users
//
//for static files
app.use('/',express.static(path.join(__dirname,'public')));  // "/" ispar index.html wali file chl jayegi


// app.get('/',(req,res)=>{
//     res.render('./public/index.html')
// })






 

io.on('connection',(socket)=>{
    console.log(`connection established at ${socket.id}`);


    socket.on('send-msg',(data)=>{ // listen to some EVENT
        // console.log(data.msg);

        io.emit('recieve-msg',{    // emit is used to send data to client
        // socket.emit('recieve-msg',{
            msg:data.msg,
            username:users[socket.id] // socket.id is unique for every user
        })
    })

   socket.on('login',(data)=>{
      
users[socket.id]=data.username; // socket.id is unique for every user
//hmne socket.id ko username se map kr diya hm obje ko array ki trah likh skte he
   })


})








const port=process.env.PORT||8080;

server.listen(port,()=>{   // ah mere server http wala he naki express wala 
    console.log(`Server is running on port ${port}`);
})



