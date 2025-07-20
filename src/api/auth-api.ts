import { BaseAPI } from './base-api.ts';
import type { SigninType, SignupType } from '../framework/Types';

export class AuthAPI extends BaseAPI {
    constructor() {
        super({ path: '/auth' });
    }

    public signin({...rest}: SigninType) {
        return this.post('signin', {...rest});
    }

    public signup({...rest}: SignupType) {
        return this.post('signup', {...rest});
    }

    public logout() {
        return this.post('logout', {});
    }

    public profile() {
        return this.get('user');
    }
}
