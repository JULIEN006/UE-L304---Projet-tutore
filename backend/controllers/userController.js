const db = require("../config/db");

exports.getUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) res.status(500).send(err);
    else res.json(result);
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, result) => {
    if (err) {
      return res.status(500).send({ message: "Erreur de serveur" });
    }
    if (result.length > 0) {
      res.json({
        message: "Connexion réussie",
        user: result[0]
      });
    } else {
      res.status(401).send({ message: "Email ou mot de passe incorrect" });
    }
  });
};