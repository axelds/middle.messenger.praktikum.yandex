interface SigninType {
    login: string;
    password: string;
}

interface SignupType {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    password: string;
}

interface ChatsType {
    avatar: null | string;
    created_by: number;
    id: number;
    last_message?: LastMessage;
    title: string;
    unread_count: number;
}

interface initState {
    chats?: ChatsType[];
    userInfo?: UserType;
    usersFromChats?: string;
    users?: string;
    messages?: any;
} 

interface UserType {
    avatar: null | string;
    display_name: string;
    email: string;
    first_name: string;
    login: string;
    phone: string;
    second_name: string;
    id?: number;
    role?: 'regular' | 'admin';
}

interface LastMessage {
    content: string;
    id: number;
    time: string;
    user: UserType;
}


interface SearchUserByLoginType {
    login: string;
}

interface DeleteChatType {
    chatId: number
}

interface ProfileType {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

interface PasswordType {
    oldPassword: string;
    newPassword: string;
}

export type { SigninType, SignupType,ChatsType, initState, UserType, LastMessage, SearchUserByLoginType, DeleteChatType, ProfileType, PasswordType };