import React, {Component} from 'react'

import CreatableSelect from 'react-select/lib/Creatable'

class ChamadoTableGroupColumn extends Component {

    handleChange = (newValue, actionMeta) => {

        let columns = newValue.map(item => {
            return item.value
        })

        this.props.handleChange(columns)
    };

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                <CreatableSelect
                    isMulti
                    onChange={this.handleChange}
                    options={this.props.columns || []}
                    placeholder={'Selecione as colunas na ordem que deseja agrupar'}
                />
            </div>
        );
    }
}

export default ChamadoTableGroupColumn;