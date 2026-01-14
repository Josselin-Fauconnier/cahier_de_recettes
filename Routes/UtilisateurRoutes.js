const express = require('express');
const router = express.Router();
const utilisateurCtrl = require('../Controleurs/UtilisateurControleur');
const auth = require('../configurationJS/Auth');

router.post('/', utilisateurCtrl.createUtilisateur);
router.post('/connexion', utilisateurCtrl.connexionUtilisateur);
router.get('/', auth, utilisateurCtrl.getAllUtilisateurs);
router.get('/:id', utilisateurCtrl.getUtilisateurById);
router.put('/:id', auth, utilisateurCtrl.updateUtilisateur);
router.delete('/:id', auth, utilisateurCtrl.deleteUtilisateur);

module.exports = router;

