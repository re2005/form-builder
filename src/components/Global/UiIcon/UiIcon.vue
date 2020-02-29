<template>
    <i
        :class="[type, color]"
        :style="{ width: size + 'px', height: size + 'px' }"
        class="ui-icon"
        v-on="$listeners"
        v-html="url"
    />
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { IconType } from '@/types/icons.types';

    @Component
    export default class UiIcon extends Vue {
        @Prop() icon!: boolean;
        @Prop() type!: IconType;
        @Prop() loading!: boolean;
        @Prop() size!: number;
        @Prop({ default: 'blue' }) color!: string;

        get url() {
            const type: IconType = this.type ? this.type : 'common';
            const icon = this.loading ? 'common/icon-loading' : `${type}/icon-${this.icon}`;
            try {
                return require('!svg-inline-loader!@/assets/icons/' + icon + '.svg');
            } catch (e) {
                // TODO post exception to logger API
                console.log('No icon was found', e);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~css/imports';

    .ui-icon {
        box-sizing: content-box;
        display: inline-block;
        font-size: 0;
        overflow: hidden;
        transition: fill .3s ease;

        &.blue {
            fill: $color-blue;
        }

        &.green {
            fill: $color-green;
        }

        &.red {
            fill: $color-red;
        }

        &.white {
            fill: $color-gray-00;
        }

        &.gray {
            fill: $color-gray;
        }

        &.inactive {
            fill: $color-blue-gray-02;
        }

        &:not(.custom):not(.service) {
            width: 24px;
            height: 24px;
        }
    }
</style>
