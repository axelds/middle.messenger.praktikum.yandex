import ShowRouter from '../framework/ShowRouter';
import { URLS } from '../framework/Constants';

const router = new ShowRouter();

export function checkAuth() {
    if (localStorage.getItem('isAuth') === null && window.location.pathname == '/messenger') {
        console.log('check');
    }
}

export function goToMessenger() {
    if (localStorage.getItem('isAuth')) {
        console.log('go to messenger');
        router.go(URLS.MESSENGER_PATH);
    }
}
