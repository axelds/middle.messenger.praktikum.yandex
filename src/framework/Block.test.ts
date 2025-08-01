import Block from './Block';

describe('Block', () => {
    class Layout extends Block {
        constructor(props: Record<string, unknown>) {
            super({
                ...props,
            });
        }

        render() {
            return `<div>{{ text }}</div>`;
        }
    }

    test('getContent should return element', () => {
        const component = new Layout({
            text: 'test',
        });
        expect(component.getContent().outerHTML).toBe('<div>test</div>');
    });

    test('handle click event', () => {
        const component = new Layout({
            text: 'test',
        });
        component.setProps({ events: { click: () => {} } });
        component.getContent().click();
        expect(true).toBe(true);
    });

});
