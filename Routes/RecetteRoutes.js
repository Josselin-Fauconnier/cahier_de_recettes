const express = require('express');
const router = express.Router();
const multer = require('../configurationJS/multer-config');
const recetteController = require('../Controleurs/RecetteControleur');
const auth = require('../configurationJS/Auth');

router.post('/', auth, multer, recetteController.createRecette);
router.post('/:id/commentaires', auth, recetteController.addCommentaire);
router.get('/', recetteController.getAllRecettes);
router.get('/:id', recetteController.getRecetteById);
router.put('/:id', auth, multer, recetteController.updateRecette);
router.delete('/:id', auth, recetteController.deleteRecette);

module.exports = router;
