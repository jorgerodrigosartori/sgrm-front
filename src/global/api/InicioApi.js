import axios from 'axios';
import { API_BASE_URL } from './EnderecoServidor';

export const carregaDadosIniciais = async () => {

    let url = `${API_BASE_URL}/v1/dados-iniciais`
    return axios.get(url);
}

