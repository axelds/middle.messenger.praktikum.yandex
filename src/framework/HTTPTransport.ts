enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type RequestOptions = {
    method: string;
    data?: any;
    headers?: Record<string, string>;
}

type HTTPMethod = <R=unknown>(url: string, options?: RequestOptions) => Promise<R>;

export default class HttpTransport {
    get: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.GET });
    post: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.POST });
    put: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.PUT });
    patch: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.PATCH });
    delete: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.DELETE });

    request<R>(url: string, options: RequestOptions = { method: METHODS.GET }): Promise<R> {
        const { method, data, headers } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            if (headers) {
                Object.entries(headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value);
                });
            }

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const responseData = xhr.response;
                    resolve(responseData as R);
                } else {
                    reject(xhr.statusText);
                }
            };

            xhr.withCredentials = true;

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else if (method === METHODS.PUT && data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }
}
