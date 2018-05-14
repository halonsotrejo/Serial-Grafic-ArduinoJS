const express = require('express');
const app = express();
const socketIO = require('socket.io');
const http = require('http');

const server = http.createServer(app);

const io = socketIO.listen(server);

io.onconnection('connection', function(socket){
    Console.log('nuevo socket conectado');
});

app.get('/', (req, res, next)=>{
    res.sendFile(__dirname + 'index.html');
});

const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;
const parse = new Readline();

const mySerial = new SerialPort('COM3',{
    baudRate: 9600
});

mySerial.open('open',function(){
    console.log('Puerto abierto');
});

mySerial.open('data', function(data){
    console.log(data.toString);
    io.emit('arduino:data',{
        value: data.toString()
    });
});

mySerial.open('err', function(err){
    console.log(err.message);
});

server.listen(3000, function(){
    console.log('server on port ', 3000);
});