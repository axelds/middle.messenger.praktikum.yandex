interface InitStateType {
    chats: any[];
    userInfo: any;
    messages: any[];
    currentChat: number;
}

export const initState: InitStateType = {
    chats: [
        {
        avatar: null,
        created_by: 0,
        id: 0,
        last_message: {
            content: '',
            id: 0,
            time: '',
            user: {
            avatar: '',
            display_name: '',
            email: '',
            first_name: '',
            login: '',
            phone: '',
            second_name: '',
            id: 0,
            },
        },
        title: '',
        unread_count: 0,
        },
    ],
    userInfo: {
        avatar: '',
        display_name: '',
        email: '',
        first_name: '',
        login: '',
        phone: '',
        second_name: '',
        id: 0,
    },
    messages: [],
    currentChat: 0
};
