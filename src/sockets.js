module.exports = io => {
    io.on('connection', (socket) =>{
        socket.on('userCoordinates',coords => {
            console.log(coords);
            socket.emit('newUserCoordinates',coords);
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

