import { useContext } from 'react';
import { MyContext } from '../../global/contexto/MyContext';
import Corpo from '../../components/Corpo/indexCorpo';
import ModalDespachos from '../../components/Modal/indexModal';
import * as React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TableHead from '@mui/material/TableHead';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Badge from '@mui/material/Badge';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useEffect } from 'react';
import axios from 'axios';
import styles from './Acompanhar.module.css';
import {marcarDesmarcarSemelhantesAction, listarProcessosAcompanhadosAction} from '../../global/action/processoAcompanhadosAction.js';
import ModalProcessando from '../../components/Modal/indexModalProcessando.js';

const Acompanhar = () => {

    const { state, dispatch } = useContext(MyContext);

    const [apresentarModalDespacho, setApresentarModalDespacho] = React.useState(false);
    const [despachosModal, setDespachosModal] = React.useState([]);

    const marcaDesmarcaProcessoAcompanhado = async (processo, semelhantes) =>{

        marcarDesmarcarSemelhantesAction(dispatch, processo, semelhantes);
    }

    const removerProcesso = async (processo, nome) => { 

        axios.delete(`${API_BASE_URL}/v1/processo/${processo}`)
            .then(resposta => {
                carregaListaMarcasAcompanhar();
                dispatch({ type: "SET_NOTIFICACAO_SUCESSO", payload: { mensagem: 'Processo ' + processo + ' (' + nome + ') removido com sucesso.' } });
            })
            .catch(err => {
                dispatch({ type: "SET_NOTIFICACAO_ERRO", payload: { mensagem: 'ERRO: ' + err } });
            })
    }

    useEffect(() => {
        carregaListaMarcasAcompanhar();
    }, [])

    //const pesquisar = async () => {
    const carregaListaMarcasAcompanhar = async () => {

        listarProcessosAcompanhadosAction(dispatch);

        
    }

    const abrirModal = (despachos) => {
        setApresentarModalDespacho(true);
        setDespachosModal(despachos);
    }

    const fecharModal = () => {
        setApresentarModalDespacho(false);
    }

    function apresentarEstrela(processo, semelhantes){

        if(semelhantes && semelhantes === 'S')
            return (
                <div title='Deixar de verificar senelhanças'>
                    <GradeIcon className={styles.iconesAzulEscuro} onClick={e => marcaDesmarcaProcessoAcompanhado(processo, 'N')}/>
                </div>)
        else return (
            <div title='Verificar semelhanças'>
                <StarBorderIcon className={styles.iconesAzul} onClick={e => marcaDesmarcaProcessoAcompanhado(processo, 'S')} />
            </div>)
    }

    function apresentarTabelaResultadoPesquisa(lista) {

        if (lista && lista.length > 0) {
            return (
                <div style={{ width: '95%' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: '450px', width: '95%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell><b>Processo</b></TableCell>
                                    <TableCell align="left"><b>Marca</b></TableCell>
                                    <TableCell align="center"><b>Classe</b></TableCell>
                                    <TableCell align="left"><b>Status</b></TableCell>
                                    <TableCell align="center"><b>Despachos</b></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lista.map((row) => (
                                    <TableRow
                                        key={row.numeroProcesso}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <div title='Remover processo da lista' >
                                                    <RemoveCircleIcon className={styles.iconesVermelho} style={{ cursor: 'pointer' }} onClick={e => removerProcesso(row.numeroProcesso, row.nomeMarca)} />
                                                </div>
                                                
                                            </div>
                                        </TableCell>
                                        <TableCell component="th" scope="row">{row.numeroProcesso}</TableCell>
                                        <TableCell align="left">{row.nomeMarca}</TableCell>
                                        <TableCell align="center">{row.classe}</TableCell>
                                        <TableCell align="left">{row.status}</TableCell>
                                        <TableCell align="center">
                                            <div style={{ alignItems: 'center', gap: '4px' }} title='Listar despachos'>
                                                <Badge badgeContent={row.qtDespachos} style={{ color: 'red' }}>
                                                    <ListAltIcon className={styles.iconesAzul} onClick={() => abrirModal(row.despachos)} />
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell>{apresentarEstrela(row.numeroProcesso, row.semelhantes)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            );
        } else return (<div><br /><br /><h4>Nenhum processo selecionado para acompanhamento.</h4></div>);
    }

    return (
        <>
            <Corpo>
                <h2>Acompanhar registros</h2>
                {apresentarTabelaResultadoPesquisa(state.processoAcompanhadoReducer && state.processoAcompanhadoReducer.processos)}
                <br /><br />
                <ModalProcessando apresentar = {state.geral.isLoading}/>
            </Corpo>
            <ModalDespachos
                apresentar={apresentarModalDespacho}
                titulo='Despachos do processo'
                clique={() => fecharModal()}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Revista</TableCell>
                        <TableCell align="left"><b>Data</b></TableCell>
                        <TableCell align="left"><b>Despacho</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {despachosModal.map((row) => (
                        <TableRow
                            key={row.numeroRevista} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell align="center" component="th" scope="row">{row.numeroRevista}</TableCell>
                            <TableCell align="center">{row.data}</TableCell>
                            <TableCell align="left">{row.despacho}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </ModalDespachos>
        </>
    )
}

export default Acompanhar;