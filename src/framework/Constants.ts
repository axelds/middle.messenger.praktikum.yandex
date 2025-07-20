const URLS = {
    SIGNIN_PATH: '/',
    SIGNUP_PATH: '/sign-up',
    MESSENGER_PATH: '/messenger',
    SETTINGS_PATH: '/settings',
    PASSWORD_PATH: '/password',
    PATH_404: '/404',
};

const API_URLS = {
    BASE_URL: 'https://ya-praktikum.tech/api/v2',
    RESOURCES_URL: 'https://ya-praktikum.tech/api/v2/resources',
    WSS_URL: 'wss://ya-praktikum.tech/ws/chats',
}

const HEADERS = {
    JSON: { 'Content-Type': 'application/json' } 
}

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
}

export {
    URLS,
    API_URLS,
    HEADERS,
    METHODS
}
