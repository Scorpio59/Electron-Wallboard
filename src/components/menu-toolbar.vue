<template>
<md-whiteframe>
    <md-toolbar id='menu-toolbar'>
        <h2 class="md-title" style="flex: 1">Wallboard</h2>
        <md-menu md-align-trigger>
            <md-button md-menu-trigger>Align trigger</md-button>

            <md-menu-content>
                <md-menu-item>
                    <md-icon>phone</md-icon>
                    <span>My Item 1</span>
                </md-menu-item>
                <md-menu-item>My Item 2</md-menu-item>
                <md-menu-item>My Item 3</md-menu-item>
            </md-menu-content>
        </md-menu>
    </md-toolbar>
</md-whiteframe>
</template>

<script>
export default {
    name: 'menu-toolbar',
    data() {
        return {};
    },
    methods: {

    }
};
</script>


<style scoped>

</style>
