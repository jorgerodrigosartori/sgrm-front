import { useEffect, useContext } from 'react';
import Corpo from '../../components/Corpo/indexCorpo';
import * as React from 'react';
import Revista from '../../components/Revista/indexRevista';
import styles from './Revistas.module.css';
import { MyContext } from '../../global/contexto/MyContext';
import { carregarListaRevistas } from "../../global/action/RevistaAction";
import ModalProcessando from '../../components/Modal/indexModalProcessando';

const Revistas = () => {

    const { state, dispatch } = useContext(MyContext);

    useEffect(() => {
        carregarListaRevistas(dispatch);
    }, [])

    return (
        <>
            <Corpo>
                <h2>Últimas revistas atualizadas no sistema</h2>
                <br />
                <div className={styles.cards}>
                    {state.revista && state.revista.lista?.map(rev => <Revista id={rev.numeroRevista} numero={rev.numeroRevista} dtPublicacao={rev.dataPublicacao} dtCarga={rev.dataCarga} status={rev.status} />)}
                </div>
                <br /><br /><br />
                <br />
            </Corpo>
            <ModalProcessando apresentar={state.geral.isLoading} />
            <br />
        </>
    )
}

export default Revistas;