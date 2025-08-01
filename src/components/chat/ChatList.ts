import Block from '../../framework/Block';
import { ChatAPI } from '../../api/chat-api';
import Store from '../../framework/Store';

export class ChatList extends Block {
    private api = new ChatAPI();
    constructor() {
        super({
            content: '',
        });
        this.api.getChats().then((value) => {
            const chats = JSON.parse(value as string);
            const state = Store.getState();
            (state as any).chats = chats;
            console.log(state);
            this.setProps({
                content: chats.map((chat: any) => {
                    return `<a href="/chat/${chat.id}" class="chat-link">${chat.title}</a>`
                }).join(''),
            });
        })
    }

    override render() {
        return `<div class="chat-list">
            {{{ content }}}
        </div>`;
    }
}
