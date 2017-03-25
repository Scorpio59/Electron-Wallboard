<template>
<md-whiteframe>
    <md-toolbar id='menu-toolbar'>
        <h2 class="md-title" style="flex: 1">Wallboard</h2>
        <md-menu md-align-trigger>
            <md-button md-menu-trigger>Config</md-button>
            <md-menu-content>
                <md-menu-item>
                    <md-icon>file_download</md-icon>
                    <span>Import</span>
                </md-menu-item>
                <md-menu-item>
                    <md-icon>file_upload</md-icon>
                    <span>Export</span>
                </md-menu-item>
            </md-menu-content>
        </md-menu>
        <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>edit</md-icon>
        </md-button>
        <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>cached</md-icon>
        </md-button>
        <md-button md-menu-trigger>
            <md-icon>all_out</md-icon>Fullscreen
        </md-button>
        <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>settings</md-icon>
        </md-button>
        <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>highlight_off</md-icon>
            <md-tooltip md-direction="bottom">Close</md-tooltip>
        </md-button>
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
