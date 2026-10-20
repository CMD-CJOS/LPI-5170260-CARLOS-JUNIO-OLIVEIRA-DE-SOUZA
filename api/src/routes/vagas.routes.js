const { Router } = require('express');
const router = Router();
const db = require('../database/db')

// const vagasMock = [
//     {
//     id: 7,
//     titulo: 'Engenheiro(a) de Automação de Testes (QA Pleno)',
//     empresa: 'NTT DATA',
//     tipo: 'remoto',
//     tecnologias: ['Java', 'Python', 'Cypress', 'Selenium', 'RestAssured', 'Postman', 'Cucumber', 'SQL'],
//     salario: 'R$ 7.500 – R$ 11.000',
//     local: 'Remoto / Uberlândia, MG',
//     requisitos: [
//         'Experiência com automação de testes de API e Frontend',
//         'Domínio em Java, Python, Selenium, Cypress e RestAssured',
//         'Vivência com BDD (Cucumber), integração contínua e SQL',
//         'Desejável certificação ISTQB (CTFL/CTFL-AT) ou AZ-900'
//     ]
// }, 
//     {
//         id: 1,
//         titulo: 'Desenvolvedor(a) Frontend React',
//         empresa: 'TechNova Ltda',
//         tipo: 'remoto',
//         tecnologias: ['React', 'TypeScript', 'CSS'],
//         salario: 'R$ 6.000 – R$ 9.000',
//         local: 'Remoto'
//     },
//     {
//         id: 2,
//         titulo: 'Backend Node.js',
//         empresa: 'DataFlow',
//         tipo: 'hibrido',
//         tecnologias: ['Node.js', 'PostgreSQL', 'Express'],
//         salario: 'R$ 7.000 – R$ 10.000',
//         local: 'São Paulo, SP'
//     },
//     {
//         id: 3,
//         titulo: 'Analista de QA Automação',
//         empresa: 'QualityTech',
//         tipo: 'remoto',
//         tecnologias: ['Cypress', 'JavaScript', 'Postman'],
//         salario: 'R$ 6.500 – R$ 9.500',
//         local: 'Remoto'
//     },
//     {
//         id: 4,
//         titulo: 'Desenvolvedor(a) Java Sênior',
//         empresa: 'Enterprise Core',
//         tipo: 'presencial',
//         tecnologias: ['Java', 'Spring Boot', 'Oracle'],
//         salario: 'R$ 11.000 – R$ 15.000',
//         local: 'Belo Horizonte, MG'
//     },
//     {
//         id: 5,
//         titulo: 'Engenheiro(a) DevOps',
//         empresa: 'CloudOps',
//         tipo: 'remoto',
//         tecnologias: ['AWS', 'Docker', 'Kubernetes'],
//         salario: 'R$ 9.000 – R$ 13.000',
//         local: 'Remoto'
//     },
//     {
//         id: 6,
//         titulo: 'Desenvolvedor(a) Full Stack Python',
//         empresa: 'Nexus Lab',
//         tipo: 'hibrido',
//         tecnologias: ['Python', 'Django', 'React'],
//         salario: 'R$ 8.000 – R$ 11.000',
//         local: 'Uberlândia, MG'
//     }
// ];

// router.get('/', (req,res) => {
//     res.json(vagasMock);
// });

router.get('/',(req,res) => {
    const vagas = db.prepare(`
            SELECT v.*, e.nome as empresa_nome
            from vagas v
            JOIN empresas e ON e.id = v.empresa_id
            ORDER BY v.created_at DESC
        `).all();
            res.json(vagas)
        });

module.exports = router;
