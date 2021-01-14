const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
//websocket
const socketIO = require('socket.io');
const http = require('http');

//iniicalizations
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

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
server.listen(3000, () => {
    console.log('Server on port 3000');
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});
