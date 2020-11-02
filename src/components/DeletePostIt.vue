<template>
<div>
    <div :class="classCss">
        <img class="icon-zone" src="../assets/delete.png">
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
      let def = "rounded-zone delete-postit-zone";
      if(this.postItDragged) {
        return def + " rounded-zone-drag"; 
      } else {
        return def;
      }
    }
  }
};
</script>
