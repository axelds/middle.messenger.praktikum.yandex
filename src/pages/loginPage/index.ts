import '/src/styles/components/auth.pcss';
import Block from '../../framework/Block';
import { Auth } from '../../components/auth/Auth';
import { Aside } from '../../components/aside/Aside';
import { Heading } from '../../components/heading/Heading';
export class LoginPage extends Block {
	constructor() {
		super({
			Aside: new Aside(),
            Auth: new Auth({
                id: 'authorization',
            }),
            Heading: new Heading({
                type: 'h2',
                text: 'Вход',
            }),
		});
	}
	override render() {
		return `<div id="app">
            <main class="form-box">
                {{{ Heading }}}
                {{{ Auth }}}
            </main>
            {{{ Aside }}}
		</div>`;
	}
}
