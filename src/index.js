const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
//websocket
const socketIO = require('socket.io');
const http = require('http');

//iniicalizations
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
      cors: {
        origin: ["http://localhost:3000","http://localhost:4200/"],
        methods: ["GET", "POST"],
        transports: [ 'websocket', 'polling' ]
      }
    });

//settings
app.engine('ejs', engine);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

//routes
app.use(require('./routes/'));

//sockets
require('./sockets')(io);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//starting the server
server.listen(3000, {log:false, origins:':'}, () => {
    console.log('Server on port 3000');
});
