import axios from 'axios';
import { API_BASE_URL } from './EnderecoServidor';

export const marcaDesmarcaProcessoAcompanhadoAPI = async (processo, semelhante) => {

    let url = `${API_BASE_URL}/v1/processo-acompanhado/${processo}/${semelhante}`
    return axios.put(url);
}

export const listarProcessosAcompanhadosAPI = async () => {

    let url = `${API_BASE_URL}/v1/processo/acompanhados`
    return axios.get(url);
}