const Utilisateur = require('../Modeles/Utilisateur');
const { sendError } = require('../configurationJS/gestionnaireErreur');

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
