import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ChamadoLista from "../../components/chamado/ChamadoLista";
import TransferenciaInclusao from "../../components/chamado/transferencia/TransferenciaInclusao";

export default props => (
    <div className="page-wrapper">
        <div className="container-fluid">

            <Switch>
                <Route path="/" exact={true} component={ChamadoLista}/>
                <Route path="/transferencia" component={TransferenciaInclusao} />
            </Switch>

        </div>
    </div>
)