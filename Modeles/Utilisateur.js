const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, "Le nom est obligatoire"],
        minlength: [2, "Le nom doit contenir au moins 2 caractères"]
    },

    Recettes_postées: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Veuillez entrer une adresse email valide"]
    },
    Mot_de_passe: {
        type: String,
        required: [true, "Le mot de passe est obligatoire"],
        minlength: [12, "Le mot de passe doit contenir au moins  12 caractères"]
    },
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);
