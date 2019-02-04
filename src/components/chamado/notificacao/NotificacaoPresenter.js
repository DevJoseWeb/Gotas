import {buscarNotificacao, marcarNotificacaoVisualizada, buscarChamado, buscarTodasNotificacoes} from "../../api/NotificacaoApi";
import {APP_LOAD_MORE_NOTIFICATIONS} from '../../../base';

import {somaStorageNotificacao} from './NotificacaoUtils';

export default class NotificacaoPresenter {

    constructor(view) {
        this.view = view
    }

    _tratarResponseNotificacao(response) {
        switch (response.status) {
            case 400:
                response.json().then(error => {
                    console.log(error)
                })
                break
            default:
                response.json().then(notificacao => this.view.exibirNotificacao(notificacao))
        }
    }

    _tratarResponseNotificacaoVisualizada(response, exibirTodasNotificacoes) {
        switch (response.status) {
            case 400:
                response.json().then(error => {
                    console.log(error)
                })
                break
            default:
                if (exibirTodasNotificacoes) {
                    buscarTodasNotificacoes(localStorage.getItem(APP_LOAD_MORE_NOTIFICATIONS))
                        .then(response => response.json().then(notificacacoes => this.view.updateListNotifications(notificacacoes)))   
                } else {
                    buscarNotificacao()
                        .then(response => response.json().then(notificacao => this.view.updateListNotifications(notificacao)))  
                }
        }
    }

    _tratarResponseLoadChamado(response) {
        switch (response.status) {
            case 400:
                response.json().then(error => {
                    console.log(error)
                })
                break
            default:
                response.json().then(chamado => this.view.exibirChamadoNotificacao(chamado))
                
        }
    }

    _tratarResponseTodasNotificacoes(response) {
        switch (response.status) {
            case 400:
                response.json().then(error => {
                    console.log(error)
                })
                break
            default:
                response.json().then(notificacao => this.view.updateListNotifications(notificacao))
        }
    }

    carregarNotificacao() {
        buscarNotificacao()
            .then(response => this._tratarResponseNotificacao(response))
    }

    setarNotificacaoVisualizada(id, exibirTodasNotificacoes) {
        marcarNotificacaoVisualizada(id)
            .then(response => this._tratarResponseNotificacaoVisualizada(response, exibirTodasNotificacoes))
    }

    loadChamado(id) {
        buscarChamado(id)
            .then(response => this._tratarResponseLoadChamado(response))
    }

    carregarTodasNotificacoes(loadRows = 0) {
        let rows = somaStorageNotificacao(loadRows);
        buscarTodasNotificacoes(rows)
            .then(response => this._tratarResponseTodasNotificacoes(response))
    }
}