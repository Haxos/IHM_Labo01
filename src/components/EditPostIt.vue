<template>
<div>
    <div :class="classCss">
        <img class="icon-zone" src="../assets/edit.png">
    </div>
</div>
</template>

<script>

import "../assets/main.scss"
export default {
  props: {
    postItDragged: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {

    }
  },
  computed: {
    classCss() {
      let def = "rounded-zone edit-postit-zone";
      if(this.postItDragged) {
        return def + " rounded-zone-drag edit-zone-drag"; 
      } else {
        return def;
      }
    }
  }
};
</script>
