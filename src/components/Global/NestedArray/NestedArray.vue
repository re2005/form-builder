<template>
    <div>
        <UiDragNested
            :list="itemsArray"
            @addStep="add"
        />
    </div>
</template>

<script lang="ts">
    import UiDrag from '@/components/Global/UiDrag/UiDrag.vue';
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import LanguageSelector from '@/components/Global/LanguageSelector/LanguageSelector.vue';
    import UiDragNested from '@/components/Global/UiDragNested/UiDragNested.vue';
    import { StepTypes } from '@/types/steps.types';
    import { cloneDeep } from 'lodash';

    @Component({
        components: {
            UiDragNested,
            UiDrag,
            LanguageSelector
        }
    })
    export default class NestedArray extends Vue {
        itemsArray: Array<StepTypes> = [];

        created() {
            const storage = window.localStorage.getItem('list');
            this.itemsArray = storage ? JSON.parse(storage) : [];
        }

        newStep: StepTypes = {
            label: 'Untitled',
            fieldGroup: 'Step',
            scrollToArticle: '#name',
            repeatStep: '',
            conditions: '',
            leadingText: '',
            tip: '',
            list: []
        };

        add() {
            this.itemsArray.push(cloneDeep(this.newStep));
        }

        @Watch('itemsArray', { deep: true })
        onChange(v: any) {
            window.localStorage.setItem('list', JSON.stringify(v));
            this.$emit('changed', v);
        }
    };
</script>

<style lang="scss" scoped>
    @import '~css/imports';
</style>
