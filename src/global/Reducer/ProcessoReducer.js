
import { createContext } from 'react';

// Criar o contexto
export const MyContext = createContext();


export const initialState = {

    processoReducer: {
        processos: [],
        processoFiltro: '',
        marcaFiltro: '',
        processosSemelhantes: [],
    },
    processoAcompanhadoReducer:{
        processos : [],
    },
    despachoReducer: {
        despachos: [],

    },
    geral: {
        isLoading: false,
    },
    notificacao: {
        severidade: '',
        mensagem: '',
        visivel: false,
    },
    dadosIniciais: {},
    revista: {
        lista: [],
    }
};

export const reducer = (state, action) => {

    switch (action.type) {
        case "SET_LISTA_DESPACHOS":
            return { ...state, despachoReducer: { despachos: action.payload } };
        case "SET_LISTA_PROCESSOS_SEMELHANTES":
            return { ...state, processoReducer: { processosSemelhantes: action.payload } };
        case "SET_LISTA_PROCESSOS":
            return { ...state, processoReducer: { processos: action.payload } };
        case "SET_FILTRO_PESQUISA_PROCESSO":
            return { ...state, processoReducer: { processoFiltro: action.payload.processo, marcaFiltro: action.payload.marca } };
        case "SET_DADOS_INICIAIS":
            return { ...state, dadosIniciais: action.payload };
        case "SET_DADOS_INICIAIS_ULTIMA_REVISTA":
            return { ...state, dadosIniciais: { ...state.dadosIniciais, ultimaRevista: action.payload } };
        case "SET_IS_LOADING":
            return { ...state, geral: { isLoading: action.payload } };
        case "FECHA_NOTIFICACAO":
            return { ...state, notificacao: { visivel: false } };
        case "SET_NOTIFICACAO_SUCESSO":
            return { ...state, notificacao: { visivel: true, mensagem: action.payload.mensagem, severidade: 'success' } };
        case "SET_NOTIFICACAO_ALERTA":
            return { ...state, notificacao: { visivel: true, mensagem: action.payload.mensagem, severidade: 'warning' } };
        case "SET_NOTIFICACAO_ERRO":
            return { ...state, notificacao: { visivel: true, mensagem: action.payload.mensagem, severidade: 'error' } };
        case "SET_LISTA_REVISTAS":
            return { ...state, revista: { ...state.revista, lista: action.payload } };

        case "SET_LISTA_PROCESSOS_ACOMPANHADOS":
            return { ...state, processoAcompanhadoReducer: { ...state.processoAcompanhadoReducer, processos: action.payload } };

        default:
            return state;
    }
};