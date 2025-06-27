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
                onBlur: () => {
                },
            }),
            Button: new Button({
                type: 'submit',
                text: 'Send',
                class: 'btn-send',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation(); // отменяем действия по умолчанию. Будет работать после интеграции с backend
                    const formData = new FormData(this.element as HTMLFormElement);
                    console.log({
                    message: formData.get('message'),
                    });
                },
            })
        });
        this.formValidator = new FormValidator();
        this.formValidator.addForm(this.props.id, (this.element as HTMLFormElement));
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
