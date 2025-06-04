import Handlebars from 'handlebars';
import * as Pages from './pages';

import Aside from './components/Aside.js';
import Input from './components/Input.js';
import Textarea from './components/Textarea.js';
import Label from './components/Label.js';
import Button from './components/Button.js';
import Heading from './components/Heading.js';
import Avatar from './components/Avatar.js';
Handlebars.registerPartial('Aside', Aside);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Textarea', Textarea);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Heading', Heading);
Handlebars.registerPartial('Avatar', Avatar);
Handlebars.registerPartial('Label', Label);

export default class App {
  constructor() {
    this.state = {
      currentPage: 'loginPage',
    };
    this.appElement = document.getElementById('app');
  }

  render() {
    let template;
    if (this.state.currentPage === 'loginPage') {
      template = Handlebars.compile(Pages.loginPage);
      this.appElement.innerHTML = template();
    } else if (this.state.currentPage === 'registerPage') {
      template = Handlebars.compile(Pages.registerPage);
      this.appElement.innerHTML = template();
    } else if (this.state.currentPage === 'chatsPage') {
      template = Handlebars.compile(Pages.chatsPage);
      this.appElement.innerHTML = template();
    } else if (this.state.currentPage === 'profilePage') {
      template = Handlebars.compile(Pages.profilePage);
      this.appElement.innerHTML = template();
    } else if (this.state.currentPage === 'serverPage') {
      template = Handlebars.compile(Pages.serverPage);
      this.appElement.innerHTML = template();
    } else {
      template = Handlebars.compile(Pages.notfoundPage);
      this.appElement.innerHTML = template();
    }
    this.attachEventListeners();
  }

  attachEventListeners() {
    const pageLinks = document.querySelectorAll('.page-link');
    pageLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage(e.target.id);
      });
    });
  }

  changePage(page) {
    this.state.currentPage = page;
    this.render();
  }

}