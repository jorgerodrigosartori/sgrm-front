import axios from 'axios';
import { API_BASE_URL } from './EnderecoServidor';

export const baixaNovaRevista = async (revista) => {

    let url = `${API_BASE_URL}/v1/revista/carga/${revista}`;
    let a = axios.post(url);
    return a;
}

export const listarRevistas = async () => {

    let url = `${API_BASE_URL}/v1/revista/lista`;
    let a = axios.get(url);
    return a;
}

export const carregarProcessoRevista = async (processo, revista) => {

    let url = `${API_BASE_URL}/v1/revista/carga/${processo}/${revista}`
    return axios.get(url);
}