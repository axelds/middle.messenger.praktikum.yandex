import '/src/styles/components/chat.pcss';
import Block from '../../framework/Block';
import { SendMessage } from '../../components/chat/SendMessage';
import ShowRouter from '../../framework/ShowRouter';
import { AuthAPI } from '../../api/auth-api';
import { ChatAPI } from '../../api/chat-api';
import { ProfileAPI } from '../../api/profile-api';
import Messages from '../../api/chat-ws-api';
import Store from '../../framework/Store';
import { Link } from '../../components/link/Link';
import { CreateChat } from '../../components/chat/CreateChat';
import { Modal } from '../../components/modal/Modal';
import { ChatHeader } from '../../components/chat/ChatHeader';
import { AddUser } from '../../components/chat/AddUser';
import { MenuToggle } from '../../components/menu-toggle/MenuToggle';
import { SearchChat } from '../../components/chat/SearchChat';
import { AddAvatar } from '../../components/chat/AddAvatar';
import { API_URLS } from '../../framework/Constants';
import type { initState, SearchUserByLoginType } from '../../framework/Types';
import { checkAuth } from '../../helpers/checkAuth';

const router = new ShowRouter();
const authAPI = new AuthAPI();
const chatAPI = new ChatAPI();
const profileAPI = new ProfileAPI();

export class ChatPage extends Block {
    constructor(...args: any) {
        super({
            ...args,
            SendMessage: new SendMessage({
                id: 'messageSending',
            }),
            LinkProfile: new Link({
                href: '/settings',
                text: 'Профиль',
                onClick: () => { }
            }),
            LinkCreateChat: new Link({
                href: '#',
                class: 'create-chat',
                text: 'Создать чат',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.children.CreateChat.show();
                }
            }),
            Modal: new Modal({
                text: '',
                class: 'hide',
            }),
            CreateChat: new CreateChat({
                id: "newChat",
                onSubmit: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const formData = new FormData(event.target as HTMLFormElement);
                    chatAPI.createChat({ title: formData.get('title') as string }).then((response) => {
                        this.children.Modal.setProps({
                            text: 'Чат создан',
                            class: 'show',
                        });
                        const state = Store.getState();
                        const newChat = {
                            avatar: null,
                            id: JSON.parse(response as string).id,
                            title: formData.get('title') as string,
                            unread_count: 0,
                            created_by: 0,
                        };
                        state?.chats?.push(newChat);
                        Store.on('update', () => {
                            const state = Store.getState() as initState;
                            this.setProps({ chats: state.chats });
                        });
                        this.getChats();
                        this.children.CreateChat.hide();
                    });
                }
            }),
            ChatHeader: new ChatHeader({
                title: '',
                src: ''
            }),
            LinkAddUser: new Link({
                href: '#',
                text: 'Добавить пользователя',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.children.MenuToggle.element?.classList.remove('active');
                    this.children.AddUser.show();
                }
            }),
            LinkRemoreUser: new Link({
                href: '#',
                class: 'remove-icon',
                text: 'Удалить пользователя',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.children.MenuToggle.element?.classList.remove('active');
                    this.children.RemoveUser.show();
                }
            }),
            LinkAddAvatar: new Link({
                href: '#',
                text: 'Изменить аватар чата',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.children.MenuToggle.element?.classList.remove('active');
                    this.children.AddAvatar.show();
                }
            }),
            LinkDeleteChat: new Link({
                href: '#',
                class: 'remove-icon',
                text: 'Удалить чат',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    chatAPI.deleteChat({ chatId: this.props.currentChat }).then(() => {
                        this.children.Modal.setProps({
                            text: 'Чат удален',
                            class: 'show',
                        });
                        this.getChats();
                        window.location.reload();
                    });
                }
            }),
            MenuToggle: new MenuToggle({
                id: 'userMenuToggle',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.children.MenuToggle.element?.classList.toggle('active');
                }
            }),
            AddUser: new AddUser({
                id: 'addUser',
                title: 'Добавить пользователя',
                btn_text: 'Добавить',
                onSubmit: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const formData = new FormData(event.target as HTMLFormElement);
                    profileAPI.searchUserByLogin({ login: formData.get('login') as string } as SearchUserByLoginType).then((response) => {
                        const user = JSON.parse(response as string);
                        chatAPI.addUserToChat({
                            users: [user[0].id],
                            chatId: Number(this.props.currentChat),
                        }).then(() => {
                            this.children.Modal.setProps({
                                text: 'Пользователь добавлен',
                                class: 'show',
                            });
                            this.children.AddUser.hide();
                        }).catch(() => {
                            this.children.Modal.setProps({
                                text: 'Ошибка добавления пользователя',
                                class: 'show',
                            });
                        });
                    });
                }
            }),
            RemoveUser: new AddUser({
                id: 'removeUser',
                title: 'Удалить пользователя',
                btn_text: 'Удалить',
                onSubmit: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const formData = new FormData(event.target as HTMLFormElement);
                    profileAPI.searchUserByLogin({ login: formData.get('login') as string } as SearchUserByLoginType).then((response) => {
                        const user = JSON.parse(response as string);
                        chatAPI.removeUserFromChat({
                            users: [user[0].id],
                            chatId: Number(this.props.currentChat),
                        }).then(() => {
                            this.children.Modal.setProps({
                                text: 'Пользователь удален из чата',
                                class: 'show',
                            });
                            this.children.RemoveUser.hide();
                        }).catch(() => {
                                this.children.Modal.setProps({
                                    text: 'Ошибка удаления пользователя',
                                    class: 'show',
                                });
                        });
                    });
                }
            }),
            AddAvatar: new AddAvatar({
                id: 'addAvatar',
                title: 'Добавить аватар чата',
                onSubmit: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const formData = new FormData(event.target as HTMLFormElement);
                    formData.append('chatId', String(this.props.currentChat));
                    chatAPI.updateAvatar(formData).then((response) => {
                        this.children.Modal.setProps({
                            text: 'Аватар изменен',
                            class: 'show',
                        });
                        this.children.AddAvatar.hide();
                        this.children.ChatHeader.setProps({ src: JSON.parse(response as string).avatar });
                        this.getChats();
                    }).catch(() => {
                        this.children.Modal.setProps({
                            text: 'Ошибка изменения аватара',
                            class: 'show',
                        });
                    });
                }
            }),
            SearchChat: new SearchChat({
                id: 'searchChat',
                onSubmit: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const formData = new FormData(event.target as HTMLFormElement);
                    const searchResult = Store.getState()?.chats?.filter((chat) => {
                        return chat.title.toLowerCase().includes((formData.get('phrase') as string).toLowerCase());
                    });
                    this.setProps({ chats: searchResult });
                }
            })
        });
        this.getChats();
        this.getUserInfo();
        Messages.getMessages();
        this.setProps({
            events: {
                click: (event: Event) => {
                    if ((event.target as HTMLElement).closest('[data-chat-id]')) {
                        this.selectChat(Number((event.target as HTMLElement).closest('[data-chat-id]')?.getAttribute('data-chat-id')));
                    }
                },
            },
        });

        Store.on('update', () => {
            this.setProps(Store.getState() ?? {});
        });
    }

    public async getUserInfo() {
        const response = await authAPI.profile();
        Store.setState({ userInfo: JSON.parse(response as string) });
    }
    public async getChats() {
        const response = await chatAPI.getChats();
        Store.setState({ chats: JSON.parse(response as string) });
    }

    public async getChatUsers({ ...rest }: { id: string }) { // удалить
        return chatAPI.getChatUsers({ ...rest }).then(({ response }: any) => {
            Store.setState({ usersFromChats: response });
        }).catch();
    }

    public selectChat(id: Number) {
        Store.setState({ currentChat: id });
        this.children.ChatHeader.setProps({ title: this.props.chats.find((chat: any) => chat.id === id).title });
        this.children.ChatHeader.setProps({ src: this.props.chats.find((chat: any) => chat.id === id).avatar });
        chatAPI.getChatToken({ chatId: Number(id) }).then((token) => {
            Messages.connect({
                userId: Store.getState()?.userInfo?.id,
                chatId: Number(id),
                token: JSON.parse(token as string).token
            })
        }).catch();
    }

    override render() {
        const {
            chats = [],
            messages = [],
            currentChat = 0
        } = this.props;
        return `<div id="page-wrapper" class="chat-wrapper">
            <aside class="chat-aside">
                <div class="profile-link">
                    {{{ LinkCreateChat }}}
                    {{{ LinkProfile }}}
                </div>
                {{{ CreateChat }}}
                {{{ SearchChat }}}
                <div class="chat-list">
                    ${chats &&
                    chats.map((chat: any) => {
                        return `
                         <div>
                            <a class="chat-item" data-chat-id="${chat.id}">
                                <div class="chat-avatar">
                                ${chat.avatar ? `<img src="${API_URLS.RESOURCES_URL + chat.avatar}" alt="${chat.title}">` : ''}
                                </div>
                                <div class="chat-item_content">
                                    <div class="chat-name">${chat.title}</div>
                                    <div class="chat-latest">
                                        ${chat.last_message ? chat.last_message.content : ''}
                                    </div>
                                </div>
                                <div>
                                    <div class="chat-date">
                                        ${chat.last_message ?  new Date(chat.last_message.time).toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric', year: 'numeric' }) : ''}
                                    </div>
                                    ${chat.unread_count ? `<div class="chat-unread"><span>${chat.unread_count}</span></div>` : ''}
                                </div>
                            </a>
                        </div>
                        `;
                    }).join('')
                    }
                </div>
            </aside>
            <main class="chat-content ${currentChat === 0 ? 'hide' : ''}">
                <div class="current-chat_header">
                    {{{ ChatHeader }}}
                    {{{ MenuToggle }}}
                    <div class="current-chat_users">
                        {{{ LinkAddUser }}}
                        {{{ LinkRemoreUser }}}
                        {{{ LinkAddAvatar }}}
                        {{{ LinkDeleteChat }}}
                    </div>
                </div>
                {{{ AddUser }}}
                {{{ RemoveUser }}}
                {{{ AddAvatar }}}
                
                <div class="current-chat_body">
                ${messages && 
                messages.reduce((acc: string[], message: { time: string | number | Date, type: string }) => {
                    if (message.type !== 'message') {
                        return acc;
                    }

                    const date = new Date(message.time);
                    const dateString = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric', year: 'numeric' });

                    if (!acc.includes(dateString)) {
                        acc.push(dateString);
                    }

                    return acc;
                }, []).map((dateString: string) => {
                    return `
                            <div class="message-date">${dateString}</div>
                            ${messages.filter((message: { time: string | number | Date; type: string; isRead: any; user_id: any; content: any; }) => {
                                return message.type === 'message' && new Date(message.time).toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric', year: 'numeric' }) === dateString;
                            }).map((message: { time: string | number | Date; is_read: any; user_id: any; content: any; }) => {
                                const date = new Date(message.time);
                                const timeString = date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' });
                                const isRead = message.is_read && message.user_id === Store.getState()?.userInfo?.id;

                                return `
                                    <div class="message-row">
                                        <div class="message ${message.user_id === Store.getState()?.userInfo?.id ? 'me' : ''}">
                                            <div class="message__text">${message.content}</div>
                                            <div class="message__meta">
                                                ${isRead ? '<span class="message__status read"></span>' : '<span class="message__status unread"></span>'}
                                                <span class="message__time">${timeString}</span>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                            `;
                }).join('')}
                </div>
                {{{ SendMessage }}}
            </main>
            {{{ Modal }}}
        </div>`;
    }
}
