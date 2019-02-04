import React, { Fragment, PureComponent } from 'react';

class RecoverAuth extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
        }
    }

    onChangeTextoUsuario(event) {
        this.setState({ ...this.state, usuario: event.target.value });
    }

    onChangeTextoEmail(event) {
        this.setState({ ...this.state, email: event.target.value });
    }

    render() {
        return (
            // this.props.show ? this.renderRecover() : null
            <Fragment>
                <section id="wrapper">
                    <div className="login-register background-zaal">
                        {/* <div class="caption-inf p-b-10" >Recuperar Usuário</div> */}
                        <div className="login-box card position-auth">
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit} className="form-horizontal form-material" id="loginform">
                                    <div className="box-title" style={{ textAlign: "center", marginBottom: "60px" }}>
                                        <img className='size-img-zaal' src="../assets/images/logo_branca_zaal.svg" alt="homepage" />
                                    </div>

                                    <div className="form-group ">
                                        <div className="col-xs-12 label-float">
                                            <input onChange={this.onChangeTextoEmail.bind(this)} 
                                              value={this.state.email}
                                              className=""
                                              type="email"
                                              required=""
                                              placeholder="Email"
                                              autoComplete="off"
                                              spellcheck="false" />
                                            <label>Email</label>
                                        </div>
                                    </div>

                                    <div className="form-group text-center m-t-20">
                                        <div className="col-xs-12">
                                            <button type="button"
                                              className="btn btn-lg btn-block waves-effect waves-light btn-outline-primary btn-login"
                                              type="submit" > Recuperar
                                              {/* onClick={this.loginSistema}>Login */}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-group text-center m-t-20" >
                                        <div className="col-xs-12" >
                                            <span onClick={this.props.login} className='link-recover' >Fazer Login</span><br />
                                            {/* <a href="#" onClick={this.props.login} className='link-recover' g> Fazer Login</a> <br /> */}
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <span className='recuperar-dados' >Recuperar Dados de Acesso</span>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }

}

export default (RecoverAuth)