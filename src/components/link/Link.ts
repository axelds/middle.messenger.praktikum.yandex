import Block from '../../framework/Block';

export class Link extends Block {
    constructor(props: {
        href?: string;
        datapage?: string;
        class?: string;
        text: string;
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
        return '<a href="{{href}}" data-page="{{datapage}}" class="{{class}}">{{text}}</a>';
    }
}
