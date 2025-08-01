import { Route } from './Route';
import Block from './Block';

describe('Route', () => {
    test('should create a new instance', () => {
        const path = '/sign-up';
        const block = {} as Block;
        const route = new Route(path, block);
        expect(route).toBeInstanceOf(Route);
    });

    test('should have a match method that returns true if the path matches', () => {
        const path = '/sign-up';
        const block = {} as Block;
        const route = new Route(path, block);
        expect(route.match(path)).toBe(true);
    });

    test('should have a match method that returns false if the path does not match', () => {
        const path = '/sign-up';
        const block = {} as Block;
        const route = new Route(path, block);
        expect(route.match('/other')).toBe(false);
    });

});
