import Block from '../../framework/Block';

export class ChatItem extends Block {
    constructor(props: {
        id?: string;
        title?: string;
        onClick: (event: Event) => void;
    }) {
        super({
        ...props,
        events: {
            click: (event: Event) => {
                props.onClick(event);
            },
        },
        });
    }

    override render() {
        return '<div class="chat-item"><a data-chat-id="{{id}}">{{title}}</a></div>';
    }
}
