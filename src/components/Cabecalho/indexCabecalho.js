import { Link } from 'react-router-dom';
import styles from './Cabecalho.module.css';
import logo from './logoSGRM.png';
import Banner from '../Banner/indexBanner';
import CabecalhoLink from '../CabecalhoLink/indexCabecalhoLink';


function Cabecalho() {

    
    
    return (
        <>
            <header className={styles.cabecalho}>

                <nav>
                    <CabecalhoLink url='./'>
                        Home
                    </CabecalhoLink>
                    <CabecalhoLink url='./Revistas'>
                        Revistas
                    </CabecalhoLink>
                    <CabecalhoLink url='./Processos'>
                        Processos
                    </CabecalhoLink>
                    <CabecalhoLink url='./Acompanhar'>
                        Minhas marcas
                    </CabecalhoLink>
                    <CabecalhoLink url='./Favoritos'>
                        Semelhanças
                    </CabecalhoLink>
                </nav>
            </header>

        </>

    )
}

export default Cabecalho;