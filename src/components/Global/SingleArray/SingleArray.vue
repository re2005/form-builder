<template>
    <div>
        <section class="section">
            <div class="is-flex">
                <UiDrag
                    class="source"
                    :source="true"
                    :list="elementList"
                    :group="{ name: 'list', pull: 'clone', put: false }"
                />

                <div class="steps">
                    <div
                        v-for="(list, index) in lists"
                        :key="index"
                        class="lists"
                    >
                        <div class="step">
                            <b-button
                                type="is-danger is-padding-small"
                                @click="remove(index)"
                            >
                                <UiIcon
                                    icon="cross"
                                    size="14"
                                    color="white"
                                />
                            </b-button>
                            <UiDrag
                                :list="list"
                                group="list"
                                @change="onChange"
                            />
                        </div>
                    </div>
                    <b-button
                        class="add"
                        type="is-primary is-padding-small"
                        @click="add"
                    >
                        add step
                    </b-button>
                </div>
            </div>
        </section>
        <pre>
            {{ lists }}
        </pre>
    </div>
</template>

<script lang="ts">
    import UiDrag from '@/components/Global/UiDrag/UiDrag.vue';
    import { Component, Vue } from 'vue-property-decorator';
    import LanguageSelector from '@/components/Global/LanguageSelector/LanguageSelector.vue';
    import UiDragNested from '@/components/Global/UiDragNested/UiDragNested.vue';

    @Component({
        components: {
            UiDragNested,
            UiDrag,
            LanguageSelector
        }
    })
    export default class Home extends Vue {
        onChange(v: any) {
            // console.log(v);
        }

        remove(i: any) {
            this.lists.splice(i, 1);
        }

        add() {
            this.lists.push([]);
        }

        elementList = [
            {
                name: 'Text',
                text: '',
                id: 1
            },
            {
                name: 'Number',
                text: '',
                id: 2
            },
            {
                name: 'Price',
                text: '',
                id: 3
            }
        ];

        handler = {
            get: function (target: string, property: any) {
                console.log('getting ' + property + ' for ' + target);
                return target[property];
            },
            set: function (target: any, property: string, value: string, receiver: any) {
                console.log('setting ' + property + ' for ' + target + ' with value ' + value);
                target[property] = value;
                return true;
            }
        };

        listsArray = [];
        lists = new Proxy(this.listsArray, this.handler);
    };
</script>

<style lang="scss" scoped>
    @import '~css/imports';

    .lists {
        display: flex;
        flex-direction: column;
    }

    .steps {
        margin: 0 2 * $margin-default;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .step {
        background: $color-gray-00;
        padding: $margin-default;
        margin-bottom: $margin-default;
        @include box-shadow();
        border-radius: $border-radius;
        display: flex;
        flex-direction: column;
        justify-content: center;

        /deep/ ul {
            background: $color-gray-00;

            &:empty {
                background: $color-blue-gray-04;
                margin: $margin-default 0;
                border-radius: $border-radius;
            }

            li {
                margin: $margin-default 0;

                &:hover {
                    background: $color-gray-80;
                    color: $color-gray-10;
                }
            }
        }
    }

    .add {
        margin-top: $margin-default;
    }

    .source {
        width: 200px;
        margin-right: 2 * $margin-default;

        /deep/ li {
            border: 1px solid $color-gray-20;
            margin: $margin-default 0;

            &:hover {
                background: $color-gray-70;
                color: $color-gray-10;
            }
        }
    }

</style>
