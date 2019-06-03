const express = require('express');

const server = express();

const Accounts = require('./data/accounts-model.js');

// your code here

server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
    res.send('<h2>Welcome to the DB</h2>');
})

server.get('/api/accounts', async (req, res) => {
    try {
        const accounts = await Accounts.find(req.query);
        res.status(200).json(accounts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving accounts.' });
    }
});

server.get('/api/accounts/:id', async (req, res) => {
    try {
        const singleAcct = await Accounts.findById(req.params.id);
        res.status(200).json(singleAcct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Account not found.' });
    }
});

server.post('/api/accounts', async (req, res) => {
    try {
        const newAcct = await Accounts.add(req.body);
        res.status(201).json(newAcct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding account.' });
    }
});

server.put('/api/accounts/:id', async (req, res) => {
    try {
        res.status(200).json( await Accounts.update(req.params.id, req.body));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating account.' });
    }
});

server.delete('/api/accounts/:id', async (req, res) => {
    try {
        res.status(200).json(await Accounts.remove(req.params.id));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error removing account.' });
    }
});

function logger(req, res, next) {
    const time = new Date();
    console.log(`${req.method} ${req.url} ${time}`)
    next();
}

module.exports = server;