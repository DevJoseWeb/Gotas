import React, {Component} from 'react'
import { NavLink, withRouter } from 'react-router-dom'

class Menu extends Component {

    constructor(props) {
        super(props);

        this.toggleClass = this.toggleClass.bind(this);
        this.toggleClassTransferenciaUl = this.toggleClassTransferenciaUl.bind(this)

        this.state = {
            activeIndex: 1,
            activeIndexTransferenciaUl: -1,
            collapseClassTransferencia: false
        };
    }

    toggleClass(index, e) {
        this.setState({ activeIndex: index });
        if (index === 2) {
            this.setState({collapseClassTransferencia: !this.state.collapseClassTransferencia})
        } else {
            this.setState({collapseClassTransferencia: false, activeIndexTransferenciaUl: -1})
        }
    };

    toggleClassTransferenciaUl(index, e) {
        this.setState({ activeIndexTransferenciaUl: index });
    }

    render() {

        return (
            <ul id="sidebarnav">

                <li className="nav-small-cap">Pessoal</li>

                <li className={this.state.activeIndex===0 ? 'active': ''}>
                    <NavLink activeClassName={this.state.activeIndex===0 ? 'active': ''} to={`${this.props.match.path}/atendimento`}onClick={this.toggleClass.bind(this, 0)}>
                        <i className="mdi mdi-phone-in-talk"></i><span className="hide-menu">Atendimento</span>
                    </NavLink>
                </li>

                <li className={this.state.activeIndex===1 ? 'active': ''} >
                    <NavLink activeClassName={this.state.activeIndex===1 ? 'active': ''} to={`${this.props.match.path}/chamado`}onClick={this.toggleClass.bind(this, 1)}>
                        <i className="mdi mdi-gauge"></i><span className="hide-menu">Chamados</span>
                    </NavLink>
                </li>

                <li className={this.state.activeIndex===2 ? 'active': ''} >
                    <a className="has-arrow waves-effect waves-dark" href="#" aria-expanded="false" onClick={this.toggleClass.bind(this, 2)}>
                        <i className="mdi mdi-autorenew"></i>
                        <span className="hide-menu">Transferências </span>
                    </a>
                    <ul aria-expanded="false" className={this.state.collapseClassTransferencia ? "collapse in" : ' collapse'}>
                        <li className={this.state.activeIndexTransferenciaUl===0 ? 'active': ''}>
                            <NavLink activeClassName={this.state.activeIndexTransferenciaUl===0 ? 'active': ''}
                                     to={`${this.props.match.path}/transferencia`}
                                     onClick={this.toggleClassTransferenciaUl.bind(this, 0)} >
                                <span className="hide-menu">Aceitar/Recusar </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={this.state.activeIndexTransferenciaUl===1 ? 'active': ''}
                                     to={`${this.props.match.path}/transferenciaestorno`}
                                     onClick={this.toggleClassTransferenciaUl.bind(this, 1)} >
                                <span className="hide-menu">Estornar </span>
                            </NavLink>
                        </li>
                    </ul>
                </li>

                <li className={this.state.activeIndex===4 ? 'active': ''}>
                    <NavLink activeClassName={this.state.activeIndex===4 ? 'active': ''} to={`${this.props.match.path}/pendenciasetor`} onClick={this.toggleClass.bind(this, 4)}>
                        <i className="mdi mdi-alarm"></i><span className="hide-menu">Pendência de Setor </span>
                    </NavLink>
                </li>

            </ul>
        );
    }
}

export default withRouter(Menu)
