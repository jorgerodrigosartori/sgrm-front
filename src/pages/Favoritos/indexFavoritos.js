import { useContext, useEffect } from "react";
import Corpo from '../../components/Corpo/indexCorpo';
import ModalProcessando from '../../components/Modal/indexModalProcessando';
import * as React from 'react';
import { MyContext } from '../../global/contexto/MyContext';
import { listarProcessosSemelhantes } from "../../global/action/processoAction";
import { listarDespachosDoProcesso } from "../../global/action/despachoAction";
import { Badge, Button, Collapse, FormControl, FormControlLabel, FormLabel, IconButton, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import ListAltIcon from '@mui/icons-material/ListAlt';
import ModalDespachos from '../../components/Modal/indexModal';
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import styles from './Favoritos.module.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { adicionarProcessoAcompanhamento } from "../../global/action/processoAction";

const Favoritos = () => {

    const { state, dispatch } = useContext(MyContext);

    const [apresentarModalDespacho, setApresentarModalDespacho] = React.useState(false);
    const [despachosModal, setDespachosModal] = React.useState([]);
    const [valorSelecionado, setValorSelecionado] = useState("1");

    useEffect(() => {
        dispatch({ type: "SET_LISTA_PROCESSOS_SEMELHANTES", payload: [] });
    }, []);

    const handleChange = (event) => {
        setValorSelecionado(event.target.value);
      };


    const pesquisar = async () => {

        listarProcessosSemelhantes(dispatch, valorSelecionado);
    };

    const [expandedRow, setExpandedRow] = useState(null);

    const handleRowClick = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    const abrirModal = (processo) => {

        listarDespachosDoProcesso(dispatch, processo);
        setApresentarModalDespacho(true);
    }

    const fecharModal = () => {
        setApresentarModalDespacho(false);
    }

    const adicionarProcesso = (processo, nome) => {

        adicionarProcessoAcompanhamento(dispatch, processo, nome);
    }

    function apresentarListaProcessosPesquisados(lista) {

        if (lista && lista.length > 0) {
            return (
                <div  >
                    <TableContainer component={Paper} sx={{ minWidth: '450px', width: '95%' }}>
                        <Table sx={{ minWidth: '450px', width: '95%' }} aria-label="simple table" style={{ paddingBottom: 0, paddingTop: 0 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: '5%' }} />
                                    <TableCell sx={{ width: '20%' }}><b>Processo</b></TableCell>
                                    <TableCell sx={{ width: '70%' }} align="left"><b>Marca</b></TableCell>
                                    <TableCell sx={{ width: '5%' }}><b>Classe</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lista.map((row, index) => (
                                    <React.Fragment key={row.numeroProcesso}>
                                        <TableRow
                                            key={row.numeroProcesso}
                                            onClick={() => handleRowClick(index)} style={{ cursor: 'pointer' }}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                            <TableCell>
                                                <IconButton size="small">
                                                    {expandedRow === index ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell component="th" scope="row">{row.numeroProcesso}</TableCell>
                                            <TableCell align="left">{row.nomeMarca} </TableCell>
                                            <TableCell align="left">{row.classe} </TableCell>
                                            <TableCell />

                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: '#f0f0f0', '&:last-child td, &:last-child th': { border: 0 } }} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                                                <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
                                                    <Table sx={{ minWidth: '450px', width: '95%' }} aria-label="sub-tabela">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell></TableCell>
                                                                <TableCell><b>Processo</b></TableCell>
                                                                <TableCell><b>Marca</b></TableCell>
                                                                <TableCell><b>Classe</b></TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {row.processosSemelhantes?.map((detalhe, idx) => (
                                                                <TableRow key={idx}>
                                                                    <TableCell sx={{ width: '5%' }} align="center">
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} title='Adicionar processo em minhas marcas'>
                                                                            <AddCircleIcon className={styles.iconesAzul} style={{ cursor: 'pointer' }} onClick={e => adicionarProcesso(detalhe.numeroProcesso, detalhe.nomeMarca)} />
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell sx={{ width: '10%' }} component="th" scope="row">{detalhe.numeroProcesso}</TableCell>
                                                                    <TableCell sx={{ width: '70%' }} align="left">{detalhe.nomeMarca}</TableCell>
                                                                    <TableCell sx={{ width: '10%' }} align="center">{detalhe.classe}</TableCell>
                                                                    <TableCell sx={{ width: '5%' }} align="center">
                                                                        <div style={{ alignItems: 'center', gap: '4px', cursor: 'pointer' }} title='Listar despachos' >
                                                                            <Badge badgeContent={detalhe.qtDespachos} style={{ color: 'red' }}>
                                                                                <ListAltIcon className={styles.iconesAzul} onClick={() => abrirModal(detalhe.numeroProcesso)} />
                                                                            </Badge>
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br />
                </div>
            );
        } else return (<div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></div>);
    }

    return (
        <>
            <Corpo>
                <h2>Pesquisar semelhanças</h2>
                <br />
                <form id='pesquisarSemelhantes' name='pesquisarSemelhantes'>
                    <FormControl>
                        <FormLabel id="radio-buttom">Considerar última(s) revistas</FormLabel>
                        <RadioGroup row aria-labelledby="radio-buttom" value={valorSelecionado} onChange={handleChange}>
                            <FormControlLabel value= "1" control={<Radio />} label="1" />
                            <FormControlLabel value= "2" control={<Radio />} label="2" />
                            <FormControlLabel value= "5" control={<Radio />} label="5" />
                            <FormControlLabel value= "10" control={<Radio />} label="10" />
                        </RadioGroup>
                        <Button variant="contained" onClick={pesquisar}>Pesquisar</Button>
                    </FormControl>
                </form>
                <br /><br />
                {apresentarListaProcessosPesquisados(state.processoReducer.processosSemelhantes)}
                {/* Exibe o aviso "PROCESSANDO" enquanto isLoading é true */}
                <ModalProcessando apresentar={state.geral.isLoading} />
            </Corpo >
            <ModalDespachos
                apresentar={apresentarModalDespacho}
                titulo='Despachos do processo'
                clique={() => fecharModal()}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left"><b>Revista</b></TableCell>
                        <TableCell align="left"><b>Data</b></TableCell>
                        <TableCell align="left"><b>Despacho</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.despachoReducer.despachos && state.despachoReducer.despachos.map((row) => (
                        <TableRow
                            key={row.numeroRevista} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell align="center" component="th" scope="row">{row.numeroRevista}</TableCell>
                            <TableCell align="center">{row.data}</TableCell>
                            <TableCell align="left">{row.despacho}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </ModalDespachos>
            <br />
        </>
    )
}
export default Favoritos;