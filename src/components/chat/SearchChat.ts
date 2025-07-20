import Block from '../../framework/Block';
import { Input } from '../input/Input';
import { Button } from '../../components/button/Button';

export class SearchChat extends Block {
    constructor({ onSubmit, ...props }: any) {
        super({
            ...props,
            events: { 
                submit: onSubmit 
            },
            InputName: new Input({
                id: 'phrase',
                name: 'phrase',
                type: 'text',
                placeholder: 'Поиск',
                onBlur: () => {
                },
            }),
            Button: new Button({
                type: 'submit',
                text: '',
                class: 'btn-search',
                onClick: () => {},
            }),
        });
    }

    override render() {
        return `<div class="search-chat"><form id="{{ id }}">
                {{{ InputName }}}
                {{{ Button }}}
        </form></div>`;
    }
}
