import PropTypes from 'prop-types'
import React from 'react'

import '../../../commom/template/custom.css'

const BuscaClienteMenuItem = ({cliente}) => (

    <div className="row">
        <div className="col-md-12 col-xs-12">
            <strong>{cliente.nomeFantasia}</strong>
            <br/>
            <div className="row">

                <div className="col-md-2 col-xs-2 b-r">
                    <p className="text-muted myFontSize-text-muted">{cliente.id}</p>
                </div>

                <div className="col-md-8 col-xs-8 b-r">
                    <p className="text-muted myFontSize-text-muted ">{cliente.razaoSocial}</p>
                </div>

                <div className="col-md-2 col-xs-2">
                    <p className="text-muted myFontSize-text-muted">{cliente.cnpj}</p>
                </div>

            </div>

        </div>

    </div>

);

BuscaClienteMenuItem.propTypes = {
    user: PropTypes.shape({
        nomeFantasia: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        razaoSocial: PropTypes.string.isRequired,
        cnpj: PropTypes.string.isRequired,
    }).isRequired,
};

export default BuscaClienteMenuItem;