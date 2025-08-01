import Store from '../framework/Store';
import { API_URLS } from '../framework/Constants';
import type { initState } from '../framework/Types';

class Messages {
    private _userId!: string | number;
    private _chatId!: string | number;
    private _token!: string;
    private _wss!: WebSocket | null;
    private _ping!: any;

    constructor() {
        this._wss = null;
        this._handleOpen = this._handleOpen.bind(this);
        this._handleMessage = this._handleMessage.bind(this);
        this._handleError = this._handleError.bind(this);
        this._handleClose = this._handleClose.bind(this);
    }

    private _setListeners() {
        if (this._wss) {
        this._wss.addEventListener('open', this._handleOpen);
        this._wss.addEventListener('close', this._handleClose);
        this._wss.addEventListener('message', this._handleMessage);
        this._wss.addEventListener('error', this._handleError);
        }
    }

    private _removeListeners() {
        if (this._wss) {
            this._wss.removeEventListener('open', this._handleOpen);
            this._wss.removeEventListener('close', this._handleClose);
            this._wss.removeEventListener('message', this._handleMessage);
            this._wss.removeEventListener('error', this._handleError);
        }
    }

    private _handleOpen() {
        if (this._wss) {
        this.getMessages();
        this._ping = setInterval(() => {
            this._wss?.send(JSON.stringify({ type: 'ping' }));
        }, 5000);
        }
    }

    private _handleClose(evt: any) {
        this._removeListeners();
        if (!evt.wasClean) {
            console.log('[error] Connection lost: ' + evt.reason);
        }
    }

    private _handleMessage(evt: any) {
        const messages = JSON.parse(evt.data);

        if (messages.type !== 'pong') {
            if (Array.isArray(messages)) {
                Store.setState({
                    messages: messages.reverse(),
                });
            } else {
                const state = Store.getState() as initState;
                Store.setState({
                    messages: Object.assign(state.messages, { [state.messages.length]: messages }),
                });
            }
        }
    }

    private _handleError(evt: any) {
        console.log('[error] Connection error: ' + evt.message);
    }

    private _leave() {
        if (this._wss) {
            clearInterval(this._ping);
            this._wss.close();
            this._removeListeners();
        }
    }

    public connect({ userId, chatId, token }: any) {
        if (this._chatId !== chatId) {
            this._leave();
            this._userId = userId;
            this._chatId = chatId;
            this._token = token;
            this._wss = new WebSocket(
                `${API_URLS.WSS_URL}/${this._userId}/${this._chatId}/${this._token}`
            );
            this._setListeners();
        }
    }

    public getMessages() {
        if (this._wss) {
            this._wss.send(
                JSON.stringify({
                content: '0',
                type: 'get old',
                })
            );
        }
    }

    public sendMessage(message: string) {
        if (this._wss) {
            this._wss?.send(
                    JSON.stringify({
                    content: message,
                    type: 'message',
                })
            );
        }
    }
}

export default new Messages();
