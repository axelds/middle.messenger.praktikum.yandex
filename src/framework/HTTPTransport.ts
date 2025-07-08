enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type RequestOptions = {
    method: METHODS;
    data?: any;
}

type HTTPMethod = <R=unknown>(url: string, options?: RequestOptions) => Promise<R>;

export default class HttpTransport {
    get: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.GET });
    post: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.POST });
    put: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.PUT });
    patch: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.PATCH });
    delete: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.DELETE });

    request<R>(url: string, options: RequestOptions = { method: METHODS.GET }): Promise<R> {
        const { method, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseData = xhr.response;
                resolve(responseData as R);
            } else {
                reject(xhr.statusText);
            }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
            xhr.send();
            } else {
            xhr.send(data);
            }
        });
    }
}
