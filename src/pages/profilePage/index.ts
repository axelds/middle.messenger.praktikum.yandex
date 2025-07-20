import '/src/styles/components/profile.pcss';
import Block from '../../framework/Block';
import { Profile } from '../../components/profile/Profile';
import { Heading } from '../../components/heading/Heading';
import { GoBack } from '../../components/goback/GoBack';
export class ProfilePage extends Block {
    constructor() {
        super({
            Profile: new Profile({
                id: 'userSettings',
            }),
            Heading: new Heading({
                type: 'h2',
                text: 'Профиль',
            }),
            GoBack: new GoBack({
            }),
        });
    }
    override render() {
        return `<div id="page-wrapper">
            <main class="profile">
                {{{ Heading }}}
                {{{ Profile }}}
                {{{ GoBack }}}
            </main>
        </div>`;
    }
}
