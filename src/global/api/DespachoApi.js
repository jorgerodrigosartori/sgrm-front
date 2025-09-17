import axios from 'axios';
import { API_BASE_URL } from './EnderecoServidor';

export const listarDespachosProcesso = async (processo) => {

    let url = `${API_BASE_URL}/v1/despacho/listar?processo=${processo}`
    return axios.get(url);
}

