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
      <hr style="border: 2px solid rgba(0, 0, 0, 0.1); margin-top: 1px;"/>
      <tr :style="contentStyle">
        <td>{{content}}</td>
      </tr>
      <tr v-if="shouldDisplayDate" :style="dateStyle">
       <td><input class="validate-date" v-model="validateDate" type="checkbox">{{displayDate}}</td>
      </tr>
    </table>
  </vue-draggable-resizable>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable';
import moment from "moment";
export default {
  components: {
    VueDraggableResizable
  },
  props: {
    id: {
      Number,
      default: 0
    },
    width: {
      type: Number,
      default: 250,
    },
    height: {
      type: Number,
      default: 250,
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
    leftInit: {
      type: Number,
      default: 0
    },
    rightInit: {
      type: Number,
      default: 0
    },
    topInit: {
      type: Number,
      default: 0
    },
    bottomInit: {
      type: Number,
      default: 0
    },
    validateDateInit: {
      type: Boolean,
      default: false
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
      refPostIt: "ref_" + Math.random() * 1000,
      initStyle: {},
      validateDate: false
    }
  },
  mounted() {
    this.left = this.leftInit
    this.right = this.rightInit
    this.bottom = this.bottomInit
    this.top = this.topInit
    this.validateDate = this.validateDateInit
    
    this.initStyle.top = this.top;
    this.initStyle.left = this.left;
    this.initStyle.right = this.right;
    this.initStyle.bottom = this.bottom;
    
    this.z = 10 // Pour la réactivité de la computed
  },
  watch: {
    validateDate() {
      this.$emit("validatePostIt", {
        left: this.left,
        top: this.top,
        bottom: this.bottom,
        right: this.right,
        title: this.title,
        content: this.content,
        date: this.date,
        id: this.id,
        validateDate: this.validateDate
      })
    }
  },
  methods: {
    onDrag() {
      this.initStyle = {}
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
        date: this.date,
        id: this.id,
        validateDate: this.validateDate
      });
      this.isDragging = false;
    }
  },
  computed: {
    shouldDisplayDate() {
      return this.date !== null;
    },
    displayDate() {
      if(this.date !== null) {
        return "RAPPEL: " + moment(this.date).format("DD.MM.YYYY")
      } else {
        return ""
      }
    },
    backgroundColor() {
      if(this.validateDate || this.date === undefined || this.date === null) {
        return "limegreen"
      } else {
        let date = moment(this.date)
        if(moment() > date) {
          return "red"
        } else {
          return "orange"
        }
      }
    },
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
      let obj = {
        position: 'absolute',
        'z-index': this.z,
        width: `${this.width}px`,
        height: `${this.height}px`,
        'background-color': this.backgroundColor,
        'color': this.fontColor,
        padding: '20px',
        'text-align': 'left',
      }

      return Object.assign(obj,this.initStyle);
    },
    titleStyle() {
      return {
        height: `${this.heightTitle}px`,
        'vertical-align': 'top',
        'font-weight':'bold'
      }
    },
    contentStyle() {
      return {
        height: `140px`,
        'vertical-align': 'top',
        'padding-top': '10px',
        'padding-bottom': '10px',
      }
    },
    dateStyle() {
      let style = {
        height: `${this.heightDate}px`,
        'text-align': 'end',
        'font-size': '14px'
      }

      if(this.validateDate) {
        style['text-decoration'] = "line-through"
      }

      return style;
    },
  }
};
</script>

<style scoped>
table, tr {
  width: 100%;
}
</style>
