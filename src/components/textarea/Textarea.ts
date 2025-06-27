import Block from '../../framework/Block';

export class Textarea extends Block {
    constructor(props: {
        id: string;
        name: string;
        type?: string;
        placeholder?: string;
        class?: string;
        value?: string;
        onBlur: (event: Event) => void;
    }) {
        super({
        ...props,
        events: {
            blur: (event: Event) => {
            props.onBlur(event);
            },
        },
        attr: {
            class: 'form-control',
        },
        });
    }

    override render() {
        return '<textarea id="{{id}}" type="{{type}}" name="{{name}}" placeholder="{{placeholder}}" class="{{class}}">{{value}}</textarea><div class="valid-feedback"></div>';
    }
}
