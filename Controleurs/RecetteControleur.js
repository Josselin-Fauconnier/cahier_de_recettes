const Recette = require('../Modeles/Recette');

exports.createRecette = async (req, res) => {
    try {
        const recette = new Recette({
            ...req.body,
            PhotosUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
        });
        await recette.save();
        res.status(201).json({ message: 'Recette créée avec succès', recette });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: "Erreur de validation", erreurs: messages });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.getAllRecettes = async (req, res) => {
    try {
        const { ingredient, tri, ordre, prixMax, tempsPrepaMax, tempsCuissonMax } = req.query;
        let filtre = {};


        if (ingredient) {
            filtre.ingredients = { $in: [new RegExp(ingredient, 'i')] };
        }



        if (prixMax) {
            filtre.Prix = { $lte: Number(prixMax) };
        }

        if (tempsPrepaMax) {
            filtre.Preparation = { $lte: Number(tempsPrepaMax) };
        }


        if (tempsCuissonMax) {
            filtre.Temps_cuisson = { $lte: Number(tempsCuissonMax) };
        }


        let sortOption = {};


        if (tri) {
            const sens = ordre === 'asc' ? 1 : -1;
            switch (tri) {
                case 'prix':
                    sortOption = { Prix: sens };
                    break;
                case 'preparation':
                    sortOption = { Preparation: sens };
                    break;
                case 'cuisson':
                    sortOption = { Temps_cuisson: sens };
                    break;
                case 'date':
                    sortOption = { Date: sens };
                    break;
                default:
                    sortOption = { Date: -1 };
            }
        } else {
            sortOption = { Date: -1 };
        }

        const recettes = await Recette.find(filtre).sort(sortOption);

        res.status(200).json({
            count: recettes.length,
            resultats: recettes
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération des recettes",
            error: error.message
        });
    }
};

exports.getRecetteById = async (req, res) => {
    try {
        const recette = await Recette.findOne({ _id: req.params.id });
        if (!recette) {
            return res.status(404).json({ message: 'Recette non trouvée !' });
        }
        res.status(200).json(recette);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.updateRecette = async (req, res) => {
    try {
        await Recette.updateOne({ _id: req.params.id }, { ...req.body });
        res.status(200).json({ message: 'Recette mis à jour' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteRecette = async (req, res) => {
    try {
        await Recette.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Recette supprimée' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



exports.addCommentaire = async (req, res) => {
    try {
        const { auteur, contenu } = req.body;
        const { id } = req.params;

        const recette = await Recette.findById(id);
        if (!recette) {
            return res.status(404).json({ message: "Recette non trouvée" });
        }

        recette.Commentaires.push({ auteur, contenu });
        await recette.save();

        res.status(201).json(recette);

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: "Erreur de validation", erreurs: messages });
        }
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "ID de recette invalide" });
        }
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
