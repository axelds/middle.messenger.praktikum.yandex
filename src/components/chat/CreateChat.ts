import Block from '../../framework/Block';
import { Input } from '../input/Input';
import { Button } from '../../components/button/Button';
import FormValidator from '../../framework/FormValidator';

export class CreateChat extends Block {
    private formValidator: FormValidator;

    constructor({ onSubmit, ...props }: any) {
        super({
            ...props,
            events: { 
                submit: onSubmit 
            },
            InputTitle: new Input({
                id: 'tilte',
                name: 'title',
                type: 'text',
                placeholder: 'Название чата',
                onBlur: (event: Event) => {
                    this.formValidator.validateInput(event.target as HTMLInputElement);
                },
            }),
            Button: new Button({
                type: 'submit',
                text: 'Создать',
                class: 'btn btn-send',
                onClick: (event: Event) => {
                    const form = this.element?.querySelector('form');
                    this.formValidator.validateForm(event as SubmitEvent, form as HTMLFormElement);
                    if(!this.formValidator.isValid) { 
                        event.preventDefault();
                        event.stopPropagation();
                    }
                },
            }),
        });

        this.formValidator = new FormValidator();
    }

    override render() {
        return `<div style="display: none;"><div class="popup popup-new_chat">
                <form id="{{ id }}">
                <div class="popup-title">Создание чата</div>
                {{{ InputTitle }}}
                {{{ Button }}}
                </form></div>
        <div class="backdrop" onclick="this.parentNode.style.display='none'"></div></div>`;
    }
}
