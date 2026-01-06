const  mongoose = require ('mongoose');

const utilisateurSchema = new mongoose.Schema ({
    nom: {
        type: String,
        required: true,
    },

    Recettes_postées:{
        type:Number,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    Mot_de_passe:{
        type: String,
        required: true,
    },
    });

    module.exports = mongoose.model('Utilisateur', utilisateurSchema);
