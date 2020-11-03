<template>
<div>
    <div @click="onClick" class="rounded-zone validate-button">
        <img class="icon-zone" src="../assets/check.png">
    </div>
</div>
</template>

<script>

import "../assets/main.scss"
export default {
  props: {
  },
  methods: {
    onClick() {
      this.$emit("validate");
    }
  },
  data() {
    return {

    }
  },
  computed: {

  }
};
</script>
