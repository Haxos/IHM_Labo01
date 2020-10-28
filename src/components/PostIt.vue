<template>
  <div :style="mainStyle">
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
  </div>
</template>

<script>
export default {
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
    date: {
      type: Date,
      default() {
        return new Date()
      }
    }
  },
  data() {
    return {
      x: 0,
      y: 0,
      z: 0, // the lower, the further on the back it is
      heightTitle: 30,
      heightDate: 30,
    }
  },
  computed: {
    fontColor() {
      // TODO: get opposiite saturation & value from color. 
      // Color between white and black
      return "White"
    },
    mainStyle() {
      return {
        left: `${this.x}px`,
        top: `${this.y}px`,
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
