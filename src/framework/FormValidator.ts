export default class FormValidator {
    private validationRules: {
        [key: string]: {
        [key: string]: RegExp
        }
    };
    isValid: boolean;

    constructor() {
        this.validationRules = {
            authorization: {
                login: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
                password: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
            },
            registration: {
                login: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
                phone: /^\+?[0-9]{10,15}$/,
                first_name: /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
                second_name: /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
                password: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
                password_repeat: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
                email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            },
            messageSending: {
                message: /^[a-zA-Zа-яА-Я0-9\s.,!?-]{1,255}$/,
            },
            userSettings: {
                name: /^[a-zA-Z\s]{1,50}$/,
                login: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
                first_name: /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
                second_name: /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
                email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                chat_nickname: /^[a-zA-Z0-9\s.,!?-]{2,255}$/,
                phone: /^\+?[0-9]{10,15}$/,
                password: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
                password_repeat: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
            },
            changePassword: {
                password_new: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
                password_repeat: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
            },
            newChat: {
                title: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
            },
            addUser: {
                login: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
            },
            removeUser: {
                login: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
            },
        };
        this.isValid = false;
    }

  /**
   * Validate an input
   * @param input The input element
   */
    public validateInput(input: HTMLInputElement | HTMLTextAreaElement): void {
        const formId = input.closest('form')?.id;
        if (!formId) {
            console.error('Form ID is not found');
            return;
        }
        const inputName = input.name;
        const rule = this.validationRules[formId][inputName];
        if (rule && !rule.test(input.value)) {
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }
    }

  /**
   * Validate a form
   * @param event The submit event
   * @param formElement The form element
   */
    public validateForm(event: SubmitEvent, formElement: HTMLFormElement): void {
        const formId = formElement.id;
        const inputs = formElement.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
        let isValid = true;
        inputs.forEach((input) => {
            const inputName = input.name;
            const rule = this.validationRules[formId][inputName];
            if (rule && !rule.test(input.value)) {
                input.classList.add('invalid');
                isValid = false;
                this.isValid = false;
            }
        });
        if (!isValid) {
            event.preventDefault();
        } else {
            this.isValid = true;
        }
    }

}
