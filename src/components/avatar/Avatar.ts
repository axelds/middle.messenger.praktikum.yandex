import Block from '../../framework/Block';

export class Avatar extends Block {
    constructor(props: {
        src: string;
        name: string;
    }) {
        super({
        ...props,
        });
    }

    override render() {
        return '<img src="{{src}}" width="130" heigth="130" alt="{{name}}" class="avatar">';
    }
}
