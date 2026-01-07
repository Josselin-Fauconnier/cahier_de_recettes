const express = require('express');
const router = express.Router();
const multer = require('../Middlewares/multer-config'); 
const recetteController = require('../Controleurs/RecetteControleur');

router.post('/', multer, recetteController.createRecette);
router.get('/', recetteController.getAllRecettes);
router.get('/:id', recetteController.getRecetteById);
router.put('/:id', multer, recetteController.updateRecette);
router.delete('/:id', recetteController.deleteRecette);
module.exports = router;