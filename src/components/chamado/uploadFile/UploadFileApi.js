import {headersMultipart} from "../../../utils/apiUtils";

export const fazerUploadDeArquivo = (url, key, files) => {

    let data = new FormData()

    for (const file of files) {
        data.append(key, file);
    }

    return fetch(url, { headers: headersMultipart, method: 'POST', body: data })
            .then(response => response)
            .catch(error => error)
}