import {Link} from 'react-router-dom'

import React, {Component} from 'react';
import moment from "moment";
const ms = require('pretty-ms')

class PageTitleAtendimento extends Component {

    state = {
        time: this.props.timer,
        atendimento: this.props.atendimento
    }

    constructor(props) {
        super(props)
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.timer !== this.props.timer) {
            this.setState({time: this.props.timer})
        }

        if (previousProps.atendimento !== this.props.atendimento) {
            this.setState({atendimento: this.props.atendimento})
        }
    }

    renderAtendimento() {
        if (!this.state.atendimento) {
            return (
                <div className="row page-titles">
                    <div className="col-md-5 col-8 align-self-center">
                        <h3 className="text-themecolor">Zaal Atendimento</h3>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/app/dashboard">
                                    Home
                                </Link>
                            </li>
                            <li className="breadcrumb-item active">Atendimento</li>
                        </ol>
                    </div>
                </div>
            )
        }

        return null
    }

    renderAtendimentoIniciado() {
        if (this.state.atendimento) {
            return (
                <div className="row page-titles">

                        <div className="col-md-4">
                            <h3 className="text-themecolor">Zaal Atendimento</h3>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active">Atendimento Iniciado</li>
                            </ol>
                        </div>

                        <div className="col-md-4">
                            <div className="center">
                                <div className="m-l-20 text-center">
                                    <h2 className="font-light text-info m-b-0"> {ms(this.state.time)}</h2>
                                    <small>{moment(this.state.atendimento.abertura).local().format("DD/MM/YYYY HH:MM:SS")}</small>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="text-right">
                                <strong>Nº do Atendimento: {this.state.atendimento ? this.state.atendimento.id : ''} </strong>
                                <br />
                                <p className="text-muted">{this.state.atendimento.funcionario ? this.state.atendimento.funcionario.id + ' - ' + this.state.atendimento.funcionario.nome : ''}</p>
                            </div>
                        </div>

                </div>
            )
        }

        return null
    }

    render() {
        return (
            <div>
                {this.renderAtendimento()}
                {this.renderAtendimentoIniciado()}
            </div>
        );
    }
}

export default PageTitleAtendimento;

/*        <div className="col-md-7 col-4 align-self-center">
            <div className="d-flex m-t-10 justify-content-end">
                <div className="d-flex m-r-20 m-l-10 hidden-md-down">
                    <div className="chart-text m-r-10">
                        <h6 className="m-b-0">
                            <small>THIS MONTH</small>
                        </h6>
                        <h4 className="m-t-0 text-info">$58,356</h4></div>
                    <div className="spark-chart">
                        <div id="monthchart"></div>
                    </div>
                </div>
                <div className="d-flex m-r-20 m-l-10 hidden-md-down">
                    <div className="chart-text m-r-10">
                        <h6 className="m-b-0">
                            <small>LAST MONTH</small>
                        </h6>
                        <h4 className="m-t-0 text-primary">$48,356</h4></div>
                    <div className="spark-chart">
                        <div id="lastmonthchart"></div>
                    </div>
                </div>
                <div className="">
                    <button
                        className="right-side-toggle waves-effect waves-light btn-success btn btn-circle btn-sm pull-right m-l-10">
                        <i className="ti-settings text-white"></i></button>
                </div>
            </div>
        </div> */