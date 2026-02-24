const express = require('express');
const router = express.Router();
const {UtilisateurSchema}= require('../validationJoi/ValidationUtilisateur');
const utilisateurCtrl = require('../Controleurs/UtilisateurControleur');
const auth = require('../configurationJS/Auth');

const validationSchema = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        message: 'Erreur de validation',
        erreurs: error.details.map(d => d.message)
      });
    }
    next();
  };
};

router.post('/', validationSchema(UtilisateurSchema), utilisateurCtrl.createUtilisateur);
router.post('/connexion', utilisateurCtrl.connexionUtilisateur);
router.get('/', auth, utilisateurCtrl.getAllUtilisateurs);
router.get('/:id', utilisateurCtrl.getUtilisateurById);
router.put('/:id', auth, utilisateurCtrl.updateUtilisateur);
router.delete('/:id', auth, utilisateurCtrl.deleteUtilisateur);



module.exports = router;

