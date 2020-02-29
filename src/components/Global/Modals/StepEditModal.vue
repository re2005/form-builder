<template>
    <div
        class="modal-card"
    >
        <section class="modal-card-body">
            <h2>
                Edit: {{ name }}
            </h2>

            <b-field label="Label">
                <b-input
                    v-model="element.label"
                    placeholder="Label..."
                />
            </b-field>

            <b-field label="Field name">
                <b-input
                    v-model="element.fieldName"
                    placeholder="Anything..."
                />
            </b-field>

            <b-field label="Default value">
                <b-input
                    v-model="element.defaultValue"
                    placeholder="anything..."
                />
            </b-field>

            <b-field label="Leading text">
                <b-input
                    v-model="element.leadingText"
                    placeholder="anything..."
                />
            </b-field>

            <b-field label="Conditions">
                <b-input
                    v-model="element.conditions"
                    placeholder="anything..."
                />
            </b-field>

            <div class="button-wrapper">
                <b-button
                    type="is-primary is-padding-small"
                    @click="$parent.close()"
                >
                    close
                </b-button>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class StepEditModal extends Vue {
        @Prop() element!: any;
        @Prop() name!: string;
        @Prop() type!: string;
    }
</script>

<style lang="scss" scoped>
    @import '~css/imports';

    .modal-card-body {

        h2 {
            @include fs-medium;
            margin-bottom: 2 * $margin-default;
        }

        .button-wrapper {
            display: flex;
            justify-content: flex-end;
            margin: 2 *  $margin-default 0;
        }
    }

</style>
