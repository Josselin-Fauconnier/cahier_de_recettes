const Recette = require('../Modeles/Recette');
const { sendError } = require('../configurationJS/gestionnaireErreur');

exports.createRecette = async (req, res) => {
    try {
        const recette = new Recette({
            ...req.body,
            PhotosUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
        });
        await recette.save();
        res.status(201).json({ message: 'Recette créée avec succès', recette });
    } catch (error) {
        sendError(res, error);
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
        sendError(res, error);
    }
};

exports.getRecetteById = async (req, res) => {
    try {
        const recette = await Recette.findOne({ _id: req.params.id });
        if (!recette) {
            throw { isCustom: true, status: 404, message: 'Recette non trouvée !' };
        }
        res.status(200).json(recette);
    } catch (error) {
        sendError(res, error);
    }
};

exports.updateRecette = async (req, res) => {
    try {
        await Recette.updateOne({ _id: req.params.id }, { ...req.body });
        res.status(200).json({ message: 'Recette mis à jour' });
    } catch (error) {
        sendError(res, error);
    }
}

exports.deleteRecette = async (req, res) => {
    try {
        await Recette.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Recette supprimée' });
    } catch (error) {
        sendError(res, error);
    }
}



exports.addCommentaire = async (req, res) => {
    try {
        const { auteur, contenu } = req.body;
        const { id } = req.params;

        const recette = await Recette.findById(id);
        if (!recette) {
            throw { isCustom: true, status: 404, message: "Recette non trouvée" };
        }

        recette.Commentaires.push({ auteur, contenu });
        await recette.save();

        res.status(201).json(recette);

    } catch (error) {
        sendError(res, error);
    }
};
