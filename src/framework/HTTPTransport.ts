enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type RequestOptions = {
  method: HttpMethod;
  data?: any;
}

type RequestOptionsWithoutMethod = Omit<RequestOptions, 'method'>;

export default class HttpTransport {
  get(url: string, options: RequestOptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: HttpMethod.GET });
  }

  post(url: string, options: RequestOptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: HttpMethod.POST });
  }

  put(url: string, options: RequestOptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: HttpMethod.PUT });
  }

  delete(url: string, options: RequestOptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: HttpMethod.DELETE });
  }

  request(url: string, options: RequestOptions = { method: HttpMethod.GET }): Promise<XMLHttpRequest> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = () => resolve(xhr);
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === HttpMethod.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
