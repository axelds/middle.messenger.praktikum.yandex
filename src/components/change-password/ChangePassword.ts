import Block from '../../framework/Block';
import ShowRouter from '../../framework/ShowRouter';
import { ProfileAPI } from '../../api/profile-api';
import { Input } from '../input/Input';
import { Button } from '../../components/button/Button';
import { Label } from '../../components/label/Label';
import { Modal } from '../../components/modal/Modal';
import FormValidator from '../../framework/FormValidator';

const router = new ShowRouter();

export class ChangePassword extends Block {
    private formValidator: FormValidator;

    constructor(props: { id: string }) {
        super({
            ...props,
            LabelPassword: new Label({
                text: 'Старый пароль',
            }),
            InputPassword: new Input({
                id: 'password',
                name: 'password',
                type: 'password',
                placeholder: 'Старый пароль',
                onBlur: () => {
                },
            }),
            LabelPasswordNew: new Label({
                text: 'Новый пароль',
            }),
            InputPasswordNew: new Input({
                id: 'password_new',
                name: 'password_new',
                type: 'password',
                placeholder: 'Новый пароль',
                onBlur: (event: Event) => {
                    const input = event.target as HTMLInputElement;
                    this.formValidator.validateInput(event.target as HTMLInputElement);
                    const passwordRepeatInput = document.querySelector('input[name="password_repeat"]') as HTMLInputElement;
                    if (passwordRepeatInput && input.value !== passwordRepeatInput.value) {
                        passwordRepeatInput.classList.add('invalid');
                    } else {
                        passwordRepeatInput.classList.remove('invalid');
                    }
                },
            }),
            LabelPasswordRepeat: new Label({
                text: 'Повторите новый пароль',
            }),
            InputPasswordRepeat: new Input({
                id: 'password_repeat',
                name: 'password_repeat',
                type: 'password',
                placeholder: 'Повторите новый пароль',
                onBlur: (event: Event) => {
                    const input = event.target as HTMLInputElement;
                    this.formValidator.validateInput(event.target as HTMLInputElement);
                    const passwordInput = document.querySelector('input[name="password_new"]') as HTMLInputElement;
                    if (passwordInput && input.value !== passwordInput.value) {
                        input.classList.add('invalid');
                    } else {
                        input.classList.remove('invalid');
                    }
                },
            }),
            Button: new Button({
                type: 'submit',
                text: 'Сохранить',
                class: 'btn',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.formValidator.validateForm(event as SubmitEvent, this.element as HTMLFormElement);
                    if(this.formValidator.isValid) {
                        const formData = new FormData(this.element as HTMLFormElement);
                        const userInfo = new ProfileAPI();
                        userInfo.changePassword({
                            oldPassword: formData.get('password') as string,
                            newPassword: formData.get('password_new') as string,
                        }).then(() => {
                            this.children.Modal.setProps({
                                text: 'Пароль успешно обновлен',
                                class: 'show',
                            });
                        }).catch(() => {
                            this.children.Modal.setProps({
                                text: 'Ошибка смены пароля. Проверьте правильность введенных данных.',
                                class: 'show',
                            });
                        });
                    }
                },
            }),
            Modal: new Modal({
                text: '',
                class: 'hide',
            }),
        });

        this.formValidator = new FormValidator();
    }

    override render() {
        return `<form id="{{ id }}">
            <div class="form-item">
                {{{ LabelPassword }}}
                {{{ InputPassword }}}
            </div>
            <div class="form-item">
                {{{ LabelPasswordNew }}}
                {{{ InputPasswordNew }}}
            </div>
            <div class="form-item">
                {{{ LabelPasswordRepeat }}}
                {{{ InputPasswordRepeat }}}
            </div>
            <div class="form-actions">
                {{{ Button }}}
            </div>
            {{{ Modal }}}
        </form>`;
    }
}
