import historicoInflacao from "../dados/dados.js";

export const listaInflacao = () => {
  return historicoInflacao;
};

export const listaFiltradaPorAno = (ano) => {
  return historicoInflacao.filter((item) => item.ano === ano);
};

export const listaFiltradaPorId = (id) => {
  return historicoInflacao.find((item) => item.id === id);
};

export const calculoDeIPCA = (
  valor,
  mesInicial,
  mesFinal,
  anoInicial,
  anoFinal
) => {
  let valorAjustado = valor;

  const dataInicial = new Date(anoInicial, mesInicial - 1);
  const dataFinal = new Date(anoFinal, mesFinal - 1);

  const mesesSelecionados = historicoInflacao.filter((item) => {
    const dataItem = new Date(item.ano, item.mes - 1);
    return dataItem >= dataInicial && dataItem <= dataFinal;
  });

  for (let mes of mesesSelecionados) {
    valorAjustado *= 1 + mes.ipca / 100;
  }

  return valorAjustado;
};
