const mongoose = require ('mongoose');
 
const recetteSchema = new mongoose.Schema ({
    Titre: {
        type: String,
        required: true,
    },
    PhotosUrl :{
        type:String,
    },

    ingredients: {
        type: [String],
        required: true,
    },
    Preparation: {
        type: Number,
        required: true,
    },
    Temps_cuisson:{
        type: Number,
        required: true,
    },

    Difficulte:{
        type: String,
        enum: ['Facile','Moyen','Difficile'],
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
     },

     Commentaires:[{
        auteur: String,
        contenue:String,
        date:{type: Date, default: Date.now},
     }]
    });

    module.exports = mongoose.model('Recette', recetteSchema);





