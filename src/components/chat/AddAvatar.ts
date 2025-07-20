import Block from '../../framework/Block';
import { Input } from '../input/Input';
import { Button } from '../../components/button/Button';

export class AddAvatar extends Block {

    constructor({ onSubmit, ...props }: any) {
        super({
            ...props,
            events: { 
                submit: onSubmit 
            },
            InputAvatar: new Input({
                id: 'avatar',
                name: 'avatar',
                type: 'file',
                placeholder: 'Аватар чата',
                onBlur: () => {
                },
            }),
            Button: new Button({
                type: 'submit',
                text: 'Добавить',
                class: 'btn btn-send',
                onClick: () => {},
            }),
        });
    }

    override render() {
        return `<div style="display: none;"><div class="popup"><form id="{{ id }}">
                <div class="popup-title">{{ title }}</div>
                {{{ InputAvatar }}}
                {{{ Button }}}
        </form></div><div class="backdrop" onclick="this.parentNode.style.display='none'"></div></div>`;
    }
}
