import { listarDespachosProcesso} from '../api/DespachoApi';

export const listarDespachosDoProcesso = async (dispatch, processo) => {

    dispatch({ type: "SET_IS_LOADING", payload: true });
    dispatch({ type: "SET_LISTA_DESPACHOS", payload: [] });
    listarDespachosProcesso(processo)
        .then(resposta => {
            if(resposta.data.length == 0){
                dispatch({ type: "SET_NOTIFICACAO_ALERTA", payload: {mensagem: 'Nenhum despacho para o processo selecionado.'} });
            }
            dispatch({ type: "SET_LISTA_DESPACHOS", payload: resposta.data });
            dispatch({ type: "SET_IS_LOADING", payload: false });
            return resposta.data;
        })
        .catch(err => {
            console.log("erro: " + err);
            dispatch({ type: "SET_NOTIFICACAO_ERRO", payload: {mensagem: 'ERRO: ' + err} });
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
}

