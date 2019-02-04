import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Auth from '../../components/auth/Auth'
import Mensagens from '../../commom/msg/Mensagens'

const UnauthorizedLayout = () => (
    <div>
        <Switch>
            <div>
                <Route path="/auth/login" component={Auth} />
                <Redirect to="/auth/login" />
                <Mensagens />
            </div>
            
        </Switch>
    </div>
)

export default UnauthorizedLayout