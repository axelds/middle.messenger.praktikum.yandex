import Block from '../../framework/Block';
import { Input } from '../input/Input';
import { Button } from '../../components/button/Button';
import FormValidator from '../../framework/FormValidator';

export class AddUser extends Block {
    private formValidator: FormValidator;

    constructor({ onSubmit, ...props }: any) {
        super({
            ...props,
            events: { 
                submit: onSubmit 
            },
            InputName: new Input({
                id: 'user',
                name: 'login',
                type: 'text',
                placeholder: 'Логин',
                onBlur: (event: Event) => {
                    this.formValidator.validateInput(event.target as HTMLInputElement);
                },
            }),
            Button: new Button({
                type: 'submit',
                text: props.btn_text,
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
        return `<div style="display: none;"><div class="popup"><form id="{{ id }}">
                <div class="popup-title">{{ title }}</div>
                {{{ InputName }}}
                {{{ Button }}}
        </form></div><div class="backdrop" onclick="this.parentNode.style.display='none'"></div></div>`;
    }
}
