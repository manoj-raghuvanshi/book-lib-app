const Router = require('express').Router;
const fs = require('fs');
const uuidv1 = require('uuid/v1');

const router = Router();

router.get('/books/:id', (req, res, next) => {
    let bookJson = require('./books');
    console.log(req.params);
    let book = bookJson.books.filter(e => e.id === req.params.id);
    res.send(book);
});

router.post('/books', (req, res, next) => {
    let reqBody = req.body;
    console.log(req);
    reqBody.id = uuidv1();
    let bookJson = require('../books');
    console.log(bookJson, reqBody);
    if (
        bookJson.books.findIndex(e => reqBody.name && e.name === reqBody.name) >
        -1
    ) {
        console.log('exists');
        res.status(409).json({ message: 'record already exists' });
        next();
    } else {
        bookJson.books.push(reqBody);
        var getDirName = require('path').dirname;
        console.log(getDirName('books.json'));
        let data = JSON.stringify(bookJson);
        fs.writeFileSync('books.json', data);
        res.send(data);
        next();
    }
});

router.put('/books/:id', (req, res) => {
    const reqBody = req.body;
    let bookJson = require('../books');
    const idx = bookJson.books.findIndex(e => e.id === req.params.id);
    if (idx > -1) {
        bookJson.books[idx].name = reqBody.name;
        console.log(bookJson);
        let data = JSON.stringify(bookJson);
        fs.writeFileSync('books.json', data);
        res.send({ message: 'book updated' });
    } else {
        res.status(400).send({ message: 'book does not exist' });
    }
});

router.delete('/books/:id', (req, res) => {
    let bookJson = require('../books');
    const idx = bookJson.books.findIndex(e => e.id === req.params.id);
    if (idx > -1) {
        bookJson.books.splice(idx, 1);
        console.log(bookJson);
        let data = JSON.stringify(bookJson);
        fs.writeFileSync('books.json', data);
        res.send({ message: 'book deleted' });
    } else {
        res.status(400).send({ message: 'book does not exist' });
    }
});

router.get('/books', (req, res) => {
    let books = require('../books');
    console.log(books);
    res.send(books);
});

module.exports = router;
