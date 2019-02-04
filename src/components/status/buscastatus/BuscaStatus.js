import React, {Component} from 'react'
import PropTypes from 'prop-types'

import AsyncSelect from "react-select/lib/Async"
import {buscarStatusChamadoPorNome} from "../../api/ChamadoApi"

class BuscaStatus extends Component {

    state = {
        selectValue: ''
    }

    noOptionsMessage() {
        return 'Status não encontrado...';
    }

    handleItemSelectChange(option) {
        this.setState({selectValue: option})
        this.props.handleChange(option.value)
    }

    loadOptions(query, callback) {
        if (query) {
            buscarStatusChamadoPorNome(query)
                .then(response => {

                    if (response.status !== 200) {
                        return;
                    }

                    return response.json()
                })
                .then(status => {
                    const items = status

                    if (!items) return

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
                <label>Status</label>
                <AsyncSelect
                    placeholder="Selecione o status"
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

export default BuscaStatus

BuscaStatus.propTypes = {
    handleChange: PropTypes.func.isRequired
};