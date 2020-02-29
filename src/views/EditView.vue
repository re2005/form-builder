<template>
    <div class="edit-view">
        <NestedArray @changed="onChange" />
        <div class="html-editor">
            Editor Here...
            <pre>{{ values }}</pre>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import LanguageSelector from '@/components/Global/LanguageSelector/LanguageSelector.vue';
    import NestedArray from '@/components/Global/NestedArray/NestedArray.vue';
    import SingleArray from '@/components/Global/SingleArray/SingleArray.vue';

    @Component({
        components: {
            SingleArray,
            NestedArray,
            LanguageSelector
        }
    })
    export default class EditView extends Vue {
        values = [];

        onChange(v: any) {
            this.values = v;
        }
    };
</script>

<style lang="scss" scoped>
    @import '~css/imports';

    .edit-view {
        display: flex;
        justify-content: space-between;
    }

    .html-editor {
        background: $color-gray-00;
        border-radius: $border-radius;
        flex: 2;
        margin-left: 3 * $margin-default;
        padding: 3 * $margin-default;
    }

    pre {
        margin-top: 30px;
        font-size: 10px;
    }
</style>
