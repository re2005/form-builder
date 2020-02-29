import Vue from 'vue';
import Buefy from 'buefy';
import UiIcon from '@/components/Global/UiIcon/UiIcon.vue';

Vue.component('UiIcon', UiIcon);

Vue.use(Buefy, { defaultIconPack: 'fa' });
