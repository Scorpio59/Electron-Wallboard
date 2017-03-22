<template>
<transition name="modal">

    <dialog class="modal-mask">
        <div class="modal-wrapper ">
            <div class="modal-container mdl-dialog">

                <div class="modal-header">
                    <slot name="header">
                        default headers
                    </slot>
                </div>

                <div class="modal-body mdl-dialog__content">
                    <slot name="body">

                        <form action="#">
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" v-mdl>
                                <input class="mdl-textfield__input" type="number" id="polling">
                                <label class="mdl-textfield__label" for="polling">Rolling time</label>
                            </div>
                            <div>
                                <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" @click="addTab">
                                <i class="material-icons">playlist_add</i>
                              </button>
                                <label>add a new tab</label>
                            </div>
                            <ul class="mdl-list" v-mdl>
                                <li v-for="tab in tabs" :key="tab.id" class="mdl-list__item">
                                    <span class="mdl-list__item-primary-content">
                                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" v-mdl>
                                            <input class="mdl-textfield__input" type="url" v-model="viewData.src">
                                            <label class="mdl-textfield__label">Url</label>
                                        </div>
                                        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"  v-mdl>
                                          <input type="checkbox" class="mdl-checkbox__input" checked>
                                          <span class="mdl-checkbox__label">Force refresh</span>
                                    </label>
                                    <span class="mdl-list__item-secondary-action">
                                          <button class="mdl-button mdl-js-button mdl-button--icon" @click="removeTab(tab)">
                                            <i class="material-icons">clear</i>
                                          </button>
                                        </span>
                                    </span>
                                </li>
                            </ul>
                        </form>


                    </slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">

                    </slot>
                    <div class="mdl-dialog__actions mdl-dialog__actions--full-width">
                        <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab" @click="$emit('close')"> <i class="material-icons">save</i></button>
                    </div>
                </div>
            </div>
        </div>
    </dialog>
</transition>
</template>

<script>
require('material-design-lite');
export default {
    name: 'edit-modal',
    props: ['isInEditMode', 'viewData'],
    data() {
        return {
            tabs: [{}]
        };
    },
    methods: {
        removeTab: function(tab) {
            this.tabs.splice(this.tabs.indexOf(tab), 1);
        },
        addTab: function() {
            this.tabs.push({})
        }
    }
};
</script>


<style scoped>
button.delete {
    top: 10px;
    position: absolute;
    right: 10px;
}
</style>
