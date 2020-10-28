<<template>
  <div></div>
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
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      x: 0,
      y: 0,
      z: 0, // the lower, the further on the back it is
    }
  },
  computed: {
    fontColor() {
      // TODO: get opposiite saturation & value from color. 
      // Color between white and black
      return "White"
    }
  }
};
</script>
