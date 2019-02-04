import React, {Component, Fragment} from 'react'

import {AsyncTypeahead} from 'react-bootstrap-typeahead'
import BuscaClienteMenuItem from "./BuscaClienteMenuItem"
import {buscarCliente} from "../../api/ClienteApi"
import PropTypes from "prop-types";
import {MODO_PESQUISA_CLIENTE} from "../../../base";

class BuscaClienteTypeahead extends Component {

    state = {
        allowNew: false,
        isLoading: false,
        multiple: false,
        options: [],
        selected: [],
    };

    render() {

        const filterByCallback = (option, props) => {
            return (
                option.nomeFantasia
            );
        };

        return (
            <Fragment>
                <AsyncTypeahead
                    {...this.state}
                    onChange={(selected) => this._handleChange(selected)}
                    filterBy={filterByCallback}
                    labelKey= {this._retornaLabelKey()}
                    minLength={3}
                    onSearch={this._handleSearch}
                    placeholder="Selecione o Cliente..."
                    renderMenuItemChildren={(option, props) => (
                        <BuscaClienteMenuItem key={option.id} cliente={option} />
                    )}
                />

            </Fragment>
        );
    }

    _retornaLabelKey() {
        if (this.props.paramPesquisa === MODO_PESQUISA_CLIENTE.Cnpj) {
           return "cnpj"
        } else if (this.props.paramPesquisa === MODO_PESQUISA_CLIENTE.Cpf) {
            return "cpf"
        } else if (this.props.paramPesquisa === MODO_PESQUISA_CLIENTE.Nome) {
            return "nomeFantasia"
        }

        return "grupo"
    }

    _handleChange(selected) {
        this.setState({selected})
        let id = selected.map(d => (d.id ? d.id : null))
        let nome = selected.map(d => (d.nomeFantasia ? d.nomeFantasia : null))

        this.props.handleChange(id[0])

        if ( this.props.handleLabel) this.props.handleLabel(nome[0] || '')
    }

    _handleSearch = (query) => {
        this.setState({isLoading: true});
        buscarCliente(this.props.paramPesquisa, query)
            .then(({options}) => {
                this.setState({
                    isLoading: false,
                    options,
                });
            });
    }
}

BuscaClienteTypeahead.propTypes = {
    handleChange: PropTypes.func.isRequired
};

export default BuscaClienteTypeahead