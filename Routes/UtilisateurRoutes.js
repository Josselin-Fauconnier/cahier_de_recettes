const express = require('express');
const router = express.Router();
const utilisateurCtrl = require('../Controleurs/UtilisateurControleur');

router.post('/', utilisateurCtrl.createUtilisateur);
router.get('/', utilisateurCtrl.getAllUtilisateurs);
router.get('/:id', utilisateurCtrl.getUtilisateurById);
router.put('/:id', utilisateurCtrl.updateUtilisateur);
router.delete('/:id', utilisateurCtrl.deleteUtilisateur);

module.exports = router;
