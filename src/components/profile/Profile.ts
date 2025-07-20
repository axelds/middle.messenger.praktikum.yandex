import Block from '../../framework/Block';
import ShowRouter from '../../framework/ShowRouter';
import { AuthAPI } from '../../api/auth-api';
import { ProfileAPI } from '../../api/profile-api';
import { Input } from '../input/Input';
import { Button } from '../../components/button/Button';
import { Avatar } from '../../components/avatar/Avatar';
import { Label } from '../../components/label/Label';
import { Link } from '../../components/link/Link';
import { Modal } from '../../components/modal/Modal';
import FormValidator from '../../framework/FormValidator';
import { API_URLS } from '../../framework/Constants';

const router = new ShowRouter();

export class Profile extends Block {
    private formValidator: FormValidator;

    constructor(props: { id: string }) {
        super({
            ...props,
            Avatar: new Avatar({
                src: '/images/avatar-default.svg',
                name: 'avatar',
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
                onBlur: (event: Event) => {
                    this.formValidator.validateInput(event.target as HTMLInputElement);
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
                onBlur: (event: Event) => {
                    this.formValidator.validateInput(event.target as HTMLInputElement);
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
                onBlur: (event: Event) => {
                    this.formValidator.validateInput(event.target as HTMLInputElement);
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
                onBlur: (event: Event) => {
                    this.formValidator.validateInput(event.target as HTMLInputElement);
                },
            }),
            LabelChatNickname: new Label({
                text: 'Имя в чате',
            }),
            InputChatNickname: new Input({
                id: 'chat_nickname',
                name: 'chat_nickname',
                type: 'text',
                placeholder: 'Имя в чате',
                onBlur: (event: Event) => {
                    this.formValidator.validateInput(event.target as HTMLInputElement);
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
                onBlur: (event: Event) => {
                    this.formValidator.validateInput(event.target as HTMLInputElement);
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
                        userInfo.updateProfile({
                            first_name: formData.get('first_name') as string,
                            second_name: formData.get('second_name') as string,
                            display_name: formData.get('chat_nickname') as string,
                            login: formData.get('login') as string,
                            email: formData.get('email') as string,
                            phone: formData.get('phone') as string,
                        }).then(() => {
                            this.fillProfileData();
                            this.children.Modal.setProps({
                                text: 'Профиль успешно обновлен',
                                class: 'show',
                            });
                        }).catch(() => {
                            this.children.Modal.setProps({
                                text: 'Ошибка обновления профиля',
                                class: 'show',
                            });
                        });
                        if(formData.get('avatar') !== null) {
                            const avatarFormData = new FormData();
                            avatarFormData.append('avatar', formData.get('avatar') as File);
                            console.log(avatarFormData);
                            userInfo.updateAvatar(avatarFormData).then(() => {
                                this.fillProfileData();
                                this.children.Modal.setProps({
                                    text: 'Аватар успешно обновлен',
                                    class: 'show',
                                });
                            }).catch(() => {
                                this.children.Modal.setProps({
                                    text: 'Ошибка обновления аватара',
                                    class: 'show',
                                });
                            });
                        }
                    }
                },
            }),
            PasswordLink: new Link({
                text: 'Изменить пароль',
                class: 'password-link',
                href: '/password',
                onClick: () => {
                    
                }
            }),
            Logout: new Link({
                text: 'Выход',
                class: 'logout-link',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const auth = new AuthAPI();
                    auth.logout().then(() => {
                        localStorage.removeItem('isAuth');
                        router.go('/');
                    });
                },
            }),
            Modal: new Modal({
                text: '',
                class: 'hide',
            }),
        });

        this.formValidator = new FormValidator();
        this.fillProfileData();
    }

    private fillProfileData(): void {
        const auth = new AuthAPI();
        auth.profile().then((profile) => {
            const profileData = JSON.parse(profile as string) as { first_name: string, second_name: string, email: string, login: string, display_name: string, phone: string, avatar: string  };
            this.children.InputFirstName.setProps({ value: profileData.first_name });
            this.children.InputSecondName.setProps({ value: profileData.second_name });
            this.children.InputEmail.setProps({ value: profileData.email });
            this.children.InputLogin.setProps({ value: profileData.login });
            this.children.InputChatNickname.setProps({ value: profileData.display_name });
            this.children.InputPhone.setProps({ value: profileData.phone });
            if(profileData.avatar !== null) {
                this.children.Avatar.setProps({ src: API_URLS.RESOURCES_URL + profileData.avatar });
            }
        }).catch((error) => {
            console.error("Failed to fetch profile data", error);
        });
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
            <div class="form-actions">
                {{{ Button }}}
                {{{ PasswordLink }}}
                {{{ Logout }}}
            </div>
            {{{ Modal }}}
        </form>`;
    }
}
