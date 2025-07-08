import Block from '../../framework/Block';
import { Input } from '../input/Input';
import { Button } from '../../components/button/Button';
import { Link } from '../../components/link/Link';
import FormValidator from '../../framework/FormValidator';
export class Registration extends Block {
  private formValidator: FormValidator;

  constructor(props: {
    id: string
  }) {
    super({
        ...props,
        InputEmail: new Input({
            id: 'email',
            name: 'email',
            type: 'mail',
            placeholder: 'E-mail',
            onBlur: (event: Event) => {
                this.formValidator.validateInput(event.target as HTMLInputElement);
            },
        }),
        InputLogin: new Input({
            id: 'login',
            name: 'login',
            type: 'text',
            placeholder: 'Логин',
            onBlur: (event: Event) => {
                this.formValidator.validateInput(event.target as HTMLInputElement);
            },
        }),
        InputFirstName: new Input({
            id: 'first-name',
            name: 'first_name',
            type: 'text',
            placeholder: 'Имя',
            onBlur: (event: Event) => {
                this.formValidator.validateInput(event.target as HTMLInputElement);
            },
        }),
        InputSecondName: new Input({
            id: 'second-name',
            name: 'second_name',
            type: 'text',
            placeholder: 'Фамилия',
            onBlur: (event: Event) => {
                this.formValidator.validateInput(event.target as HTMLInputElement);
            },
        }),
        InputPhone: new Input({
            id: 'phone',
            name: 'phone',
            type: 'tel',
            placeholder: 'Телефон',
            onBlur: (event: Event) => {
                this.formValidator.validateInput(event.target as HTMLInputElement);
            },
        }),
        InputPassword: new Input({
            id: 'password',
            name: 'password',
            type: 'password',
            placeholder: 'Пароль',
            onBlur: (event: Event) => {
                this.formValidator.validateInput(event.target as HTMLInputElement);
            },
        }),
        InputPasswordRepeat: new Input({
            id: 'password-repeat',
            name: 'password_repeat',
            type: 'password',
            placeholder: 'Пароль ещё раз',
            onBlur: (event: Event) => {
                this.formValidator.validateInput(event.target as HTMLInputElement);
            },
        }),
        Button: new Button({
            type: 'submit',
            text: 'Зарегистрироваться',
            class: 'btn',
            onClick: (event: Event) => {
                event.preventDefault();
                event.stopPropagation(); // отменяем действия по умолчанию. Будет работать после интеграции с backend
                this.formValidator.validateForm(event as SubmitEvent, this.element as HTMLFormElement);
                const formData = new FormData(this.element as HTMLFormElement);
                console.log({
                    email: formData.get('email'),
                    login: formData.get('login'),
                    first_name: formData.get('first_name'),
                    second_name: formData.get('second_name'),
                    phone: formData.get('phone'),
                    password: formData.get('password'),
                    password_repeat: formData.get('password_repeat'),
                });
            },
        }),
        PasswordLink: new Link({
            href: '/',
            datapage: 'loginPage',
            text: 'Вход',
            class: '',
            onClick: (event: Event) => {
                console.log(event.target);
            },
        })
    });
    this.formValidator = new FormValidator();
  }

  override render() {
    return `<form id="{{ id }}">
      <div class="form-item">
        {{{ InputEmail }}}
      </div>
      <div class="form-item">
        {{{ InputLogin }}}
      </div>
      <div class="form-item">
        {{{ InputFirstName }}}
      </div>
      <div class="form-item">
        {{{ InputSecondName }}}
      </div>
      <div class="form-item">
        {{{ InputPhone }}}
      </div>
      <div class="form-item">
        {{{ InputPassword }}}
      </div>
      <div class="form-item">
        {{{ InputPasswordRepeat }}}
      </div>
      <div class="form-actions">
        {{{ Button }}}
        {{{ PasswordLink }}}
      </div>
    </form>`;
  }
}
