<template>
  <vue-draggable-resizable  
    :ref="refPostIt"
    v-bind="dragOptions"
    @dragging="onDrag"
    @dragstop="onDragStop"
    class="postIt" 
    :style="mainStyle"
  >
    <table>
      <tr :style="titleStyle">
        <td>{{title}}</td>
      </tr>
      <tr :style="contentStyle">
        <td>{{content}}</td>
      </tr>
      <tr :style="dateStyle">
        <td>{{new Intl.DateTimeFormat('fr-CH').format(date)}}</td>
      </tr>
    </table>
  </vue-draggable-resizable>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable';

export default {
  components: {
    VueDraggableResizable
  },
  props: {
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 200,
    },
    color: {
      type: String,
      default: "LimeGreen",
    },
    title: {
      type: String,
      default: "title",
    },
    content: {
      type: String,
      default: "content",
    },
    date: null
  },
  data() {
    return {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
      z: 10, // the lower, the further on the back it is
      heightTitle: 30,
      heightDate: 30,
      isDragging: false,
      refPostIt: "ref_" + Math.random() * 1000
    }
  },
  methods: {
    onDrag() {
      this.left = this.$el.getBoundingClientRect().left
      this.top = this.$el.getBoundingClientRect().top
      this.bottom = this.$el.getBoundingClientRect().bottom
      this.right = this.$el.getBoundingClientRect().right
      this.$emit("postItDragStart",{
        left : this.left,
        top: this.top,
        bottom: this.bottom,
        right: this.right
      });
      this.isDragging = true;
    },
    onDragStop() {
      this.$emit("postItDragStop", {
        left: this.left,
        top: this.top,
        bottom: this.bottom,
        right: this.right,
        title: this.title,
        content: this.content,
        date: this.date
      });
      this.isDragging = false;
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
    },
    fontColor() {
      // TODO: get opposiite saturation & value from color. 
      // Color between white and black
      return "White"
    },
    mainStyle() {
      return {
        position: 'absolute',
        'z-index': this.z,
        width: `${this.width}px`,
        height: `${this.height}px`,
        'background-color': this.color,
        'color': this.fontColor,
        padding: '20px',
        'text-align': 'left',
      }
    },
    titleStyle() {
      return {
        height: `${this.heightTitle}px`,
        'vertical-align': 'top',
      }
    },
    contentStyle() {
      return {
        height: `${this.height - (this.heightTitle + this.heightDate)}px`,
        'vertical-align': 'top',
        'padding-top': '10px',
        'padding-bottom': '10px',
      }
    },
    dateStyle() {
      return {
        height: `${this.heightDate}px`,
        'text-align': 'end'
      }
    },
  }
};
</script>

<style scoped>
table, tr {
  width: 100%;
}
</style>
