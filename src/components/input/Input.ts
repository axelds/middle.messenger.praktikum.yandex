import Block from '../../framework/Block';

export class Input extends Block {
    constructor(props: {
        id: string;
        name: string;
        type: string;
        placeholder?: string;
        value?: string;
        onBlur: (event: Event) => void;
    }) {
        super({
        ...props,
        events: {
            blur: (event: Event): void => {
            props.onBlur(event);
            },
        },
        attr: {
            class: 'form-control',
        },
        });
    }

    override render() {
        return '<input id="{{id}}" type="{{type}}" name="{{name}}" placeholder="{{placeholder}}" value="{{value}}" class="{{class}}"><div class="valid-feedback"></div>';
    }
}
