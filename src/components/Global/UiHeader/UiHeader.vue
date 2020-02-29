<template>
    <header class="ui-header">
        <div class="header-left">
            <i class="fas fa-arrow-left is-button" />
        </div>
        <div class="header-title">
            <h1>
                Form title
            </h1>
        </div>
        <div class="header-right">
            <LanguageSelector />
            <i class="fas fa-cog is-button" />
            <i class="fas fa-ellipsis-h is-button" />
            <b-button
                type="is-padding-small"
                disabled
            >
                {{ $t('UI_HEADER.SAVE_PUBLISH') }}
            </b-button>
            <b-button type="is-primary is-padding-small">
                {{ $t('UI_HEADER.SAVE_DRAFT') }}
            </b-button>
        </div>
    </header>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import LanguageSelector from '@/components/Global/LanguageSelector/LanguageSelector.vue';

    @Component({
        components: { LanguageSelector }
    })
    export default class UiHeader extends Vue {
    }
</script>

<style lang="scss" scoped>
    @import '~css/_imports';

    .ui-header {
        position: relative;
        height: 64px;
        display: flex;
        align-items: center;
        align-content: center;
        background: $color-gray-00;
        padding: 0 2 * $margin-default;
        justify-content: space-between;

        @include breakpoint-up(sm) {
            height: 100px;
            padding: 0 5 * $margin-default;
        }
    }

    .header-title {
        margin: auto;
        @include fs-medium;
    }

    .header-right {
        position: absolute;
        display: flex;
        align-items: center;
        right: 2 * $margin-default;

        * {
            margin-left: $margin-default;
        }
    }

    .header-left {
        position: absolute;
        left: 2* $margin-default;
    }

    i {
        color: $color-gray-70;
        padding: 10px;
        border: 1px solid $color-gray-20;
        border-radius: 100%;
    }

    .is-button {
        cursor: pointer;

        &:hover {
            border: 1px solid $color-gray-40;
            color: $color-gray-80;
        }
    }
</style>
