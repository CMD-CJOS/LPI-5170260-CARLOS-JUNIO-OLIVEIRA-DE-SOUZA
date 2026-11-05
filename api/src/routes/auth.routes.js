const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db');

const router = Router();

router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (typeof email !== 'string' || typeof senha !== 'string') {
        return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    const empresa = db.prepare('SELECT * FROM empresas WHERE email = ?').get(email);

    if (!empresa || !bcrypt.compareSync(senha, empresa.senha_hash)) {
        return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    const empresaAutenticada = {
        id: empresa.id,
        nome: empresa.nome,
        email: empresa.email
    };
    const token = jwt.sign(empresaAutenticada, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({ token, empresa: empresaAutenticada });
});

module.exports = router;