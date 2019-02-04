import React, { Component } from 'react'
import AsyncSelect from 'react-select/lib/Async'
import PropTypes from 'prop-types'
import { buscarFuncionarioPorNome } from "../../api/FuncionarioApi"
import '../../../commom/template/custom.css'

class BuscaFuncionario extends Component {

    state = {
        selectValue: ''
    }

    noOptionsMessage() {
        return 'Funcionário não encontrado...';
    }

    handleItemSelectChange(option) {
        this.setState({ selectValue: option })
        this.props.handleChange(option.value)
    }

    loadOptions(query, callback) {
        if (query) {
            buscarFuncionarioPorNome(query)
                .then(response => {

                    if (response.status !== 200) {
                        return
                    }

                    return response.json()
                })
                .then(funcionario => {
                    const items = funcionario.content                    
                    
                    if (!items) return

                    let options = items.map(function (item) {
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
                <label>{this.props.label}</label>
                <AsyncSelect
                    placeholder="Selecione o funcionário"
                    loadingMessage={() => "Carregando..."}
                    cacheOptions
                    loadOptions={(query, callback) => this.loadOptions(query, callback)}
                    defaultOptions={false}
                    value={this.state.selectValue}
                    onChange={(option) => this.handleItemSelectChange(option)}
                    noOptionsMessage={this.noOptionsMessage}
                />
            </div>
        );
    }
}

BuscaFuncionario.propTypes = {
    handleChange: PropTypes.func.isRequired,
    label: PropTypes.string
};

BuscaFuncionario.defaultProps = {
    label: 'Funcionário'
};

export default BuscaFuncionario;