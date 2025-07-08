import '/src/styles/components/errors.pcss';
import Block from '../../framework/Block';
import { Aside } from '../../components/aside/Aside';
import { Heading } from '../../components/heading/Heading';
import { Link } from '../../components/link/Link';
export class ServerErrorPage extends Block {
    constructor() {
        super({
            Aside: new Aside(),
            HeadingH2: new Heading({
                type: 'h2',
                text: '500',
            }),
            HeadingH3: new Heading({
                type: 'h3',
                text: 'Мы уже фиксим',
            }),
            Link: new Link({
                href: '/',
                datapage: 'loginPage',
                text: 'Вернуться на главную',
                class: 'page-link',
                onClick: () => {
                },
            }),
        });
    }
    override render() {
        return `<div id="app">
            <main class="error-page">
                {{{ HeadingH2 }}}
                {{{ HeadingH3 }}}
                <p>
                    {{{ Link }}}
                </p>
            </main>
            {{{ Aside }}}
        </div>`;
    }
}
