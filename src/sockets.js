module.exports = io => {
    io.on('connection', (socket) =>{
        socket.on('userCoordinates',coords => {
            console.log(coords);
            coords.lat = coords.lat+(Math.random() * (0.09-0.01))+0.09;
            coords.lng = coords.lng+(Math.random() * (0.9-0.01))-0.09;
            socket.broadcast.emit('newUserCoordinates',coords);
            console.log(coords);
            console.log('New transfer websocket');
        });
        socket.on('my message', (msg) => {
            socket.emit('my broadcast', `server: ${msg}`);
            });
    });
    io.on('respond', function(data) {
        console.log(data);
        console.log('respuesta');
        });    
    io.on('disconnect', function() {
        console.log('Socket disconnected');
        });       

}

