import { BaseAPI } from "./base-api";

class TestAuthAPI extends BaseAPI {
    constructor() {
        super({ path: '/auth' });
    }
}

describe('BaseAPI', () => {
    test('should create a new instance', () => {
        const api = new TestAuthAPI();
        expect(api).toBeInstanceOf(BaseAPI);
    });

    test('should have a baseUrl', () => {
        const api = new TestAuthAPI();
        // @ts-ignore
        expect(api.baseUrl).toBe('https://ya-praktikum.tech/api/v2/auth');
    });

    test('should have a headers', () => {
        const api = new TestAuthAPI();
        // @ts-ignore
        expect(api.headers).toEqual({ 'Content-Type': 'application/json' });
    });
});
