// npm install express
const express = require("express");
const app = express();
// server
const httpServer = require("http").createServer(app);
const socketServer = require("socket.io")(httpServer);
// const path = require("path");
app.use(express.static("activity"));
app.get('/home', function (req, res) {
    console.log('home');
})
socketServer.on("connection", function (socket) {
    console.log("New client connected")
    console.log(socket.id);
    // listener=> recieve
    socket.on("colorChange", function (color) {
        console.log(color);
        socket.broadcast.emit('rColorChange', color);
    })
    socket.on('widthChange', function( width ){
        console.log('width change :'+width );
        socket.broadcast.emit( 'serverWidthChange', width );
    })
    socket.on("md", function (point) {
        console.log(point);
        socket.broadcast.emit('onmd', point);
    })
    socket.on("mm", function (point) {
        console.log(point);
        socket.broadcast.emit('onmm', point);
    })
})
//  tcp => uniquely identify server on a machine
let port = process.env.PORT || 3000;
httpServer.listen(port, function (req,res) {
    console.log("Server is listening to request at port 3000");
})
