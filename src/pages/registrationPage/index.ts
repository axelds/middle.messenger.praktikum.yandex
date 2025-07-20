import '/src/styles/components/auth.pcss';
import Block from '../../framework/Block';
import { Registration } from '../../components/registration/Registration';
import { Heading } from '../../components/heading/Heading';
export class RegisterPage extends Block {
	constructor() {
		super({
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
		return `<div id="page">
            <main class="form-box">
                {{{ Heading }}}
                {{{ Registration }}}
            </main>
		</div>`;
	}
}
