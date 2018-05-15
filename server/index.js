const express = require('express');
const app = express();

const socketIO = require('socket.io');
const http = require('http');

const server = http.createServer(app);

const io = socketIO.listen(server);

io.on('connection', function(socket){
    Console.log('nuevo socket conectado');
});

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html');
});

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();

const mySerial = new SerialPort('COM8',{
    baudRate: 9600
});

mySerial.open('open', function(){
    console.log('Puerto abierto');
});

mySerial.open('data', function(data){
    //console.log(data.toString);
    io.emit('arduino:data',{
        value: data.toString()
    });
});

mySerial.open('error', function(error){
    console.log(error.message);
});

server.listen(3000, function(){
    console.log('server on port ', 3000);
});