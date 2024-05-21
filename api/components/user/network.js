const express = require('express');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();

// Routes

router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.put('/', upsert)
router.delete('/', remove)


// Funciones

function list(req, res) {
    Controller.list()
    .then((list) => {
        response.succes(req, res, list, 200);
    })
    .catch((err) => {
        response.error(req, res, err.message, 500)
    })
}

function get(req, res) {
    Controller.get(req.params.id)
    .then((get) => {
        response.succes(req, res, get, 200)
    })
    .catch((err) => {
        response.error(req, res, err.message, 500)
    })
}

function upsert(req, res) {
    console.log(req.body);
    Controller.post(req.body)
    .then((data) => {
        response.succes(req, res, data, 200)
    })
    .catch((err) => {
        response.error(req, res, err.message, 500)
    })
}

function remove(req, res) {
    Controller.remove(req.params.id)
    .then((data) => {
        response.succes(req, res, data, 200)
    })
    .catch((err) => {
        response.error(req, res, err.message, 500)
    })
}

module.exports = router