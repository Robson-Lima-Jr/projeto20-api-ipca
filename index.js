import express from 'express';
const app = express();

import historicoInflacao from './dados/dados.js';

app.get('/historicoIPCA', (req, res) => {
    const ano = parseInt(req.query.ano);
    const resultado = ano ? historicoInflacao.filter(item => item.ano === ano) : historicoInflacao;

    res.json(resultado);
});

app.get('/historicoIPCA/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const resultadoId = historicoInflacao.find(item => item.id === id);

    res.json(resultadoId);
})


app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080');
})