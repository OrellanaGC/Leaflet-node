module.exports = io => {
    io.on('connection', (socket) =>{
        console.log('New transfer websocket');

        socket.on('userCoordinates',coords => {
            socket.broadcast.emit('newUserCoordinates',coords);
        });
    });

}