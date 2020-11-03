<template>
<div>
  <div class="rounded-zone add-postit-zone" @click="onClick" v-if="!createShouldBeDisplayed">
    <img src="../assets/plus.png" class="icon-add">
    <div class="text-add-postit-zone">
      {{ textPostIt }}
    </div>
  </div>
  <CreatePostIt 
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
    onClick() {
        this.modeCreate = true;  
    }
  },
  computed: {
    createShouldBeDisplayed() {
      return this.modeCreate;
    }
  }
};
</script>
