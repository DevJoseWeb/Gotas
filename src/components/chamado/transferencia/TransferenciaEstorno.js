import React, {Component} from 'react'
import PageTitles from "../../../commom/template/PageTitles"

class TransferenciaEstorno extends Component {

    render() {
        return (
            <div>
                <PageTitles pagina="Estornar Transferências" />

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">

                                <div className="right-page-header">
                                    <div className="d-flex">
                                        <div className="align-self-center">
                                            <h4 className="card-title">Transferências Estorno</h4>
                                            <h6 className="card-subtitle">Listagem de transferências para estorno</h6>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default TransferenciaEstorno