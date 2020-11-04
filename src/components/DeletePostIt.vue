<template>
  <div ref="delete-element" :class="classCss">
      <img class="icon-zone" src="../assets/delete.png">
  </div>
</template>

<script>

import "../assets/main.scss"
export default {
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
    },
    hasPostItEdited: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    postItDropped() {
    // Si une édition est en cours on ne fait rien
    if(this.hasPostItEdited)
      return;
    let self = this;
    var n = new window.Noty({
      type:"warning",
      text: 'Voulez vous vraiment supprimer ce post-it?',
      buttons: [
        window.Noty.button('Oui', 'btn btn-success', function () {
          self.$emit("deletePostIt",self.postItDragged);
          n.close();
        }),
        window.Noty.button('Non', 'btn btn-error', function () {
            n.close();
        })
      ]
    });
    n.show();
    }
  },
  watch: {
      hasPostItDropped(newVal) {
        if(newVal && this.postItDraggedOnTop) {
          this.$nextTick(function () {
            this.postItDropped();
          })
        }
    }
  },
  data() {
    return {
      createShouldBeDisplayed: false
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
    classCss() {
      let def = "rounded-zone delete-postit-zone";
      if(this.hasPostItDragged) {
        if(this.postItDraggedOnTop) {
          this.$emit("shouldBeDeleted");
          return def +  " rounded-zone-drag element-drag-on-top";
        } else {
          return def + " rounded-zone-drag"; 
        }
      } else {
        return def;
      }
    }
  }
};
</script>
