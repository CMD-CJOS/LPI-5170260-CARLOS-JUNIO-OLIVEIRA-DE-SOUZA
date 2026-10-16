const { Router } = require('express');
const router = Router();

const vagasMock = [
    { id: 1, titulo: 'Dev Frontend React', empresa: 'TechNova', tipo: 'remoto' }
];

router.get('/', (req, res) => {
    res.json(vagasMock);
});

module.exports = router;