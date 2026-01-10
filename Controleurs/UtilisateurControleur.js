const Utilisateur = require('../Modeles/Utilisateur');
const { sendError } = require('../configurationJS/gestionnaireErreur');
const jwt = require('jsonwebtoken');

exports.createUtilisateur = async (req, res) => {
    try {
        const utilisateur = new Utilisateur({ ...req.body });
        await utilisateur.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès', utilisateur });
    } catch (error) {
        sendError(res, error);
    }
};

exports.getAllUtilisateurs = async (req, res) => {
    try {
        const utilisateurs = await Utilisateur.find();
        res.status(200).json(utilisateurs);
    } catch (error) {
        sendError(res, error);
    }
};

exports.getUtilisateurById = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findById(req.params.id);
        if (!utilisateur) {
            throw { isCustom: true, status: 404, message: 'Utilisateur non trouvé' };
        }
        res.status(200).json(utilisateur);
    } catch (error) {
        sendError(res, error);
    }
};

exports.updateUtilisateur = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true, runValidators: true });
        if (!utilisateur) {
            throw { isCustom: true, status: 404, message: 'Utilisateur non trouvé' };
        }
        res.status(200).json({ message: 'Utilisateur mis à jour', utilisateur });
    } catch (error) {
        sendError(res, error);
    }
};

exports.deleteUtilisateur = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByIdAndDelete(req.params.id);
        if (!utilisateur) {
            throw { isCustom: true, status: 404, message: 'Utilisateur non trouvé' };
        }
        res.status(200).json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        sendError(res, error);
    }
};

exports.connexionUtilisateur = async (req, res) => {
    try {

        const { email, Mot_de_passe } = req.body;


        const utilisateur = await Utilisateur.findOne({ email });


        if (!utilisateur) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const estValide = await utilisateur.comparePassword(Mot_de_passe);
        if (!estValide) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const token = jwt.sign(
            {
                utilisateurId: utilisateur._id,
                limiteAbsolue: Date.now() + (2 * 60 * 60 * 1000) 
            },
            'VOTRE_CLE_SECRETTE',
            { expiresIn: '30m' }
        );
        res.status(200).json({
            message: 'Connexion réussie',
            token,
            utilisateurId: utilisateur._id
        });
    } catch (error) {

        sendError(res, error);
    }
};
