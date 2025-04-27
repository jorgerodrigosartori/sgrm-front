
import styles from './Revista.module.css';

function Revista({id, numero, dtCarga, dtPublicacao, status}) {

    return (
        <div className={styles.card} key={id}>
            <div className={styles.cardHead} >
                {numero}
            </div>
            <div className={status === 'P' ? styles.cardBodyProcessando : (status === 'E' ? styles.cardBodyErro : styles.cardBody)}>
                <h3>Data publicação</h3> <h5>{dtPublicacao}</h5> <h3>{status === 'S' ? 'Data carga' : ' '}</h3> <h5>{status === 'P' ? 'Carga em processamento...' : status === 'E' ? 'Erro no processamento.' : (dtCarga)}</h5>
            </div>
        </div>
    )
}

export default Revista;

