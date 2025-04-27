import axios from 'axios';

export const marcaDesmarcaProcessoAcompanhadoAPI = async (processo, semelhante) => {

    let url = `http://localhost:8080/v1/processo-acompanhado/${processo}/${semelhante}`
    return axios.put(url);
}

export const listarProcessosAcompanhadosAPI = async () => {

    let url = 'http://localhost:8080/v1/processo/acompanhados'
    return axios.get(url);
}