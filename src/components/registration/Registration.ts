import Block from '../../framework/Block';
import { AuthAPI } from '../../api/auth-api';
import ShowRouter from '../../framework/ShowRouter';
import { Input } from '../input/Input';
import { Button } from '../../components/button/Button';
import { Link } from '../../components/link/Link';
import { Modal } from '../../components/modal/Modal';
import FormValidator from '../../framework/FormValidator';

export class Registration extends Block {
  private formValidator: FormValidator;
  private router = new ShowRouter()
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
                const input = event.target as HTMLInputElement;
                this.formValidator.validateInput(input);
                const passwordRepeatInput = document.querySelector('input[name="password_repeat"]') as HTMLInputElement;
                if (passwordRepeatInput && input.value !== passwordRepeatInput.value) {
                    passwordRepeatInput.classList.add('invalid');
                } else {
                    passwordRepeatInput.classList.remove('invalid');
                }
            },
        }),
        InputPasswordRepeat: new Input({
            id: 'password-repeat',
            name: 'password_repeat',
            type: 'password',
            placeholder: 'Пароль ещё раз',
            onBlur: (event: Event) => {
                const input = event.target as HTMLInputElement;
                this.formValidator.validateInput(input);
                const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;
                if (passwordInput && input.value !== passwordInput.value) {
                    input.classList.add('invalid');
                } else {
                    input.classList.remove('invalid');
                }
            },
        }),
        Button: new Button({
            type: 'submit',
            text: 'Зарегистрироваться',
            class: 'btn',
            onClick: (event: Event) => {
                event.preventDefault();
                event.stopPropagation();
                this.formValidator.validateForm(event as SubmitEvent, this.element as HTMLFormElement);
                if(this.formValidator.isValid) {
                    const formData = new FormData(this.element as HTMLFormElement);
                    if (formData.get('password') !== formData.get('password_repeat')) {
                        this.children.Modal.setProps({
                            text: 'Пароли не совпадают',
                            class: 'show',
                        });
                    } else {
                        console.log('check');
                        const auth = new AuthAPI();
                        auth.signup({
                            email: formData.get('email') as string,
                            login: formData.get('login') as string,
                            first_name: formData.get('first_name') as string,
                            second_name: formData.get('second_name') as string,
                            phone: formData.get('phone') as string,
                            password: formData.get('password') as string,
                        }).then(() => {
                            localStorage.setItem('isAuth', 'true');
                            this.router.go('/messenger');
                        }).catch((error) => {
                            const errorMsg = JSON.parse(error as string).reason;
                            if(errorMsg === 'User already in system') {
                                localStorage.setItem('isAuth', 'true');
                                this.router.go('/messenger');
                            };
                            this.children.Modal.setProps({
                                text: errorMsg,
                                class: 'show',
                            });
                        });
                    }
                }
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
        }),
        Modal: new Modal({
            text: '',
        }),
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
      {{{ Modal }}}
    </form>`;
  }
}
