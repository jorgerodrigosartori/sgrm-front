import styles from './Corpo.module.css';
import React, { useContext, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { MyContext } from '../../global/contexto/MyContext';

function Corpo({ children }) {

    const { state, dispatch } = useContext(MyContext);

    useEffect(() => {
        if (state.notificacao.visivel) {
            const timer = setTimeout(() => {
                dispatch({ type: 'FECHA_NOTIFICACAO' });
            }, 3000); // 3 segundos
            return () => clearTimeout(timer); // Limpar o temporizador ao desmontar ou alterar
        }
    });

    const fechaNotificacao = () => {

        dispatch({ type: "FECHA_NOTIFICACAO" });
    }

    const apresentarMensagem = (severidade, mensagem, apresentar) => {

        if (apresentar) {
            return (
                <center>
                    <Stack sx={{ width: '80%', marginTop: '60px' }} spacing={2}>
                        <Alert severity={severidade} onClose={() => fechaNotificacao()}>
                            {mensagem}
                        </Alert>
                    </Stack>
                </center>
            )
        } else return (<center><br /><br /><br /></center>);
    }

    return (
        <div>

            {apresentarMensagem(state.notificacao.severidade, state.notificacao.mensagem, state.notificacao.visivel)}



            <section className={styles.container}>
                <center>
                    <div className={styles.corpo} >
                        {children}
                    </div>
                </center>
            </section>
        </div>
    )
}

export default Corpo;