import Block from '../../framework/Block';
import { Input } from '../input/Input';
import { Button } from '../../components/button/Button';
import FormValidator from '../../framework/FormValidator';
export class SendMessage extends Block {
    private formValidator: FormValidator;

    constructor(props: object) {
        super({
            ...props,
            InputMessage: new Input({
                id: 'message',
                name: 'message',
                type: 'text',
                placeholder: 'Сообщение',
                onBlur: (event: Event) => {
                    this.formValidator.validateInput(event.target as HTMLInputElement);
                },
            }),
            Button: new Button({
                type: 'submit',
                text: 'Send',
                class: 'btn-send',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation(); // отменяем действия по умолчанию. Будет работать после интеграции с backend
                    this.formValidator.validateForm(event as SubmitEvent, this.element as HTMLFormElement);
                    const formData = new FormData(this.element as HTMLFormElement);
                        console.log({
                        message: formData.get('message'),
                    });
                },
            })
        });
        this.formValidator = new FormValidator();
    }

    override render() {
        return `<form id="{{ id }}">
            <div class="chat-send_message">
                {{{ InputMessage }}}
                {{{ Button }}}
            </div>
        </form>`;
    }
}
