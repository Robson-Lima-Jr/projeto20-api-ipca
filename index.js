import express from 'express';
const app = express();

import historicoInflacao from './dados/dados.js';

app.get('/historicoIPCA', (req, res) => {
    const ano = parseInt(req.query.ano);
    
    const dadosAno = historicoInflacao.filter(item => item.ano === ano);
    res.json(dadosAno);
});


app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080');
})