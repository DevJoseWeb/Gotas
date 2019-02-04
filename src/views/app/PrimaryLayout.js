import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from "../../commom/template/Header"
import Sidebar from "../../commom/template/Sidebar"
import Footer from "../../commom/template/Footer"
import ChamadoLista from "../../components/chamado/ChamadoLista"
import Mensagens from '../../commom/msg/Mensagens'
import TransferenciaAceitarRecusar from "../../components/chamado/transferencia/TransferenciaAceitarRecusar"
import Atendimento from "../../components/atendimento/Atendimento"
import PendenciaSetor from "../../components/pendenciasetor/PendenciaSetor"
import TransferenciaEstorno from "../../components/chamado/transferencia/TransferenciaEstorno";

const PrimaryLayout = ({ match }) => (

    <div>
        <div id="main-wrapper">

            <Header/>
            <Sidebar/>

            <div className="page-wrapper">
                <div className="container-fluid">

                    <Switch>
                        <Route path={`${match.path}/atendimento`} exact component={Atendimento} />
                        <Route path={`${match.path}/chamado`} exact component={ChamadoLista} />
                        <Route path={`${match.path}/transferencia`} exact component={TransferenciaAceitarRecusar} />
                        <Route path={`${match.path}/transferenciaestorno`} exact component={TransferenciaEstorno} />
                        <Route path={`${match.path}/pendenciasetor`} exact component={PendenciaSetor} />
                        <Redirect to={`${match.url}`} />
                    </Switch>

                </div>
                <Footer/>
                <Mensagens />
            </div>
        </div>
    </div>
)

export default PrimaryLayout