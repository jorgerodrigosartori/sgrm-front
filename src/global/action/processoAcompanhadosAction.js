import { marcaDesmarcaProcessoAcompanhadoAPI, listarProcessosAcompanhadosAPI } from '../api/ProcessoAcomponhandoApi';

export const marcarDesmarcarSemelhantesAction = async (dispatch, processo, semelhantes) => {

    dispatch({ type: "SET_IS_LOADING", payload: true });
    marcaDesmarcaProcessoAcompanhadoAPI(processo, semelhantes)
        .then(resposta => {
            listarProcessosAcompanhadosAction(dispatch);
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
        .catch(err => {
            console.log("erro: " + err);
            dispatch({ type: "SET_NOTIFICACAO_ERRO", payload: { mensagem: 'ERRO: ' + err } });
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
}

export const listarProcessosAcompanhadosAction = async (dispatch) => {

    dispatch({ type: "SET_IS_LOADING", payload: true });
    listarProcessosAcompanhadosAPI()
        .then(resposta => {
            dispatch({ type: "SET_LISTA_PROCESSOS_ACOMPANHADOS", payload: {lista: resposta.data, coluna: 'MARCA'}});
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
        .catch(err => {
            dispatch({ type: "SET_NOTIFICACAO_ERRO", payload: { mensagem: 'ERRO: ' + err } });
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
}

export const ordenarProcessosAcompanhadosAction = async (dispatch, lista, coluna) => {

    let novaLista = [];
    if (coluna === 'MARCA') {
        novaLista = lista.sort((a, b) => {
            if (a.nomeMarca == null && b.nomeMarca == null) return 0;
            if (a.nomeMarca == null) return -1; // a vem antes
            if (b.nomeMarca == null) return 1;  // b vem antes
            return a.nomeMarca.localeCompare(b.nomeMarca);
        });
    } else if (coluna === 'PROCESSO') {
        novaLista = lista.sort((a, b) => a.numeroProcesso - b.numeroProcesso);
    } else if (coluna === 'PRIMEIRA') {
        novaLista = lista.sort((a, b) => {
            const dataA = new Date(a.primeiraData.split("/").reverse().join("-"));
            const dataB = new Date(b.primeiraData.split("/").reverse().join("-"));
            return dataB - dataA;
        });
    } else if (coluna === 'ULTIMA') {
        novaLista = lista.sort((a, b) => {
            const dataA = new Date(a.ultimaData.split("/").reverse().join("-"));
            const dataB = new Date(b.ultimaData.split("/").reverse().join("-"));
            return dataB - dataA;
        });
    }
    dispatch({ type: "SET_LISTA_PROCESSOS_ACOMPANHADOS", payload: {lista: novaLista, coluna: coluna} });
}
