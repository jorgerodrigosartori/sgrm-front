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
            dispatch({ type: "SET_LISTA_PROCESSOS_ACOMPANHADOS", payload: resposta.data });
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
        .catch(err => {
            dispatch({ type: "SET_NOTIFICACAO_ERRO", payload: { mensagem: 'ERRO: ' + err } });
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
}
