import { useEffect, useContext } from 'react';
import Corpo from '../../components/Corpo/indexCorpo';
import * as React from 'react';
import { recuperarProcessoRevista } from "../../global/action/processoAction";
import Revista from '../../components/Revista/indexRevista';
import styles from './Revistas.module.css';
import { MyContext } from '../../global/contexto/MyContext';
import { carregarListaRevistas } from "../../global/action/RevistaAction";
import ModalProcessando from '../../components/Modal/indexModalProcessando';
import { Button, TextField } from '@mui/material';

const Revistas = () => {

    const { state, dispatch } = useContext(MyContext);

    useEffect(() => {
        carregarListaRevistas(dispatch);
    }, [])

    const pesquisar = async () => {

        const revista = document.getElementById('revista').value;
        const processo = document.getElementById('processo').value;

        if (!revista || !processo) {
            dispatch({ type: "SET_NOTIFICACAO_ALERTA", payload: { mensagem: 'Informar a revista e o processo.' } });
        } else {
            dispatch({ type: "SET_FILTRO_PESQUISA_PROCESSO", payload: { processo, revista } });
            recuperarProcessoRevista(dispatch, processo, revista);
        }
    };

    return (
        <>
            <Corpo>
                <h2>Últimas revistas atualizadas no sistema</h2>
                <br />
                <div className={styles.cards}>
                    {state.revista && state.revista.lista?.map(rev => <Revista id={rev.numeroRevista} numero={rev.numeroRevista} dtPublicacao={rev.dataPublicacao} dtCarga={rev.dataCarga} status={rev.status} />)}
                </div>
                <br /><br />
                <h2>Carregar processo de revista:</h2>

                <form id='pesquisarProcesso' name='pesquisarProcesso'>
                    <TextField id="processo" label="Processo" size="small" variant="outlined" sx={{ width: 150, maxWidth: '100%', paddingRight: '30px' }} />
                    <TextField id="revista" label="Revista" size="small" variant="outlined" sx={{ width: 150, maxWidth: '100%', paddingRight: '30px' }} />
                    <Button variant="contained" onClick={pesquisar}>Pesquisar</Button>
                </form>
                <br /><br /><br /><br />
            </Corpo>
            <ModalProcessando apresentar={state.geral.isLoading} />
            <br />
        </>
    )
}

export default Revistas;