import {APP_LOAD_MORE_NOTIFICATIONS} from '../../../base';

export function somaStorageNotificacao(loadRows) {
    let cachedItens = localStorage.getItem(APP_LOAD_MORE_NOTIFICATIONS);
    let sumCachedItens = loadRows === 0 ? parseInt(cachedItens, 0) + 5 : parseInt(cachedItens, 0) + parseInt(loadRows,0) + 5;

    localStorage.setItem(APP_LOAD_MORE_NOTIFICATIONS, JSON.stringify(sumCachedItens));

    return sumCachedItens;
}