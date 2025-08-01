import { Link } from './Link';

describe('Link', () => {
    it('should render a link with the correct href and text', () => {
        const link = new Link({
            href: '/test',
            text: 'Test Link',
            onClick: () => {},
        });
        expect(link.getContent().outerHTML).toBe('<a href=\"/test\" data-page=\"\" class=\"\">Test Link</a>');
        
    });

    it('should call the onClick event handler when clicked', () => {
        const onClick = jest.fn();
        const link = new Link({
            text: 'Test Link',
            onClick,
        });
        const linkElement = link.getContent();
        linkElement.click();
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
