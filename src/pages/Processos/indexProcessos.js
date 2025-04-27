import { useContext, useEffect } from "react";
import Corpo from '../../components/Corpo/indexCorpo';
import ModalProcessando from '../../components/Modal/indexModalProcessando';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import axios from 'axios';
import styles from './Processos.module.css';
import { Badge, Button, TextField } from '@mui/material';
import { listarProcessosPorParametro } from "../../global/action/processoAction";
import { listarDespachosDoProcesso } from "../../global/action/despachoAction";
import { MyContext } from '../../global/contexto/MyContext';
import ModalDespachos from '../../components/Modal/indexModal';

const Processos = () => {

    const { state, dispatch } = useContext(MyContext);
    const [apresentarModalDespacho, setApresentarModalDespacho] = React.useState(false);
    const [despachosModal, setDespachosModal] = React.useState([]);


    useEffect(() => {
        dispatch({ type: "SET_LISTA_PROCESSOS", payload: [] });
    }, []);

    const adicionaProcesso = (processo, nome) => {

        axios.put(`http://localhost:8080/v1/processo/${processo}`)
            .then(resposta => {
                pesquisar();
                dispatch({ type: "SET_NOTIFICACAO_SUCESSO", payload: { mensagem: 'Processo ' + processo + ' (' + nome + ') adicionado a lista de Minhas marcas.' } });
            })
            .catch(err => {
                dispatch({ type: "SET_NOTIFICACAO_ERRO", payload: { mensagem: 'ERRO: ' + err } });
            })
    }

    const removerProcesso = (processo, nome) => {

        axios.delete(`http://localhost:8080/v1/processo/${processo}`)
            .then(resposta => {
                pesquisar();
                dispatch({ type: "SET_NOTIFICACAO_SUCESSO", payload: { mensagem: 'Processo ' + processo + ' (' + nome + ') removido da lista de Minhas marcas.' } });
            })
            .catch(err => {
                dispatch({ type: "SET_NOTIFICACAO_ERRO", payload: { mensagem: 'ERRO: ' + err } });
            })
    }

    const pesquisar = async () => {

        const marca = document.getElementById('marca').value;
        const processo = document.getElementById('processo').value;

        if (!marca && !processo) {
            dispatch({ type: "SET_NOTIFICACAO_ALERTA", payload: { mensagem: 'Informar a marca ou processo' } });
        } else {
            dispatch({ type: "SET_FILTRO_PESQUISA_PROCESSO", payload: { processo, marca } });
            listarProcessosPorParametro(dispatch, processo, marca);
        }
    };

    const abrirModal = (processo) => {

        listarDespachosDoProcesso(dispatch, processo);
        setApresentarModalDespacho(true);
    }

    const fecharModal = () => {
        setApresentarModalDespacho(false);
    }

    function apresentarBotaoAdicionarOuRemover(acompanhado, processo, nome) {

        if (acompanhado === 'S')
            return <div title='Deixar de acompanhar processo'><RemoveCircleIcon className={styles.iconesVermelho} style={{ cursor: 'pointer' }} onClick={e => removerProcesso(processo, nome)} /></div>;
        else return <div title='Acompanhar processo'><AddCircleIcon className={styles.iconesAzul} style={{ cursor: 'pointer' }} onClick={e => adicionaProcesso(processo, nome)} /></div>;
    }

    function apresentarListaProcessosPesquisados(lista) {

        if (lista && lista.length > 0) {
            return (
                <div style={{ with: '95%' }} >
                    <TableContainer component={Paper} sx={{ minWidth: 450, width: '95%' }} >
                        <Table sx={{ minWidth: 450, width: '95%' }} aria-label="simple table">
                            <TableHead sx={{ minWidth: 450, width: '95%' }} >
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Processo</TableCell>
                                    <TableCell align="left"><b>Marca</b></TableCell>
                                    <TableCell align="center"><b>Classe</b></TableCell>
                                    <TableCell align="left"><b>Status</b></TableCell>
                                    <TableCell align="left"><b>Despachos</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lista.map((row) => (
                                    <TableRow
                                        key={row.numeroProcesso}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                {apresentarBotaoAdicionarOuRemover(row.acompanhado, row.numeroProcesso, row.nomeMarca)}
                                            </div>
                                        </TableCell>
                                        <TableCell component="th" scope="row">{row.numeroProcesso}</TableCell>
                                        <TableCell align="left">{row.nomeMarca}</TableCell>
                                        <TableCell align="center">{row.classe}</TableCell>
                                        <TableCell align="left">{row.status}</TableCell>
                                        <TableCell sx={{ width: '5%' }} align="center">
                                            <div style={{ alignItems: 'center', gap: '4px', cursor: 'pointer' }} title='Listar despachos'>
                                                <Badge badgeContent={row.qtDespachos} style={{ color: 'red' }}> 
                                                    <ListAltIcon className={styles.iconesAzul} onClick={() => abrirModal(row.numeroProcesso)} />
                                                </Badge>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            );
        } else return (<div><br /><br /><br /><br /><br /><br /></div>);
    }

    return (
        <>
            <Corpo>
                <h2>Pesquisar processos</h2>
                <br />
                <form id='pesquisarProcesso' name='pesquisarProcesso'>
                    <TextField id="processo" label="Processo" size="small" variant="outlined" sx={{ width: 150, maxWidth: '100%', paddingRight: '30px' }} />
                    <TextField id="marca" label="Marca" size="small" variant="outlined" sx={{ width: 350, maxWidth: '100%', paddingRight: '30px' }} />
                    <Button variant="contained" onClick={pesquisar}>Pesquisar</Button>
                </form>
                <br /><br /><br />
                {apresentarListaProcessosPesquisados(state.processoReducer.processos)}
                <br />

                {/* Exibe o aviso "PROCESSANDO" enquanto isLoading é true */}

                <ModalProcessando apresentar={state.geral.isLoading} />

            </Corpo>
            <ModalDespachos
                apresentar={apresentarModalDespacho}
                titulo='Despachos do processo'
                clique={() => fecharModal()}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: '15%' }} align="left"><b>Revista</b></TableCell>
                        <TableCell sx={{ width: '20%' }} align="left"><b>Data</b></TableCell>
                        <TableCell sx={{ width: '65%' }} align="left"><b>Despacho</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.despachoReducer.despachos && state.despachoReducer.despachos.map((row) => (
                        <TableRow
                            key={row.numeroRevista} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell sx={{ width: '15%' }} align="center" component="th" scope="row">{row.numeroRevista}</TableCell>
                            <TableCell sx={{ width: '20%' }} align="center">{row.data}</TableCell>
                            <TableCell sx={{ width: '65%' }} align="left">{row.despacho}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </ModalDespachos>
            <br />
        </>
    )
}
export default Processos;