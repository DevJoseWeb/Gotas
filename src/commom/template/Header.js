import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import Notificacao from "../../components/chamado/notificacao/Notificacao"
import PendenciaSetorNotification from "../../components/pendenciasetor/PendenciaSetorNotification"
import {logout} from '../../components/auth/AuthAction'
import Preloader from "./Preloader";
import { formatName } from '../../utils/utils';

const $ = require('jquery')


class Header extends Component {

    componentDidMount(){
        this.$el = $(this.el)
        this.$el.stick_in_parent({});
    }

    render() {
        return (
            <header ref={el => this.el = el} className="topbar">

                <nav className="navbar top-navbar navbar-expand-md navbar-light">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/app/dashboard">
                            {/*<b>
                                <img style={{height: "34px", widht: "33px"}} src="../assets/images/logo_simbolo_zaal.svg" alt="homepage" className="light-logo"/>
                            </b>*/ }
                            <span>
                                <img style={{height: "45px", widht: "155px"}} src="../assets/images/logo_branca_zaal.svg" className="light-logo" alt="homepage"/>
                            </span>
                        </a>
                    </div>

                    <div className="navbar-collapse">

                        <ul className="navbar-nav mr-auto mt-md-0">

                            <li className="nav-item"><a
                                className="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark"
                                href="#"><i className="mdi mdi-menu"></i></a></li>
                            <li className="nav-item"><a
                                className="nav-link sidebartoggler hidden-sm-down text-muted waves-effect waves-dark"
                                href="#"><i className="ti-menu"></i></a></li>
                            
                        </ul>

                        <ul className="navbar-nav my-lg-0">

                            <PendenciaSetorNotification />

                            <Notificacao />

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark"
                                   href=""
                                   data-toggle="dropdown"
                                   aria-haspopup="true"
                                   aria-expanded="false">
                                    <img src="../assets/images/users/1.jpg" alt="user" className="profile-pic"/>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right scale-up">
                                    <ul className="dropdown-user">
                                        <li>
                                            <div className="dw-user-box">
                                                <div className="u-img">
                                                    <img src="../assets/images/users/1.jpg" alt="user"/>
                                                </div>
                                                <div className="u-text">
                                                    <h4>{formatName(this.props.user.nome, true)}</h4>
                                                    <p className="text-muted">@{this.props.user.usuario}</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li role="separator" className="divider"/>
                                        <li>
                                            <a href="#" onClick={this.props.logout}>
                                                <i className="fa fa-power-off"></i> Logout
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                        </ul>
                    </div>
                </nav>
                <Preloader/>
            </header>
        );
    }
}

const mapStateToProps = state => (
    {
        user: state.authStore.user
    }
)

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)