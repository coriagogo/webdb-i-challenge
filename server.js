const express = require('express');

const server = express();

// your code here

server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
    res.send('<h2>Welcome to the DB</h2>');
})

function logger(req, res, next) {
    const time = new Date();
    console.log(`${req.method} ${req.url} ${time}`)
    next();
}

module.exports = server;