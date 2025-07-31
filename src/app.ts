import ShowRouter from './framework/ShowRouter';
import { LoginPage } from './pages/loginPage';
import { RegisterPage } from './pages/registrationPage';
import { ChatPage } from './pages/chatPage';
import { ProfilePage } from './pages/profilePage';
import { PasswordPage } from './pages/passwordPage';
import { NotFoundPage } from './pages/notfoundPage';
import { checkAuth } from './helpers/checkAuth';
import './styles/main.pcss'; 

const router = new ShowRouter();

checkAuth();

document.addEventListener('DOMContentLoaded', () => {
    router
        .use('/', new LoginPage()) 
        .use('/sign-up', new RegisterPage())
        .use('/messenger', new ChatPage())
        .use('/settings', new ProfilePage())
        .use('/password', new PasswordPage())
        .use('/404', new NotFoundPage())
        .start();
});
