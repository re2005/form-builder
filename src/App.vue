<template>
    <div id="app">
        <UiHeader />
        <section class="section">
            <router-view />
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import UiHeader from '@/components/Global/UiHeader/UiHeader.vue';

    @Component({
        components: { UiHeader }
    })
    export default class App extends Vue {
        open = false;
    }
</script>

<style lang="scss">
    @import '~css/imports';
</style>
