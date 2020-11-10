<template>
  <div :class="classCss"
>
      <img class="icon-zone" src="../assets/edit.png">
      <CreatePostIt 
      @validate="onValidate"
      @canceled="onCancel" v-if="createShouldBeDisplayed"
      :postIt="postItDragged"
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
      type: Object,
      required: false
    },
    hasPostItDragged: {
      type: Boolean,
      default: false,
      required: false
    },
    hasPostItDropped: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      modeCreate: false,
    }
  },
  methods: {
    postItDropped() {
      this.modeCreate = true
      this.$emit("postItIsBeingEdited")
    },
    onCancel() {
      this.modeCreate = false;    
    },
    onValidate(event) {
      this.modeCreate = false;
      this.$emit("postItEdited",event)
    },
    onClick() {
        this.modeCreate = true;  
    }
  },
  watch: {
      hasPostItDropped(newVal) {
        if(newVal && this.postItDraggedOnTop) {
          this.postItDropped();
        }
    }
  },
  computed: {
    postItDraggedOnTop() {
      let left = this.$el.getBoundingClientRect().left;
      let top = this.$el.getBoundingClientRect().top;
      let bottom = this.$el.getBoundingClientRect().bottom;
      let right = this.$el.getBoundingClientRect().right;
      let verticalMatch = false;
      let horizontalMatch = false;
      let intersect = false;
      if ((this.postItDragged.top > top && this.postItDragged.top < bottom)||(this.postItDragged.bottom > top && this.postItDragged.bottom < bottom)) {
        verticalMatch = true
      } else{
        verticalMatch = false
      }

      if ((this.postItDragged.right > left && this.postItDragged.right < right)||(this.postItDragged.left < right && this.postItDragged.left > left)) {
        horizontalMatch = true
      } else {
        horizontalMatch = false
      }

      if (horizontalMatch && verticalMatch){
        intersect = true
      } else {
        intersect = false
      }
      return intersect;

    },
    createShouldBeDisplayed() {
      return this.modeCreate;
    },
    classCss() {
      let def = "rounded-zone edit-postit-zone";
      if(this.hasPostItDragged) {
        if(this.postItDraggedOnTop) {
          return def +  " rounded-zone-drag element-drag-on-top";
        } else {
          return def + " rounded-zone-drag"; 
        }
      } else {
        return def;
      }
    },
  }
};
</script>
