import Block from '../../framework/Block';

export class Button extends Block {
    constructor(props: {
        type?: 'button' | 'submit' | 'reset';
        class?: string;
        text: string;
        onClick?: (event: Event) => void;
    }) {
        super({
        ...props,
        events: {
            click: (event: Event) => {
            props.onClick?.(event);
            },
        },
        });
    }

    override render() {
        return '<button type="{{type}}" class="form-submit {{class}}">{{text}}</button>';
    }
}
