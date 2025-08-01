[![Netlify Status](https://api.netlify.com/api/v1/badges/4eb0601f-664c-4cbb-8c5e-d759e691f9ea/deploy-status)](https://app.netlify.com/projects/messenger-13/deploys)

## Описание проекта

Название: Проект "Messenger 13"

Чат-приложение.

Адрес проекта на Netlify: https://messenger-13.netlify.app/

Макет (прототипы) в Figma: https://www.figma.com/design/Db9HBj3PBbHMZccyXSoF8Y/Messenger-13

Проект переведен на TypeScript.

Приложиние соответствует шаблону MVC. Добавлена валидация форм.

Подключен API для работы с пользователями и чатом.

Добавлены тесты компонентов. Тесты реализованы с использованием фреймворка для тестирования Jest.

Добавлен pre-commit.

## Установка
```shell
npm install
```
**Cборка и запуск проекта:**
```shell
npm run start
```
## Страницы проекта
Реализован роутинг. 

* Авторизация
* Регистрация
* Профиль пользователя
* Список чатов пользователя
* Страницы ошибок (5хх, 404)

## Тесты

Реализованы тесты для:

* Route (framework/Route.test.ts)
* Block (framework/Block.test.ts)
* Component (framework/Link.test.ts)
* API requests (api/base-api.test.ts)
* HTTP Transport (framework/HTTPTransport.test.ts)
