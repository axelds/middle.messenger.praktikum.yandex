import Block from '../../framework/Block';

export class MenuToggle extends Block {
    constructor(props: {
        id?: string;
        class?: string;
        onClick: (event: Event) => void;
    }) {
        super({
        ...props,
        events: {
            click: (event: Event) => {
            props.onClick(event);
            },
        },
        });
    }

    override render() {
        return '<div id="{{ id }}" class="usermenu-toggle {{ class }}"><span><svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E"/><circle cx="1.5" cy="8" r="1.5" fill="#1E1E1E"/><circle cx="1.5" cy="14" r="1.5" fill="#1E1E1E"/></svg></span></div>';
    }
}
