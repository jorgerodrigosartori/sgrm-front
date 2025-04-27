import axios from 'axios';

export const listarDespachosProcesso = async (processo) => {

    let url = `http://localhost:8080/v1/despacho/listar?processo=${processo}`
    return axios.get(url);
}

