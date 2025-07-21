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
        if (this.block) {
            this.block.hide();
        }
    }

    match(pathname: string): boolean {
        return this.path === pathname;
    }

    render(): void {
        RenderDOM(this.block);
    }
}

/*
import { BlockClass, props } from 'types';
import renderDOM from './renderDOM';
import { Block } from 'core';

export class Route<P = any> {
  private pathname: string;
  private blockClass: BlockClass<P>;
  private block: Block | null = null;
  private props: props;

  constructor(pathname: string, view: BlockClass<P>, props: props) {
    this.pathname = pathname;
    this.blockClass = view;
    this.props = props;
  }
  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }
  leave() {
    if (this.block) {
      this.block.hide();
    }
  }
  match(pathname: string) {
    return pathname === this.pathname;
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass({ ...this.props });
      renderDOM(this.block);
      return;
    }

    this.block.show();
  }
}
  */
 