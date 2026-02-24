const Joi = require('joi');

const UtilisateurSchema = Joi.object({
    nom:Joi.string()
    .min(2)
    .required(),
    
    email:Joi.string()
    .email()
    .required(),

    Mot_de_passe:Joi.string()
    .min(12)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/)
    .required()
});

module.exports = {UtilisateurSchema};