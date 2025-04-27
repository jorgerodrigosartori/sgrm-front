import { baixaNovaRevista, listarRevistas } from '../api/RevistaApi';

export const baixarNovaRevista = (dispatch, revista) => {

    dispatch({ type: "SET_IS_LOADING", payload: true });
    baixaNovaRevista(revista)
        .then(resposta => {

            dispatch({ type: "SET_DADOS_INICIAIS_ULTIMA_REVISTA", payload: resposta.data });
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
        .catch(err => {
            console.log("erro: " + err);
            dispatch({ type: "SET_NOTIFICACAO_ERRO", payload: {mensagem: 'ERRO: ' + err} });
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
}

export const carregarListaRevistas = (dispatch) => {

    dispatch({ type: "SET_IS_LOADING", payload: true });
    listarRevistas()
        .then(resposta => {
            dispatch({ type: "SET_LISTA_REVISTAS", payload: resposta.data });
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
        .catch(err => {
            console.log("erro: " + err);
            dispatch({ type: "SET_NOTIFICACAO_ERRO", payload: {mensagem: 'ERRO: ' + err} });
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
}