const { Router } = require('express');
const router = Router();

const db = require('../database/db');
const auth = require('../middleware/auth.middleware');

router.get('/', (req, res) => {
  const vagas = db.prepare(`
    SELECT v.*, e.nome AS empresa_nome
    FROM vagas v
    JOIN empresas e ON e.id = v.empresa_id
    ORDER BY v.created_at DESC
  `).all();

  res.json(vagas);
});
router.post('/', auth, (req, res) => {
  const { titulo, tipo, tecnologias, salario, cep, cidade, estado, descricao } = req.body;
  if (!titulo || !tipo) {
    return res.status(400).json({ erro: 'Campos obrigatórios: titulo e tipo' });
  }

  const result = db.prepare(
    `INSERT INTO vagas (titulo, empresa_id, tipo, tecnologias, salario, cep, cidade, estado, descricao)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    titulo,
    req.empresa.id,
    tipo,
    tecnologias || '',
    salario || '',
    cep || '',
    cidade || '',
    estado || '',
    descricao || ''
  );

  const vaga = db.prepare('SELECT * FROM vagas WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(vaga);
});

router.get('/:id', (req, res) => {
  const vaga = db.prepare(
    `
    SELECT v.*, e.nome AS empresa_nome
    FROM vagas v
    JOIN empresas e ON e.id = v.empresa_id
    WHERE v.id = ?
  `).get(req.params.id);

  if (!vaga) {
    return res.status(404).json({ erro: 'Vaga não encontrada!' });
  }


  res.json(vaga);

});

router.delete('/:id', auth, (req, res) => {
  const result = db.prepare(
    'DELETE FROM vagas WHERE id = ? AND empresa_id = ?'
  ).run(req.params.id, req.empresa.id);

  if (result.changes === 0) {
    return res.status(404).json({ erro: 'Vaga não encontrada!' });
  }

  res.status(204).send();
});

module.exports = router;