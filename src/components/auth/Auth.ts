import Block from '../../framework/Block';
import ShowRouter from '../../framework/ShowRouter';
import { AuthAPI } from '../../api/auth-api';
import { Input } from '../input/Input';
import { Button } from '../../components/button/Button';
import { Link } from '../../components/link/Link';
import { Modal } from '../../components/modal/Modal';
import FormValidator from '../../framework/FormValidator';

const router = new ShowRouter();

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
            Button: new Button({
                type: 'submit',
                text: 'Авторизоваться',
                class: 'btn',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.formValidator.validateForm(event as SubmitEvent, this.element as HTMLFormElement);
                    if(this.formValidator.isValid) {
                        const formData = new FormData(this.element as HTMLFormElement);
                        const auth = new AuthAPI();
                        auth.signin({
                            login: formData.get('login')  as string,
                            password: formData.get('password')  as string,
                        }).then(() => {
                            localStorage.setItem('isAuth', 'true');
                            router.go('/messenger');
                        }).catch(() => {
                            this.children.Modal.setProps({
                                text: 'Неправильный логин или пароль',
                                class: 'show',
                            });
                        });
                    }
                },
            }),
            Modal: new Modal({
                text: '',
            }),
            RegistrationLink: new Link({
                href: '/sign-up',
                text: 'Регистрация',
                class: '',
                onClick: (event: Event) => {
                    console.log(event.target);
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
            {{{ RegistrationLink }}}
            {{{ PasswordLink }}}
        </div>
        {{{ Modal }}}
        </form>`;
    }
}
