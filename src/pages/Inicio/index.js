
import { useEffect, useContext } from "react";
import styles from './Inicio.module.css';
import Corpo from "../../components/Corpo/indexCorpo";
import Card from "../../components/Card/indexCard";
import ModalProcessando from '../../components/Modal/indexModalProcessando';
import { MyContext } from '../../global/contexto/MyContext';
import { carregaDadosTelaInicial } from "../../global/action/inicioAction";
import { baixarNovaRevista } from "../../global/action/RevistaAction";

function Inicio() {

  const { state, dispatch } = useContext(MyContext);

  useEffect(() => {
    carregaDadosTelaInicial(state, dispatch);
  }, [])

  const carregarNovaRevista = (revista) => {
    baixarNovaRevista(dispatch, revista);
  }

  function conteudoProximaRevista(ultimaRevista, proximaRevista) {

    if (ultimaRevista) {
      if (ultimaRevista.status === 'S') {
        if (proximaRevista)
          return (<a style={{ cursor: 'pointer' }} title="Baixar revista" onClick={() => carregarNovaRevista(proximaRevista)}>Próxima revista disponível para baixar: {proximaRevista}</a>);
        else return "Nenhuma revista disponível para baixar."
      } else if (ultimaRevista.status === 'P') {
        return "Baixando revista. Aguardar conclusão."
      } else return "Correu erro na última revista baixada."
    }
  }

  return (
    <>
      <Corpo>
        <div className={styles.cards}>
          <Card titulo='Revistas' >
            <div className={styles.revista}>
              Última revista: {state.dadosIniciais && state.dadosIniciais.ultimaRevista ? state.dadosIniciais.ultimaRevista.numeroRevista : ''}<br />
              Data publicacao: {state.dadosIniciais && state.dadosIniciais.ultimaRevista ? state.dadosIniciais.ultimaRevista.dataPublicacao : ''}<br />
              Data carga:  {state.dadosIniciais && state.dadosIniciais.ultimaRevista ? state.dadosIniciais.ultimaRevista.dataCarga : ''}<br />
            </div>
            <br />
            <div className={styles.revista}>
              Primeira revista: {state.dadosIniciais && state.dadosIniciais.primeiraRevista ? state.dadosIniciais.primeiraRevista.numeroRevista : ''}<br />
              Data publicacao: {state.dadosIniciais && state.dadosIniciais.primeiraRevista ? state.dadosIniciais.primeiraRevista.dataPublicacao : ''}<br />
              Data carga:  {state.dadosIniciais && state.dadosIniciais.primeiraRevista ? state.dadosIniciais.primeiraRevista.dataCarga : ''}<br />
            </div>
            <br />
            <div className={styles.revista}>
              {conteudoProximaRevista(state.dadosIniciais.ultimaRevista, state.dadosIniciais.numeroProximaRevista)}
            </div>
          </Card>
          <Card titulo='Processos' >
            <div className={styles.revista}>
              <b>Total de processos: </b>{state.dadosIniciais.totalProcessos}<br />
              <b>Total de processos acompanhados:</b> {state.dadosIniciais.totalMinhasMarcas}<br />
            </div>
            <br />
            <div className={styles.revista}>
              <b>Últimas revistas com despachos acompanhados</b><br /><br />
              {state.dadosIniciais && state.dadosIniciais.movimentacoes && state.dadosIniciais.movimentacoes.map((row) => (
                <center><b>Revista </b>{row.numeroRevista}: {row.numeroProcesso} processo(s)<br/></center>
              ))}
            </div>
          </Card>
        </div>
        <br /><br />
      </Corpo>
      <ModalProcessando apresentar={state.geral.isLoading} />
      <br /><br />
    </>
  )
}

export default Inicio;