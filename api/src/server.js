const express = require('express');
const cors = require('cors');
<<<<<<< HEAD
const { timeStamp } = require('node:console');
require('../database/db');

const vagasRoutes = require('./routes/vagas.routes');
=======
require('dotenv').config();
>>>>>>> 254d7fd20905e3670343b3106d76ec90acc530a9

const app = express();
const PORT = process.env.PORT || 3001;
require('./database/db');

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    projeto: 'DevJobs API',
    timestamp: new Date().toISOString()
  });
});

const vagasRoutes = require('./routes/vagas.routes');
app.use('/api/vagas', vagasRoutes);

const authRoutes = require('./routes/auth.routes')
app.use('/api/auth', authRoutes);

const cepRoutes = require('./routes/cep.routes')
app.use('/api/cep', cepRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

app.listen(PORT, () => {
  console.log(`DevJobs API rodando em http://localhost:${PORT}`);
});

<<<<<<< HEAD
app.use('/api/vagas', vagasRoutes);
=======
>>>>>>> 254d7fd20905e3670343b3106d76ec90acc530a9
