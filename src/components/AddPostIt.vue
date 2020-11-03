<template>
<div>
  <div :class="classCss" @click="onClick" v-if="!createShouldBeDisplayed">
    <img src="../assets/plus.png" class="icon-add">
    <div class="text-add-postit-zone">
      {{ textPostIt }}
    </div>
  </div>
  <CreatePostIt 
    @validate="onValidate"
    @canceled="onCancel" v-if="createShouldBeDisplayed"
  />
</div>
</template>

<script>

import "../assets/main.scss"
import CreatePostIt from './CreatePostIt'
export default {
  components: {
    CreatePostIt
  },
  props: {
    postItDragged: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      modeCreate: false,
      textPostIt: "Cliquer pour ajouter une tâche"
    }
  },
  methods: {
    onCancel() {
      this.modeCreate = false;    
    },
    onValidate(event) {
      this.modeCreate = false;
      this.$emit("postItAdded",event)
    },
    onClick() {
        this.modeCreate = true;  
    }
  },
  computed: {
    classCss() {
      let def = "rounded-zone add-postit-zone"
      if(this.postItDragged) {
        return def + " add-zone-drag";
      } else {
        return def;
      }
    },
    createShouldBeDisplayed() {
      return this.modeCreate;
    }
  }
};
</script>
