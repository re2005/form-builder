<template>
    <div class="ui-drag">
        <div class="ui-drag-menu">
            <b-field>
                <b-input
                    rounded
                    type="search"
                    icon="search"
                    icon-clickable
                    placeholder="Search..."
                />
            </b-field>
            <h2>
                Standard fields
            </h2>
            <UiDrag
                :exclude="false"
                class="source"
                :source="true"
                :list="elementList"
                :clone="clone"
                :group="{ name: 'list', pull: 'clone' , put: false}"
                @hasEnded="hasEnded"
            />
        </div>

        <div class="steps">
            <draggable
                :list="list"
                :group="{ name: 'list' }"
                class="parent"
                tag="ul"
                :move="onMove"
            >
                <li
                    v-for="(el, idx) in list"
                    :key="`child_${el.name + getKey()}`"
                    class="step-wrapper"
                    :class="{'is-step-empty': el.list.length < 1}"
                >
                    <div class="step-header">
                        <span class="dragger">
                            <i class="fas fa-grip-lines" />
                        </span>
                        <p>STEP {{ idx + 1 }}</p>
                        <div class="step-header-actions">
                            <i
                                class="fas fa-pencil-alt"
                                @click="edit(el)"
                            />
                            <i
                                class="fa fa-times close"
                                @click="removeAt(idx)"
                            />
                        </div>
                    </div>
                    <p class="step-label">
                        {{ el.label }}
                    </p>

                    <p
                        v-if="el.list.length < 1"
                        class="is-empty"
                    >
                        Drag & drop an item from the left menu here to get started
                    </p>

                    <UiDrag
                        :group="{ name: 'list' }"
                        :list="el.list"
                        class="child"
                        @edit="edit"
                    />
                </li>
            </draggable>

            <b-button
                class="add-step"
                expanded
                type="is-medium"
                @click="addStep"
            >
                <i
                    class="fa fa-plus"
                />
                Add step
            </b-button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import draggable from 'vuedraggable';
    import UiDrag from '@/components/Global/UiDrag/UiDrag.vue';
    import StepEditModal from '@/components/Global/Modals/StepEditModal.vue';
    import { cloneDeep } from 'lodash';
    import { elementList } from '@/components/Global/UiDragNested/elementList';

    @Component({
        components: {
            UiDrag,
            draggable
        },
        name: 'UiDragNested'
    })
    export default class UiNestedDraggable extends Vue {
        @Prop() list!: Array<any>;

        elementList = elementList;

        lastAdded = undefined;

        clone(v: any) {
            this.lastAdded = cloneDeep(v);
            return this.lastAdded;
        }

        hasEnded() {
            this.edit(this.lastAdded);
        }

        edit(el: any) {
            const stepConfig = {
                element: el,
                name: 'Step'
            };
            const config = el.element ? el : stepConfig;

            this.$buefy.modal.open({
                parent: this,
                component: StepEditModal,
                hasModalCard: true,
                trapFocus: true,
                props: config
            });
        }

        removeAt(i: number): void {
            this.$buefy.dialog.confirm({
                title: 'Deleting Step',
                message: 'Are you sure you want to <b>delete</b> this step? This action cannot be undone.',
                confirmText: 'Delete Step',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => this.list.splice(i, 1)
            });
        }

        getKey(): string {
            return Math.random().toString(36).substring(2, 20);
        }

        onMove({ to, relatedContext }: any): boolean {
            return (
                !relatedContext.component.$attrs.source && to.className !== 'child'
            );
        }

        addStep() {
            this.$emit('addStep');
        }
    }
</script>

<style lang="scss" scoped>
    @import '~css/imports';

    .ui-drag {
        display: flex;
    }

    .ui-drag-menu {
        margin-right: 4 * $margin-default;

        h2 {
            @include font-size($medium-font-sizes);
            @include fs-medium;
            margin: 2 * $margin-default 0;
        }

        /deep/ li {
            color: $color-gray-60;
        }
    }

    .steps {
        width: 340px;
    }

    .step-wrapper {
        z-index: 1;
        width: 100%;
        position: relative;
        background: $color-gray-00;
        padding: 2 * $margin-default;
        margin-bottom: $margin-default;
        border-radius: $border-radius / 3;

        &.is-step-empty {
            min-height: 170px;
        }

        ul {
            min-height: 30px;
            z-index: 10;
        }
    }

    .is-empty {
        z-index: -1;
        width: calc(100% - 40px);
        position: absolute;
        text-align: center;
        color: $color-gray-60;
        word-break: break-word;
        background: $color-gray-10;
        padding: 2 * $margin-default;
        border-radius: $border-radius / 3;
        margin: 2 * $margin-default auto 0;
        @include font-size($small-font-sizes);
    }

    .child {
        margin-top: $margin-default;

        &:empty {
            min-height: 60px;
        }
    }

    .step-header {
        display: flex;
        position: relative;
        color: $color-gray-50;
        justify-content: space-between;

        p {
            @include font-size($small-font-sizes);
        }

        i {
            cursor: pointer;
        }

        .dragger {
            top: -26px;
            color: $color-gray-20;
            position: absolute;
            padding: 10px 20px;
            left: calc(50% - 20px);
            cursor: move;

            i {
                cursor: move;
            }
        }

        .step-header-actions {
            i {
                font-size: 20px;
                margin-left: $margin-default;
            }
        }
    }

    .step-label {
        @include fs-medium;
    }

    .add-step {
        justify-content: flex-start;
        color: $color-gray-40;

        span {
            font-size: 20px;

            i {
                margin-right: $margin-default;
            }
        }
    }

</style>
