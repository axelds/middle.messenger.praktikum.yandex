import { BaseAPI } from './base-api';
import type { DeleteChatType } from '../framework/Types';

export class ChatAPI extends BaseAPI {
    constructor() {
        super({ path: '/chats' });
    }

    public getChats() {
        return this.get('');
    }

    public createChat({ ...rest }: { title: string }) {
        return this.post('', { ...rest });
    }

    public removeChat({ ...rest }: { id: string }) {
        return this.delete(`${rest.id}`);
    }

    public getChatUsers({ ...rest }: { id: string }) {
        return this.get(`${rest.id}/users`);
    }

    public addUserToChat({ ...rest }: { users: number[]; chatId: number; }) {
        return this.put('users', { ...rest });
    }

    public removeUserFromChat({ ...rest }: { users: number[]; chatId: number; }) {
        return this.delete('users', { ...rest });
    }

    public getChatToken({ ...rest }: { chatId: number }) {
        return this.post(`token/${rest.chatId}`, {});
    }

    public updateAvatar(avatar: FormData ) {
        return this.put('avatar', avatar, {});
    }

    public deleteChat({ ...rest }: DeleteChatType) {
        return this.delete('', { ...rest });
    }

}
