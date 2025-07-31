import HTTPTransport from '../framework/HTTPTransport';
import { API_URLS, HEADERS, METHODS } from '../framework/Constants';

export abstract class BaseAPI {
    private http: HTTPTransport;
    private baseUrl: string;
    private headers: Record<string, string>;


    constructor({ path }: Record<string, string>) {
        this.http = new HTTPTransport();
        this.baseUrl = API_URLS.BASE_URL + path;
        this.headers = HEADERS.JSON;
    }

    post(url: string, data: unknown) {
        return this.http.post(`${this.baseUrl}/${url}`, { 
            method: METHODS.POST,
            headers: this.headers, 
            data
        });
    }

    get(url: string) {
        return this.http.get(`${this.baseUrl}/${url}`, { 
            method: METHODS.GET,
            headers: this.headers
        });
    }

    put(url: string, data: unknown, headers?: Record<string, string>) {
        return this.http.put(`${this.baseUrl}/${url}`, { 
            method: METHODS.PUT,
            headers: headers ? headers : this.headers,
            data 
        });
    }

    delete(url: string, data?: unknown, headers?: Record<string, string>) {
        return this.http.delete(`${this.baseUrl}/${url}`, { 
            method: METHODS.DELETE,
            headers: headers ? headers : this.headers,
            data
        });
    }

}
