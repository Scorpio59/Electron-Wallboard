<template>
<div id="column-container" class="column"  :class="[isInEditMode ? 'edit':'']" >fxf</div>
</template>

<script>
export default {
  name: 'column-container',
  props: ['isInEditMode'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  }
};
</script>


<style scoped>
.column {
   float: left;
   flex: 1;
    resize: horizontal;
    overflow: hidden;
    min-height: 100vh;
}

.edit{
     border: 1px solid;
     overflow: auto;
}

</style>
