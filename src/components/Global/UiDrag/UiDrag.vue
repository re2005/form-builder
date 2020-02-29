<template>
    <draggable
        tag="ul"
        :list="list"
        :group="group"
        :move="onMove"
        :source="source"
        :clone="clone"
        :animation="100"
        easing="cubic-bezier(.5, 1.2, .6, 1.4)"
        @end="onChange"
    >
        <li
            v-for="(el, idx) in list"
            :key="`child_${el.name + getKey()}`"
        >
            <span v-if="exclude">
                <i
                    class="fa fa-edit"
                    @click="edit(el)"
                />
                <i
                    class="fa fa-times remove"
                    @click="removeAt(idx)"
                />
            </span>

            <p>{{ source ? el.name : el.label }}</p>
        </li>
    </draggable>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import draggable from 'vuedraggable';

    @Component({
        components: {
            draggable
        },
        name: 'UiDrag'
    })
    export default class UiNestedDraggable extends Vue {
        @Prop() list!: Array<any>;
        @Prop() group!: any;
        @Prop({ default: true }) exclude!: boolean;
        @Prop() source!: any;
        @Prop() clone!: any;
        @Prop() value!: any;

        onChange() {
            this.$emit('hasEnded');
        }

        edit(el: any) {
            const config = {
                element: el,
                name: el.name,
                type: el.type
            };
            this.$emit('edit', config);
        }

        removeAt(idx: any) {
            this.list.splice(idx, 1);
        }

        getKey() {
            return Math.random().toString(36).substring(2, 10);
        }

        onMove({ relatedContext, to }: any) {
            return (
                !relatedContext.component.$attrs.source && to.className !== 'parent'
            );
        }
    }
</script>

<style lang="scss" scoped>
    @import '~css/imports';

    ul {

        li {
            padding: $margin-default / 2 0;
            display: flex;
            cursor: move;

            i {
                margin-right: $margin-default;
                cursor: pointer;
            }
        }
    }

    .remove {
        color: $color-red;
    }

    .fa-edit {
        color: $color-gray-50;
    }
</style>
