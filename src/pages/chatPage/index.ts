import '/src/styles/components/chat.pcss';
import Block from '../../framework/Block';
import { SendMessage } from '../../components/chat/SendMessage';
import { Aside } from '../../components/aside/Aside';
export class ChatPage extends Block {
    constructor() {
        super({
            Aside: new Aside(),
            SendMessage: new SendMessage({
                id: 'messageSending',
            }),
        });
    }
    override render() {
        return `<div id="app">
            <main class="chat-list">
                {{{ SendMessage }}}
            </main>
            {{{ Aside }}}
        </div>`;
    }
}
