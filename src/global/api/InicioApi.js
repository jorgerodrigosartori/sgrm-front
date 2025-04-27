import axios from 'axios';

export const carregaDadosIniciais = async () => {

    let url = 'http://localhost:8080/v1/dados-iniciais'
    return axios.get(url);
}

