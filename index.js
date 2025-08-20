import express from "express";
const app = express();

import {
  listaInflacao,
  listaFiltradaPorAno,
  listaFiltradaPorId,
  calculoDeIPCA,
} from "./services/servico.js";

app.get("/historicoIPCA/calculo", (req, res) => {
  const valor = parseFloat(req.query.valor);
  const dataInicioMes = parseInt(req.query.mesInicial);
  const dataInicialAno = parseInt(req.query.anoInicial);
  const dataFinalMes = parseInt(req.query.mesFinal);
  const dataFinalAno = parseInt(req.query.anoFinal);

  /*  console.log("Parâmetros recebidos:", {
    valor,
    dataInicioMes,
    dataInicialAno,
    dataFinalMes,
    dataFinalAno,
  });*/

  //checagem se os valores digitados são numéricos ou nao
  if (
    isNaN(valor) ||
    isNaN(dataInicioMes) ||
    isNaN(dataInicialAno) ||
    isNaN(dataFinalMes) ||
    isNaN(dataFinalAno)
  ) {
    return res.status(400).send("Erro: os valores devem conter apenas números");
  }

  //ano inicial e final entre 2015 e 2023
  if (
    dataInicialAno < 2015 ||
    dataInicialAno > 2023 ||
    dataFinalAno < 2015 ||
    dataFinalAno > 2023
  ) {
    return res.status(400).send("Erro: os anos devem estar entre 2015 e 2023");
  }

  //mes inicial e mes final entre 1 e 12
  if (
    dataInicioMes < 1 ||
    dataInicioMes > 12 ||
    dataFinalMes < 1 ||
    dataFinalMes > 12
  ) {
    return res.status(400).send("Erro: os meses devem estar entre 1 e 12");
  }

  //ano final for 2023 , mes final deve ser entre 1 e 5
  if (dataFinalAno === 2023 && dataFinalMes > 5) {
    return res
      .status(400)
      .send(
        "Erro: se o ano final for 2023, o mês final deve estar entre 1 e 5"
      );
  }

  //data inicial nao pode ser maior que a final
  const dataInicial = dataInicialAno * 100 + dataInicioMes;
  const dataFinal = dataFinalAno * 100 + dataFinalMes;

  if (dataInicial > dataFinal) {
    return res
      .status(400)
      .send("Erro: a data inicial não pode ser maior que a data final");
  }

  //calculo do IPCA
  const resultadoIPCA = calculoDeIPCA(
    valor,
    dataInicioMes,
    dataFinalMes,
    dataInicialAno,
    dataFinalAno
  );

  res.json({
    valor: valor,
    valorFinal: resultadoIPCA.toFixed(2),
    periodo: `${dataInicioMes}/${dataInicialAno} a ${dataFinalMes}/${dataFinalAno}`,
  });
});

//busca por todos caso ano não seja colocado, se colocado busca por ano
app.get("/historicoIPCA", (req, res) => {
  const ano = req.query.ano ? parseInt(req.query.ano) : null;

  if (ano !== null && (isNaN(ano) || ano < 2015 || ano > 2023)) {
    return res.status(400).send("Erro: o ano deve ser um número entre 2015 e 2023");
  }

  const resultado = ano ? listaFiltradaPorAno(ano) : listaInflacao();

  res.json(resultado);
});

// busca por ID
app.get("/historicoIPCA/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const resultadoId = listaFiltradaPorId(id);

  if(isNaN(id)) {
    res.status(400).send("Erro: o ID deve ser um número");
    return;
  }

  if(!resultadoId) {
    res.status(404).send("Erro: ID não encontrado");
    return;
  }

  res.json(resultadoId);
});

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});
