'use strict';
const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const multer  = require('multer');
const userController = require('../controllers/userController');

const upload = multer({ dest: './uploads/' }); //app.js suhteen

router.get('/', userController.user_list_get);


router.get('/:id', userController.user_get);

router.post('/', [
    body('name', 'Vähintään 3 merkkiä').isLength({min: 3}),
    body('email', 'Kunnollinen sähköposti vaaditaan').isEmail(),
    body('passwd', 'Salasana vähintään 8 merkkiä, joista yksi iso kirjain').matches('(?=.*[A-Z]).{8,}'),
], userController.user_create_post);

router.put('/', (req,res) =>{
  res.send('With this endpoint you can edit users.')
});

router.delete('/', (req,res) =>{
  res.send('With this endpoint you can delete users.')
});

module.exports = router;