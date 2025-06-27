import Block from '../../framework/Block';
import { Input } from '../input/Input';
import { Button } from '../../components/button/Button';
import { Avatar } from '../../components/avatar/Avatar';
import { Label } from '../../components/label/Label';
import FormValidator from '../../framework/FormValidator';
export class Profile extends Block {
  private formValidator: FormValidator;

  constructor(props: { id: string }) {
    super({
        ...props,
        Avatar: new Avatar({
            src: '/images/avatar-default.svg',
            name: 'avatar',
            onClick: () => {
            }
        }),
        InputAvatar: new Input({
            id: 'avatar',
            name: 'avatar',
            type: 'file',
            placeholder: 'Фото профиля',
            onBlur: () => {
            },
        }),
        LabelFirstName: new Label({
            text: 'Имя',
        }),
        InputFirstName: new Input({
            id: 'first-name',
            name: 'first_name',
            type: 'text',
            placeholder: 'Имя',
            value: 'Иван',
            onBlur: () => {
            },
        }),
        LabelSecondName: new Label({
            text: 'Фамилия',
        }),
        InputSecondName: new Input({
            id: 'second-name',
            name: 'second_name',
            type: 'text',
            placeholder: 'Фамилия',
            value: 'Иванов',
            onBlur: () => {
            },
        }),
        LabelInput: new Label({
            text: 'Почта',
        }),
        InputEmail: new Input({
            id: 'email',
            name: 'email',
            type: 'mail',
            placeholder: 'E-mail',
            value: 'pochta@yandex.ru',
            onBlur: () => {
            },
        }),
        LabelLogin: new Label({
            text: 'Логин',
        }),
        InputLogin: new Input({
            id: 'login',
            name: 'login',
            type: 'text',
            placeholder: 'Логин',
            value: 'axelds',
            onBlur: () => {
            },
        }),
        LabelChatNickname: new Label ({
            text: 'Имя в чате',
        }),
        InputChatNickname: new Input({
            id: 'chat_nickname',
            name: 'chat_nickname',
            type: 'text',
            placeholder: 'Имя в чате',
            value: 'Ivan Petrov',
            onBlur: () => {
            },
        }),
        LabelPhone: new Label({
            text: 'Телефон',
        }),
        InputPhone: new Input({
            id: 'phone',
            name: 'phone',
            type: 'tel',
            placeholder: 'Номер телефона',
            value: '+79999999999',
            onBlur: () => {
            },
        }),
        LabelPassword: new Label({
            text: 'Старый пароль',
        }),
        InputPassword: new Input({
            id: 'password',
            name: 'password',
            type: 'password',
            placeholder: 'Пароль',
            onBlur: () => {
            },
        }),
        LabelPasswordRepeat: new Label({
            text: 'Новый пароль',
        }),
        InputPasswordRepeat: new Input({
            id: 'password_repeat',
            name: 'password_repeat',
            type: 'password',
            placeholder: 'Новый пароль',
            onBlur: () => {
            },
        }),
        Button: new Button({
            type: 'submit',
            text: 'Сохранить',
            class: 'btn',
            onClick: (event: Event) => {
                event.preventDefault();
                event.stopPropagation(); // отменяем действия по умолчанию. Будет работать после интеграции с backend
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
    });
    this.formValidator = new FormValidator();
    this.formValidator.addForm(this.props.id, (this.element as HTMLFormElement));
  }

  override render() {
    return `<form id="{{ id }}">
        <div class="form-item form-avatar">
            {{{ Avatar }}}
            {{{ InputAvatar }}}
        </div>
        <div class="form-item">
            {{{ LabelInput }}}
            {{{ InputEmail }}}
        </div>
        <div class="form-item">
            {{{ LabelLogin }}}
            {{{ InputLogin }}}
        </div>
        <div class="form-item">
            {{{ LabelFirstName }}}
            {{{ InputFirstName }}}
        </div>
        <div class="form-item">
            {{{ LabelSecondName }}}
            {{{ InputSecondName }}}
        </div>
        <div class="form-item">
            {{{ LabelChatNickname }}}
            {{{ InputChatNickname }}}
        </div>
        <div class="form-item">
            {{{ LabelPhone }}}
            {{{ InputPhone }}}
        </div>
        <div class="form-item">
            {{{ LabelPassword }}}
            {{{ InputPassword }}}
        </div>
        <div class="form-item">
            {{{ LabelPasswordRepeat }}}
            {{{ InputPasswordRepeat }}}
        </div>
        <div class="form-actions">
            {{{ Button }}}
        </div>
    </form>`;
  }
}
