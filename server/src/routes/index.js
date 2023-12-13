const express = require('express');
const router = express.Router();

//controllers
const { PostProvinces } = require('../controllers/Post/PostProvinces');
const { GetProvinceById } = require('../controllers/Get/GetProvinceById');
const { GetProvinces } = require('../controllers/Get/GetProvinces');

//rutas

//get
router.get('/province', GetProvinces)
router.get('/province/:id', GetProvinceById)

//post
router.post('/provinces', PostProvinces)

module.exports = router