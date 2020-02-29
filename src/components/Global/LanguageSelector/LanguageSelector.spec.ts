import { mount } from '@vue/test-utils';
import LanguageSelector from '@/components/Global/LanguageSelector/LanguageSelector.vue';
import languageService from '@/services/language-service';
import { Vue } from 'vue-property-decorator';

let wrapper: any;

const $i18n = {
    locale: 'en'
};

const options = ['en', 'nl', 'pt'];

describe('Language Selector', () => {
    beforeEach(() => {
        languageService.set = jest.fn();

        wrapper = mount(LanguageSelector, {
            mocks: {
                $i18n
            },
            data() {
                return {
                    options
                };
            }
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('Render component', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Render language options', () => {
        const options = wrapper.findAll('option');
        expect(options).toHaveLength(3);
    });

    it('Ensure locale is watched and service is called', async () => {
        wrapper.vm.$i18n.locale = 'nl';
        await Vue.nextTick();
        expect(languageService.set).toBeCalledWith('nl');
    });

    it('Language change is watched and service is called', async () => {
        wrapper.findAll('option').at(2).setSelected();
        expect(wrapper.vm.$i18n.locale).toBe('pt');
        await Vue.nextTick();
        expect(languageService.set).toBeCalledWith('pt');
    });
});
