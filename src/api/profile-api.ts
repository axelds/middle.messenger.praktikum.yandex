import { BaseAPI } from './base-api.ts';
import type { ProfileType, PasswordType, SearchUserByLoginType } from '../framework/Types';

export class ProfileAPI extends BaseAPI {
    constructor() {
        super({ path: '/user' });
    }

    public updateProfile(data: ProfileType) {
        return this.put('profile', data );
    }

    public updateAvatar(avatar: FormData) {
        return this.put('/profile/avatar', avatar, {});
    }

    public getAvatar() {
        return this.get('profile/avatar');
    }

    public changePassword(password: PasswordType) {
        return this.put('password', password);
    }

    public searchUserByLogin({ login }: SearchUserByLoginType) {
        return this.post('search', { login });
    }

}
