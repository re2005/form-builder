<template>
    <b-field>
        <b-select
            v-model="$i18n.locale"
            placeholder="Select a language"
        >
            <option
                v-for="(lang, i) in options"
                :key="`Lang${i}`"
                :value="lang"
            >
                {{ lang }}
            </option>
        </b-select>
    </b-field>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import languageService from '@/services/language-service';

    @Component
    export default class LanguageSelector extends Vue {
        options = ['en', 'nl'];

        @Watch('$i18n.locale')
        onLanguageChange(value: string) {
            languageService.set(value);
        }
    }
</script>

<style lang="scss" scoped>
    .field {
        padding: 0;
        margin: 0 !important;
    }
</style>
