import { listarProcessos, listarProcessosPorSemelhanca, adicionarProcesso} from '../api/ProcessoApi';

export const listarProcessosPorParametro = async (dispatch, processo, marca) => {

    dispatch({ type: "SET_IS_LOADING", payload: true });
    listarProcessos(processo, marca)
        .then(resposta => {
            if(resposta.data.length == 0){
                dispatch({ type: "SET_NOTIFICACAO_ALERTA", payload: {mensagem: 'Nenhum processo encontrado para o filtro informado.'} });
            }
            dispatch({ type: "SET_LISTA_PROCESSOS", payload: resposta.data });
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
        .catch(err => {
            console.log("erro: " + err);
            dispatch({ type: "SET_NOTIFICACAO_ERRO", payload: {mensagem: 'ERRO: ' + err} });
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
}

export const listarProcessosSemelhantes = async (dispatch, qtRevistas) => {

    dispatch({ type: "SET_IS_LOADING", payload: true });
    listarProcessosPorSemelhanca(qtRevistas)
        .then(resposta => {
            if(resposta.data.length == 0){
                dispatch({ type: "SET_NOTIFICACAO_ALERTA", payload: {mensagem: 'Nenhum processo com semelhança encontrado.'} });
            }
            dispatch({ type: "SET_LISTA_PROCESSOS_SEMELHANTES", payload: resposta.data });
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
        .catch(err => {
            console.log("erro: " + err);
            dispatch({ type: "SET_NOTIFICACAO_ERRO", payload: {mensagem: 'ERRO: ' + err} });
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
}

export const adicionarProcessoAcompanhamento = async (dispatch, processo, nome) => {

    dispatch({ type: "SET_IS_LOADING", payload: true });
    adicionarProcesso(processo)
        .then(resposta => {
            dispatch({ type: "SET_NOTIFICACAO_SUCESSO", payload: {mensagem: 'Processo ' + processo + ' (' + nome + ') adicionado a lista de Minhas marcas.'} });
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
        .catch(err => {
            dispatch({ type: "SET_NOTIFICACAO_ERRO", payload: {mensagem: 'ERRO: ' + err} });
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
}


