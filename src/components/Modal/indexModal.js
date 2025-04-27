
import styles from './Modal.module.css';
import { Button } from '@mui/material';

function Modal({ children, apresentar, titulo, clique }) {
    return (
        <>
            {apresentar &&
                <div className={styles.overlay}>
                    <div className={styles.modalBox}>
                        <div className={styles.modalTitulo}>{titulo}</div>
                        <div className={styles.modalCorpo}> {children}</div>                       
                        <div className={styles.modalBotoes}>
                            <Button variant="contained" onClick={clique}>Fechar</Button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Modal;