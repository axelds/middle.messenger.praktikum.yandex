import ShowRouter from '../framework/ShowRouter';
import { URLS } from '../framework/Constants';

const router = new ShowRouter();
export function checkURL(pathname: string) {
    if (!Object.values(URLS).find((path) => path === pathname)) {
        router.go(URLS.PATH_404);
    }
}
