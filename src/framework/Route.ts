import Block from "./Block";
import RenderDOM from "./RenderDOM";

export class Route {
    private block: Block;
    private path: string;

    constructor(path: string, view: Block) {
        this.path = path;
        this.block = view;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this.render();
        } else {
            this.leave();
        }
    }

    leave(): void {
        this.block.hide();
    }

    match(pathname: string): boolean {
        return this.path === pathname;
    }

    render(): void {
        RenderDOM(this.block);
    }
}
