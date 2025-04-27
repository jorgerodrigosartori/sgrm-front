import axios from 'axios';

export const baixaNovaRevista = async (revista) => {

    let url = `http://localhost:8080/v1/revista/carga/${revista}`;
    let a = axios.post(url);
    return a;
}


export const listarRevistas = async () => {

    let url = 'http://localhost:8080/v1/revista/lista';
    let a = axios.get(url);
    return a;
}