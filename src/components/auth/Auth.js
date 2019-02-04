import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from './AuthAction'
import { toastr } from 'react-redux-toastr'

import RecoverAuth from './RecoverAuth'

class Auth extends Component {

    constructor() {
        super()

        this.state = {
            obj: {
                usuario: '',
                senha: '',
            },
            showRecover: false,
            showUser: false,
            showPass: false,
        }

        this.toastMensagem = this.toastMensagem.bind(this);
        this.recover = this.recover.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        this.usuarioInput.focus();
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    onChangeTextoUsuario(event) {
        this.setState({
            obj: { ...this.state.obj, usuario: event.target.value }
        })
    }

    onChangeTextoSenha(event) {
        this.setState({
            obj: { ...this.state.obj, senha: event.target.value }
        })
    }

    loginSistema = () => {
        let object = { ...this.state.obj };
        this.props.login(JSON.stringify(object)).then((response) => {
            if (response === true) {
                this.props.history.push('/app/chamado')
            } else {
                this.setState({
                    obj: {
                        ...this.state.obj,
                        senha: '',
                    }
                })
                { this.toastMensagem() }
                this.senhaInput.focus();
            }
        });
    }

    toastMensagem = () => {
        return (
            toastr.error('Ops!', 'Usuário ou Senha inválidos, tente novamente!')
        )
    }

    recover() {
        this.setState({
            showRecover: true,
        })
    }

    login() {
        this.setState({
            showRecover: false,
        })
    }

    renderLogin() {
        return (
            <Fragment>
                <section id="wrapper">
                    <div className="login-register background-zaal">
                        <div className="login-box card position-auth">
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit} className="form-horizontal form-material" id="loginform">
                                    <div className="box-title" style={{ textAlign: "center", marginBottom: "30px" }}>
                                        <img className='size-img-zaal' src="../assets/images/logo_branca_zaal.svg" alt="homepage" />
                                    </div>

                                    <div className="form-group ">
                                        <div className="col-xs-12 label-float">
                                            <input onChange={this.onChangeTextoUsuario.bind(this)}
                                                value={this.state.obj.usuario}
                                                className=""
                                                type="text"
                                                required=""
                                                placeholder="Usuário"
                                                autoComplete="off"
                                                spellcheck="false"
                                                ref={(input) => { this.usuarioInput = input; }} />
                                            <label className='label-auth' >Usuário</label>
                                        </div>
                                    </div>

                                    <div className="form-group ">
                                        <div className="col-xs-12 label-float">
                                            <input onChange={this.onChangeTextoSenha.bind(this)}
                                                value={this.state.obj.senha}
                                                className=""
                                                type="password"
                                                required=""
                                                placeholder="Senha"
                                                autoComplete="off"
                                                spellcheck="false"
                                                ref={(input) => { this.senhaInput = input; }} />
                                            <label>Senha</label>
                                        </div>
                                    </div>

                                    <div className="form-group text-center m-t-20">
                                        <div className="col-xs-12">
                                            <button type="button"
                                                className="btn btn-lg btn-block waves-effect waves-light btn-outline-primary btn-login"
                                                type="submit"
                                                onClick={this.loginSistema}>Fazer Login
                                                </button>
                                        </div>
                                    </div>

                                    <div className="form-group text-center m-t-20">
                                        <div className="col-xs-12">
                                            <span onClick={this.recover} className='link-recover' >Esqueceu a senha ou nome de usuário?</span><br />
                                            {/* <a href="#" onClick={this.recover} className='link-recover' > Esqueceu a senha ou nome de usuário?</a> <br /> */}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }

    render() {
        return (
            <div>
                {!this.state.showRecover ? (
                    this.renderLogin()      
                ) : (
                    <RecoverAuth login={this.login} />  
                )}

                {/* <RecoverAuth show={this.state.showRecover} login={this.login} /> */}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch)

export default connect(null, mapDispatchToProps)(Auth)