import Block from '../../framework/Block';
import { API_URLS } from '../../framework/Constants';

export class ChatHeader extends Block {
    constructor(props: {
        title?: string;
        src?: string;
    }) {
        super({
            ...props,
        });
    }

    override render() {
        return `<div class="current-chat_meta">
            ${ this.props.src ? `<img src="${ API_URLS.RESOURCES_URL }/{{ src }}" />` : '' }
            {{ title }}
        </div>`;
    }
}
