<template>
<div>
    <div class="rounded-zone cancel-button" @click="onClick">
        <img class="icon-zone" src="../assets/cancel.png">
    </div>
</div>
</template>

<script>

import "../assets/main.scss"
export default {
  props: {
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
      onClick() {
          this.$emit("canceled");
      }
  }
};
</script>
