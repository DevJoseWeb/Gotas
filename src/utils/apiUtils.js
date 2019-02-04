import {userKeyLocalStorage} from '../base'

export const cachedFetch = (url, options) => {

    let expiry = 5 * 60  // 5 min default time

    if (typeof options === 'number') {
        expiry = options
        options = undefined
    } else if (typeof options === 'object') {
        expiry = options.seconds || expiry
    }

    let cacheKey = url
    let cached = localStorage.getItem(cacheKey)
    let whenCached = localStorage.getItem(cacheKey + ':ts')
    if (cached !== null && whenCached !== null) {
        let age = (Date.now() - whenCached) / 1000
        if (age < expiry) {
            let response = new Response(new Blob([cached]))
            return Promise.resolve(response)
        } else {
            localStorage.removeItem(cacheKey)
            localStorage.removeItem(cacheKey + ':ts')
        }
    }

    return fetch(url, options).then(response => {
        if (response.status === 200) {
            let ct = response.headers.get('Content-Type')
            if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
                response.clone().text().then(content => {
                    localStorage.setItem(cacheKey, content)
                    localStorage.setItem(cacheKey+':ts', Date.now())
                })
            }
        }
        return response
    })
}

export const cachedFetchSession = (url, options) => {

    let expiry = 5 * 60

    if (typeof options === 'number') {
        expiry = options
        options = undefined
    } else if (typeof options === 'object') {
        expiry = options.seconds || expiry
    }

    let cacheKey = url
    let cached = sessionStorage.getItem(cacheKey)
    let whenCached = sessionStorage.getItem(cacheKey + ':ts')
    if (cached !== null && whenCached !== null) {
        let age = (Date.now() - whenCached) / 1000
        if (age < expiry) {
            let response = new Response(new Blob([cached]))
            return Promise.resolve(response)
        } else {
            sessionStorage.removeItem(cacheKey)
            sessionStorage.removeItem(cacheKey + ':ts')
        }
    }

    return fetch(url, options).then(response => {
        if (response.status === 200) {
            let ct = response.headers.get('Content-Type')
            if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
                response.clone().text().then(content => {
                    sessionStorage.setItem(cacheKey, content)
                    sessionStorage.setItem(cacheKey+':ts', Date.now())
                })
            }
        }
        return response
    })
}

export const hashstr = s => {
    let hash = 0;
    if (s.length === 0) return hash;
    for (let i = 0; i < s.length; i++) {
        let char = s.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': getUserToken()
};

export const headersMultipart = {
    'Authorization': getUserToken()
};

function getUserToken() {
    let user = JSON.parse(localStorage.getItem(userKeyLocalStorage))
    if (user)
        return user["token"]
    else
        return null
}