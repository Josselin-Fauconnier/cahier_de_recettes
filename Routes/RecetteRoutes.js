const express = require('express');
const router = express.Router();
const recetteController = require('../Controleurs/RecetteControleur');

router.post('/', recetteController.createRecette);
router.get('/', recetteController.getAllRecettes);
router.get('/:id', recetteController.getRecetteById);
router.put('/:id', recetteController.updateRecette);
router.delete('/:id', recetteController.deleteRecette);


module.exports = router;