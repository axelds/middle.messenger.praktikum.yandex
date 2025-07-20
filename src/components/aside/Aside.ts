import Block from '../../framework/Block';
import { Link } from '../link/Link';

export class Aside extends Block {
    constructor() {
        super({
        LinkLogin: new Link({
            href: '/',
            datapage: 'loginPage',
            text: 'Авторизация',
            class: 'page-link',
            onClick: () => {
            },
        }),
        LinkRegister: new Link({
            href: '/sign-up',
            datapage: 'registerPage',
            text: 'Регистрация',
            class: 'page-link',
            onClick: () => {
            },
        }),
        LinkChat: new Link({
            href: '/chat/',
            datapage: 'chatPage',
            text: 'Список чатов и лента переписки',
            class: 'page-link',
            onClick: () => {
            },
        }),
        LinkProfile: new Link({
            href: '/profile/',
            datapage: 'profilePage',
            text: 'Профиль',
            class: 'page-link',
            onClick: () => {
            },
        }),
        LinkServerError: new Link({
            href: '/server-error/',
            datapage: 'serverErrorPage',
            text: '5xx',
            class: 'page-link',
            onClick: () => {
            },
        }),
        LinkNotFound: new Link({
            href: '/404/',
            datapage: 'notfoundPage',
            text: '404',
            class: 'page-link',
            onClick: () => {
            },
        }),
        });
    }

    override render() {
        return `<aside class="sidebar">
        <h2>Навигация по страницам</h2>
            <nav>
                {{{ LinkLogin }}}
                {{{ LinkRegister }}}
                {{{ LinkChat }}}
                {{{ LinkProfile }}}
                {{{ LinkServerError }}}
                {{{ LinkNotFound }}}
            </nav>
        </aside>`;
    }
}
