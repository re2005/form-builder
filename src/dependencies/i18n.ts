import Vue from 'vue';
import VueI18n from 'vue-i18n';
import languageService from '@/services/language-service';
import messages from '@/helpers/i18n';

Vue.use(VueI18n);

export const i18n = new VueI18n({
    locale: languageService.get(),
    messages
});
