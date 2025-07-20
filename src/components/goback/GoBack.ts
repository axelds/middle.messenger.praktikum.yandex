import Block from '../../framework/Block';
import ShowRouter from '../../framework/ShowRouter';

const router = new ShowRouter();

export class GoBack extends Block {
    constructor(props: {
        class?: string;
    }) {
        super({
            ...props,
            events: {
                click: (event: Event) => {
                    event.preventDefault();
                    router.back();
                },
            },
            class: 'go-back',
        });
    }

    override render() {
        return '<div class="{{class}}"><a><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="14" transform="rotate(-180 14 14)" fill="#0891B2"/><rect x="20" y="14.8" width="11" height="1.6" transform="rotate(-180 20 14.8)" fill="white"/><path d="M13 19L9 14L13 9" stroke="white" stroke-width="1.6"/></svg></a></div>';
    }
}
