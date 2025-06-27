import { getCurrentPage } from './routes';
import Block from './framework/Block';

interface AppState {
    currentPage: Block;
}

export default class App {
    private state: AppState;
    private appContainer: HTMLElement | null;

    constructor() {
        this.state = {
            currentPage: getCurrentPage(),
        };
        this.appContainer = document.getElementById('app');
    }

    render(): void {
        if (this.appContainer && this.state.currentPage) {
            this.appContainer.replaceWith(this.state.currentPage.getContent());
        }
    }
}

