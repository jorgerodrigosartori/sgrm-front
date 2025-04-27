
import styles from './Card.module.css';

function Card({ id, titulo, children }) {

    return (
        <div className={styles.card} key={id}>
            <div className={styles.cardHead} >
                {titulo}
            </div>
            <div className={styles.cardBody}>
                {children}
            </div>
        </div>
    )
}

export default Card;

