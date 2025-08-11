import express from 'express';
const app = express();

import historicoInflacao from './dados/dados.js';

app.get('/', (req, res) => {
    res.json(historicoInflacao);
});

app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080');
})