<template>
<div>
    <div class="rounded-zone add-postit-zone">
      <img src="../assets/plus.png" class="icon-add">
      <div class="text-add-postit-zone">
        {{ textPostIt }}
      </div>
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
      textPostIt: "Cliquer pour ajouter une tâche"
    }
  },
  computed: {

  }
};
</script>
