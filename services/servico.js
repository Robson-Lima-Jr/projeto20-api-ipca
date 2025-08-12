import historicoInflacao from "../dados/dados.js";

export const listaInflacao = () => {
    return historicoInflacao;
}

export const listaFiltradaPorAno = (ano) => {
    return historicoInflacao.filter(item => item.ano === ano);
}

export const listaFiltradaPorId = (id) => {
    return historicoInflacao.find(item => item.id === id);
}