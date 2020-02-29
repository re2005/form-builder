const languageService = {

    constants: {
        KEY_NAME: 'APP-LANGUAGE',
        DEFAULT: 'en'
    },

    set(lang: string): void {
        window.localStorage.setItem(this.constants.KEY_NAME, lang);
    },
    get(): string {
        return <string>window.localStorage.getItem(this.constants.KEY_NAME) || this.constants.DEFAULT;
    }
};

export default languageService;
