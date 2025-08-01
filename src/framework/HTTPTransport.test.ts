import HttpTransport from './HTTPTransport';

describe('HTTPTransport', () => {
    const transport = new HttpTransport();

    test('should be an instance of HttpTransport', () => {
        expect(transport).toBeInstanceOf(HttpTransport);
    });

    test('should have a request method', () => {
        expect(transport.request).toBeInstanceOf(Function);
    });
    
    test.each([
        ['get', 'GET'],
        ['post', 'POST'],
        ['put', 'PUT'],
        ['patch', 'PATCH'],
        ['delete', 'DELETE']
    ])('should call request with correct parameters for %s method', async (method, httpMethod) => {
        const spy = jest.spyOn(transport, 'request').mockResolvedValue('');
        const url = '/test-url';
        const options = { method: httpMethod };

        await (transport as any)[method](url);

        expect(spy).toHaveBeenCalledWith(url, expect.objectContaining(options));
    });

    test('should return a resolved promise for successful request', async () => {
        jest.spyOn(transport, 'request').mockResolvedValue('success');
        await expect(transport.get('/test-url')).resolves.toBe('success');
    });

    test('should return a rejected promise for failed request', async () => {
        jest.spyOn(transport, 'request').mockRejectedValue('error');
        await expect(transport.get('/test-url')).rejects.toBe('error');
    });
});
