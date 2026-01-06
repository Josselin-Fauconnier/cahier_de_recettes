const express = require ('express');
const router = express.Router();
const recetteController = ('../Controleurs/RecetteControleur');

router.post('/recettes', recetteController.createRecette);
router.get('/recettes', recetteController.getAllRecettes);
router.get('/recettes/:id', recetteController.getRecettesById);
router.put('/recettes/:id' , recetteController.updateRecette);
router.delete('/recettes/:id' , recetteController.deleteRecette);


module.exports = router;