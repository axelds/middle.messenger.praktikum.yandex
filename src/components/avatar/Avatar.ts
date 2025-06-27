import Block from '../../framework/Block';

export class Avatar extends Block {
    constructor(props: {
        src: string;
        name: string;
        onClick: (event: Event) => void;
    }) {
        super({
        ...props,
        events: {
            click: (event: Event): void => {
            props.onClick(event);
            },
        },
        });
    }

    override render() {
        return '<img src="{{src}}" width="130" heigth="130" alt="{{name}}" class="avatar">';
    }
}
