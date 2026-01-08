const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
    Titre: {
        type: String,
        required: [true, "Le titre est obligatoire"],
        minlength: [3, "Le titre doit contenir au moins 3 caractères"]
    },
    PhotosUrl: {
        type: String,
    },

    ingredients: {
        type: [String],
        required: [true, "La liste des ingrédients est obligatoire"],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: "La recette doit comporter au moins un ingrédient"
        }
    },
    Preparation: {
        type: Number,
        required: [true, "Le temps de préparation est obligatoire"],
        min: [1, "Le temps de préparation doit être d'au moins 1 minute"]
    },
    Temps_cuisson: {
        type: Number,
        required: [true, "Le temps de cuisson est obligatoire"],
        min: [0, "Le temps de cuisson ne peut pas être négatif"]
    },

    Difficulte: {
        type: String,
        required: [true, "La difficulté est obligatoire"],
        enum: {
            values: ['Facile', 'Moyen', 'Difficile'],
            message: "La difficulté doit être : Facile, Moyen ou Difficile"
        }
    },

    Prix: {
        type: Number,
        min: [0, "Le prix ne peut pas être négatif"]
    },

    Ustensiles: {
        type: [String],
        required: [true, "La liste des ustensiles est obligatoire"]
    },
    Etapes: {
        type: [String],
        required: [true, "Les étapes de la recette sont obligatoires"],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: "La recette doit comporter au moins une étape"
        }
    },

    Auteur: {
        type: String,
        required: [true, "L'auteur est obligatoire"]
    },
    Date: {
        type: Date,
        default: Date.now,
    },

    Commentaires: [{
        auteur: {
            type: String,
            required: [true, "L'auteur du commentaire est obligatoire"]
        },
        contenu: {
            type: String,
            required: [true, "Le contenu du commentaire est obligatoire"]
        },
        date: { type: Date, default: Date.now },
    }]
});

module.exports = mongoose.model('Recette', recetteSchema);





