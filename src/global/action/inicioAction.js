
import { carregaDadosIniciais } from '../api/InicioApi';

export const carregaDadosTelaInicial = async (state, dispatch) => {

    dispatch({ type: "SET_IS_LOADING", payload: true });
    carregaDadosIniciais()
        .then(resposta => {
            dispatch({ type: "SET_DADOS_INICIAIS", payload: resposta.data });
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
        .catch(err => {
            console.log("erro: " + err);
            dispatch({ type: "SET_IS_LOADING", payload: false });
        })
}

