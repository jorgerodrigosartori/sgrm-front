import axios from 'axios';

export const listarProcessos = async (processo, marca) => {

    let url = 'http://localhost:8080/v1/processo/listar'
    if (!marca)
        url = url + '?processo=' + processo;
    else url = url + '?marca=' + marca;
    return axios.get(url);
}


export const listarProcessosPorSemelhanca = async (qtRevistas) => {

    let url = 'http://localhost:8080/v1/processo/radical'
    url = url + '?qtRevista=' + qtRevistas;
    return axios.get(url);
}

export const adicionarProcesso = async (processo) => {

    let url = `http://localhost:8080/v1/processo/${processo}`
    return axios.put(url);
}

