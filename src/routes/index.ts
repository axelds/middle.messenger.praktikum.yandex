import { LoginPage } from '../pages/loginPage/';
import { RegisterPage } from '../pages/registerationPage';
import { ChatPage } from '../pages/chatPage/';
import { ProfilePage } from '../pages/profilePage/';
import { ServerErrorPage } from '../pages/serverErrorPage/';
import { NotFoundPage } from '../pages/notfoundPage/';

export const getCurrentPage = () => {
    const path = document.location.pathname;
    switch (path) {
        case '/':
        return new LoginPage();
        case '/registration/':
        return new RegisterPage();
        case '/chat/':
        return new ChatPage();
        case '/profile/':
        return new ProfilePage();
        case '/server-error/':
        return new ServerErrorPage();
        default:
        return new NotFoundPage();
    }
};
