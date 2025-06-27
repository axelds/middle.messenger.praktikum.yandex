import Block from '../../framework/Block';

export class Heading extends Block {
    constructor(props: Record<string, unknown>) {
        super({
        ...props,
        });
    }

    override render() {
        return '<{{type}}>{{text}}</{{type}}>';
    }
}