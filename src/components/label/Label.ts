import Block from '../../framework/Block';

export class Label extends Block {
    constructor(props: object) {
        super({
        ...props,
        });
    }

    override render() {
        return '<label for="{{id}}">{{text}}</label>';
    }
}
