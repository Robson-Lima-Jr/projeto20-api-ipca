import express from 'express';
const app = express();

import { listaInflacao, listaFiltradaPorAno, listaFiltradaPorId } from './services/servico';

app.get('/historicoIPCA', (req, res) => {
    const ano = parseInt(req.query.ano);
    const resultado = ano ? listaFiltradaPorAno(ano) : listaInflacao();

    res.json(resultado);
});

app.get('/historicoIPCA/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const resultadoId = listaFiltradaPorId(id);

    res.json(resultadoId);
})

app.get('/historicoIPCA/calculo', (req, res) => {
    const valor = parseInt(req.query.valor);
    const dataInicioMes = parseInt(req.query.mesInicial);
    const dataInicialAno = parseInt(req.query.anoInicial);
    const dataFinalMes = parseInte(req.query.mesFinal);
    const dataFinalAno = parseInt(req.query.anoFinal);


})

app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080');
})