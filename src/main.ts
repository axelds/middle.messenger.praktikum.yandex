import './styles/main.pcss'; 
import App from './app.ts';

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.render();
});
