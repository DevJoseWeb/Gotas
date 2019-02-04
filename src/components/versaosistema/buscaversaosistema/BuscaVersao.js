import React, {Component} from 'react'
import PropTypes from "prop-types"
import AsyncSelect from "react-select/lib/Async"
import {buscarVersaoSistemaPorNome} from "../../api/VersaoSistemaApi"

class BuscaVersao extends Component {

    state = {
        selectValue: ''
    }

    noOptionsMessage() {
        return 'Versão não encontrada...';
    }

    handleItemSelectChange(option) {
        this.setState({selectValue: option})
        this.props.handleChange(option.value)
    }

    loadOptions(query, callback) {
        if (query) {
            console.log(query)
            buscarVersaoSistemaPorNome(query)
                .then(response => {

                    if (response.status !== 200) {
                        return;
                    }

                    return response.json()
                })
                .then(status => {
                    const items = status;
                    let options = items.map(function(item) {
                        return {
                            value: item.id,
                            label: item.nome,
                        };
                    });
                    callback(options);
                })
        }
    }

    render() {
        return (
            <div className="form-group">
                <label>Versão</label>
                <AsyncSelect
                    placeholder="Selecione a versão"
                    loadingMessage={() => "Carregando..."}
                    cacheOptions={true}
                    loadOptions={(query, callback) => this.loadOptions(query, callback)}
                    defaultOptions={false}
                    value={ this.state.selectValue }
                    onChange={(option) => this.handleItemSelectChange(option)}
                    noOptionsMessage={ this.noOptionsMessage }
                />
            </div>
        );
    }
}

export default BuscaVersao;

BuscaVersao.propTypes = {
    handleChange: PropTypes.func.isRequired
};