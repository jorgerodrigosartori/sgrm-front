
import styles from './Modal.module.css';

function ModalProcessando({ apresentar }) {
    return (
        <>
        {apresentar && (
            <div className={styles.overlay}>
                <div className={styles.processandoBox}>PROCESSANDO. AGUARDE...</div>
            </div>
        )}
        </>
    )
}

export default ModalProcessando;