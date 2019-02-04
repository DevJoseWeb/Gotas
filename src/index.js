import './commom/template/dependencies'

import React from 'react'
import ReactDOM from 'react-dom'

import registerServiceWorker from './registerServiceWorker'

import thunk from 'redux-thunk'
import multi from 'redux-multi'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducers from './components/reducers'

import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"
import UnauthorizedLayout from "./views/app/UnauthorizedLayout"
import AuthorizedRoute from "./views/app/AuthorizedRoute"
import PrimaryLayout from "./views/app/PrimaryLayout"


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(thunk, multi)(createStore)(reducers, devTools)

if (process.env.NODE_ENV !== 'production') {
    const {whyDidYouUpdate} = require('why-did-you-update');
    whyDidYouUpdate(React);
}

const App = props => (
    <Provider store={store}>
        <BrowserRouter>
            <div>            
                <Switch>
                    <Route path="/auth" component={UnauthorizedLayout} />
                    <AuthorizedRoute path="/app" component={PrimaryLayout} />
                    <Redirect to="/auth" />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(
        <App />,
     document.getElementById('root'));
registerServiceWorker();
