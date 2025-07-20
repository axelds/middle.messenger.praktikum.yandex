import '/src/styles/components/auth.pcss';
import Block from '../../framework/Block';
import { Auth } from '../../components/auth/Auth';
import { Heading } from '../../components/heading/Heading';
import ShowRouter from '../../framework/ShowRouter';

const router = new ShowRouter();

export class LoginPage extends Block {
	constructor() {
		super({
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
		return `
            <div id="page"><main class="form-box">
                {{{ Heading }}}
                {{{ Auth }}}
            </main></div>`;
	}

}
