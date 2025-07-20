import { Route } from "./Route";
import Block from "./Block";

export default class ShowRouter {
    static __instance: ShowRouter;
    private routers: Array<Route> = [];
    private history: History = window.history;
    private currentRoute: Route | null = null;

    constructor() {
        if (ShowRouter.__instance) {
            return ShowRouter.__instance;
        }
        ShowRouter.__instance = this;
    }

    use(pathname: string, block: Block) {
        const route = new Route(pathname, block);
        this.routers.push(route);
        return this;
    }

    start() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        if ((pathname === '/messenger' || pathname === '/settings') && !localStorage.getItem('isAuth')) {
            this.go('/');
            return;
        }
        const route = this.getRoute(pathname);
        if (!route) {
            this.go('/404');
            return;
        }
        if (this.currentRoute) {
            this.currentRoute.leave();
        }
        this.currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    getRoute(pathname: string) {
        return this.routers.find((route) => route.match(pathname));
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoutes() {
        return this.routers;
    }
}
