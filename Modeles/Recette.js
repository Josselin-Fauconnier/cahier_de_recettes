const mongoose = require ('mongoose');
 
const recetteSchema = new mongoose.Schema ({
    Titre: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    Temps_prepataration: {
        type: Number,
        required: true,
    },
    Temps_cuisson:{
        type: Number,
        required: true,
    },

    Difficulté:{
        type: String,
        enum: ['Facile','Moyen','Diffcile'],
    },

    Prix: {
        type:Number,
    },

    Ustensiles : {
        type: [String],
        required: true,
    },
     Etapes: {
        type: [String],
        required: true,
     },

     Auteur: {
        type: String,
        required: true,
     },
     Date: {
        type: Date,
        default: Date.now,
     }
    });

    module.exports = mongoose.model('Recette', recetteSchema);





