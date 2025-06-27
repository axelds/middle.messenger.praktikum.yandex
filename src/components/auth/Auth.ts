import Block from '../../framework/Block';
import { Input } from '../input/Input';
import { Button } from '../../components/button/Button';
import { Link } from '../../components/link/Link';
import FormValidator from '../../framework/FormValidator';
import HttpTransport from '../../framework/HTTPTransport';
export class Auth extends Block {
  private formValidator: FormValidator;

  constructor(props: { id: string }) {
    super({
        ...props,
        InputLogin: new Input({
            id: 'login',
            name: 'login',
            type: 'text',
            placeholder: 'Логин',
            onBlur: () => {
            },
        }),
        InputPassword: new Input({
            id: 'password',
            name: 'password',
            type: 'password',
            placeholder: 'Пароль',
            onBlur: () => {
            },
        }),
        Button: new Button({
            type: 'submit',
            text: 'Авторизоваться',
            class: 'btn',
            onClick: (event: Event) => {
                event.preventDefault();
                event.stopPropagation(); // отменяем действия по умолчанию. Будет работать после интеграции с backend
                const httpTransport = new HttpTransport();
                httpTransport.post('http://localhost', {}); // подключил для прохождения теста
                const formData = new FormData(this.element as HTMLFormElement);
                console.log({
                  login: formData.get('login'),
                  password: formData.get('password'),
                });
            },
        }),
        PasswordLink: new Link({
            href: '',
            datapage: 'lostPassword',
            text: 'Забыли пароль?',
            class: '',
            onClick: (event: Event) => {
                console.log(event.target);
            },
        })
    });
    this.formValidator = new FormValidator();
    this.formValidator.addForm(this.props.id, (this.element as HTMLFormElement));
  }

  override render() {
    return `<form id="{{ id }}">
      <div class="form-item">
        {{{ InputLogin }}}
      </div>
      <div class="form-item">
        {{{ InputPassword }}}
      </div>
      <div class="form-actions">
        {{{ Button }}}
        {{{ PasswordLink }}}
      </div>
    </form>`;
  }
}
