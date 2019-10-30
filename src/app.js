let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendfile('index.html');
});

let client = 0;
//whenver someone connects
io.on('connection', (socket) => {
	console.log('A user connected');
	// setTimeout(()=>{
	// 	// socket.send('Message after 4 seconds')

	// 	  //Sending an object when emmiting an even
	// 	  socket.emit('testEvent',{description:'My new message'})
	// },4000)

	// handle event come from client side
	// socket.on('clientEvent', function (data) {
	// 	console.log(data);
	// });
	client++;
	io.sockets.emit('broadcast', {
		description: client + ' clients connected!'
	});
	socket.on('disconnect', () => {
		client--;
		console.log(' A user disconnected');
	});
});

http.listen(3000, () => {
	console.log("Listening on : 3000");
});