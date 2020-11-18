'use strict';
// catRoute

const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const multer  = require('multer');
const catController = require('../controllers/catController');

const fileFilter = (req, file, cb) =>{
  if(file.mimetype.includes('image')){
    cb(null, true)
  }else{
    cb(null, false)
  }
};


const upload = multer({ dest: './uploads/', fileFilter}); //app.js suhteen



const injectFile = (req, res, next) =>{
  if(req.file){
    req.body.mimetype = req.file.mimetype;
  }
  next();
};


router.get('/', catController.cat_list_get);


router.get('/:id', catController.cat_get);

router.post('/', upload.single('cat'), injectFile, catController.make_thumbnail,[
    body('name', 'Nimi vaaditaan').isLength({min:1}),
    body('age', 'Ikä numeroina vaaditaan').isLength({min:1}).isNumeric(),
    body('weight', 'Paino numeroina vaaditaan').isLength({min:1}).isNumeric(),
    body('owner', 'Omistajan numero vaaditaan').isLength({min:1}).isNumeric(),
    body('mimetype', 'Kuvatiedosto vaaditaan').contains('image'),
], catController.cat_create_post);

router.put('/', [
  body('name', 'Nimi vaaditaan').isLength({min:1}),
  body('age', 'Ikä numeroina vaaditaan').isLength({min:1}).isNumeric(),
  body('weight', 'Paino numeroina vaaditaan').isLength({min:1}).isNumeric(),
  body('owner', 'Omistajan numero vaaditaan').isLength({min:1}).isNumeric(),
], catController.cat_update_put);

router.delete('/:id', catController.cat_delete);


module.exports = router;