import { fazerUploadDeArquivo } from './UploadFileApi'

export default class UploadFilePresenter {

    constructor(view) {
        this.view = view
    }    

    _tratarResponse(response) {
        switch(response.status) {
            case 201:
                console.log(response)
                break
            case 204:
                this.view.uploadConcluidoComSucesso()
                break
            default:
                console.log(response)
        }
    }

    realizarUploadDeArquivo(url, key, files) {
        fazerUploadDeArquivo(url, key, files)
            .then(response => this._tratarResponse(response))
            .catch(error => console.log(error))
    }
}