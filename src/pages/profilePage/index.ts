import '/src/styles/components/profile.pcss';
import Block from '../../framework/Block';
import { Profile } from '../../components/profile/Profile';
import { Aside } from '../../components/aside/Aside';
import { Heading } from '../../components/heading/Heading';
export class ProfilePage extends Block {
    constructor() {
        super({
            Aside: new Aside(),
            Profile: new Profile({
                id: 'userSettings',
            }),
            Heading: new Heading({
                type: 'h2',
                text: 'Профиль',
            }),
        });
    }
    override render() {
        return `<div id="app">
            <main class="profile">
                {{{ Heading }}}
                {{{ Profile }}}
            </main>
            {{{ Aside }}}
        </div>`;
    }
}
