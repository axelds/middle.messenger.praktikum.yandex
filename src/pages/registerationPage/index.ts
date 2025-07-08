import '/src/styles/components/auth.pcss';
import Block from '../../framework/Block';
import { Registration } from '../../components/registration/Registration';
import { Aside } from '../../components/aside/Aside';
import { Heading } from '../../components/heading/Heading';
export class RegisterPage extends Block {
	constructor() {
		super({
			Aside: new Aside(),
            Registration: new Registration({
                id: 'registration',
            }),
            Heading: new Heading({
                type: 'h2',
                text: 'Регистрация',
            }),
		});
	}
	override render() {
		return `<div id="app">
            <main class="form-box">
                {{{ Heading }}}
                {{{ Registration }}}
            </main>
            {{{ Aside }}}
		</div>`;
	}
}
