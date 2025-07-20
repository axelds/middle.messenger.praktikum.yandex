import '/src/styles/components/profile.pcss';
import Block from '../../framework/Block';
import { ChangePassword } from '../../components/change-password/ChangePassword';
import { Heading } from '../../components/heading/Heading';
import { GoBack } from '../../components/goback/GoBack';
export class PasswordPage extends Block {
    constructor() {
        super({
            ChangePassword: new ChangePassword({
                id: 'changePassword',
            }),
            Heading: new Heading({
                type: 'h2',
                text: 'Смена пароля',
            }),
            GoBack: new GoBack({
            }),
        });
    }
    override render() {
        return `<div id="page-wrapper">
            <main class="profile">
                {{{ Heading }}}
                {{{ ChangePassword }}}
                {{{ GoBack }}}
            </main>
        </div>`;
    }
}
