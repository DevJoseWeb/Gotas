import React, { Component } from 'react'
import UploadFilePresenter from './UploadFilePresenter'


class UploadFile extends Component {
    
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){                 
        this.presenter = new UploadFilePresenter(this)
    }

    handleSubmit(event) {
        event.preventDefault()                  
        const input = document.getElementById('fileinput');                                       
        this.presenter.realizarUploadDeArquivo(this.props.url, this.props.chave, input.files)
        input.value = null
    }

    uploadConcluidoComSucesso() {
        this.props.uploadConcluido()
    }

    render() {
        return (

            <form onSubmit={this.handleSubmit}>

                <div className="row">
                    <div className="col-md-11">
                        <div className="form-group">
                            <div className="input-group input-file" name="Fichier1">
                                <input  id="fileinput" type="file" className="form-control" multiple placeholder='Selecione os arquivos...'/>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-1">
                        <div className="row text-right">
                            <div className="form-group">
                                <div className="input-group">
                                    <button type="submit" className="btn btn-default">Anexar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>


        );
    }
}

export default UploadFile;