import HttpTransport from './HTTPTransport';

describe('HTTPTransport', () => {
    const transport = new HttpTransport();

    test('should be defined', () => {
        expect(transport).toBeDefined();
    });

    test('request should be defined', () => {
        expect(transport.request).toBeDefined();
    });

    test('should have get method', () => {
        expect(transport.get).toBeDefined();
    });

    test('should have post method', () => {
        expect(transport.post).toBeDefined();
    });

    test('should have put method', () => {
        expect(transport.put).toBeDefined();
    });

    test('should have patch method', () => {
        expect(transport.patch).toBeDefined();
    });

    test('should have delete method', () => {
        expect(transport.delete).toBeDefined();
    });

});
