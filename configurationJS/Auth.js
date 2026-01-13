const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error("Header d'autorisation manquant");
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'VOTRE_CLE_SECRETTE');


        if (Date.now() > decodedToken.limiteAbsolue) {
            return res.status(401).json({ message: "Session expirée (limite de 2h atteinte). Veuillez vous reconnecter." });
        }

        req.auth = { userId: decodedToken.utilisateurId };

        const newToken = jwt.sign(
            {
                utilisateurId: decodedToken.utilisateurId,
                limiteAbsolue: decodedToken.limiteAbsolue
            },
            'VOTRE_CLE_SECRETTE',
            { expiresIn: '30m' }
        );

        res.setHeader('x-refresh-token', newToken);

        next();
    } catch (error) {
        res.status(401).json({ message: "Echec de l'authentification ou session expirée" });
    }
}