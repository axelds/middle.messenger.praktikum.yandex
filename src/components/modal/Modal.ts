import Block from '../../framework/Block';
import '../../styles/components/modal.pcss';

export class Modal extends Block {
    constructor(props: Record<string, unknown>) {
        super({
        ...props,
        class: 'hide',
            events: {
                click: (event: Event) => {
                    event.stopPropagation();
                    this.setProps({ class: 'hide' });
                },
            },
        });
    }

    override render() {
        return '<div id="modal" class="modal {{class}}"><a class="dismiss"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24"><path d="M 20.496094 2.9921875 A 0.50005 0.50005 0 0 0 20.146484 3.1464844 L 12 11.292969 L 3.8535156 3.1464844 A 0.50005 0.50005 0 0 0 3.4941406 2.9941406 A 0.50005 0.50005 0 0 0 3.1464844 3.8535156 L 11.292969 12 L 3.1464844 20.146484 A 0.50005 0.50005 0 1 0 3.8535156 20.853516 L 12 12.707031 L 20.146484 20.853516 A 0.50005 0.50005 0 1 0 20.853516 20.146484 L 12.707031 12 L 20.853516 3.8535156 A 0.50005 0.50005 0 0 0 20.496094 2.9921875 z"></path></svg></a> {{text}}</div>';
    }
}
