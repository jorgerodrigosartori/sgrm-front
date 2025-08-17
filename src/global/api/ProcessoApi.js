import axios from 'axios';
import { API_BASE_URL } from './EnderecoServidor';

export const listarProcessos = async (processo, marca) => {

    let url = `${API_BASE_URL}/v1/processo/listar`
    if (!marca)
        url = url + '?processo=' + processo;
    else url = url + '?marca=' + marca;
    return axios.get(url);
}


export const listarProcessosPorSemelhanca = async (qtRevistas) => {

    let url = `${API_BASE_URL}/v1/processo/radical`
    url = url + '?qtRevista=' + qtRevistas;
    return axios.get(url);
}

export const adicionarProcesso = async (processo) => {

    let url = `${API_BASE_URL}/v1/processo/${processo}`
    return axios.put(url);
}

