const files = require.context('../', true, /\.i18n.ts$/);

type TranslationFile = {
    [key: string]: any;
}

let messages: TranslationFile = {};

messages = {
    nl: {},
    en: {}
};

files.keys().forEach(key => {
    const keyName = Object.keys(files(key).TRANSLATIONS.EN)[0];
    messages.nl[keyName] = files(key).TRANSLATIONS.NL[keyName];
    messages.en[keyName] = files(key).TRANSLATIONS.EN[keyName];
});

export default messages;
