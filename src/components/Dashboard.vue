<template>
  <div>
    <PostIt/>
    <DeletePostIt/>
    <EditPostIt/>
    <AddPostIt/>
  </div>
</template>

<script>
import PostIt from './PostIt.vue'
import DeletePostIt from './DeletePostIt'
import EditPostIt from './EditPostIt'
import AddPostIt from './AddPostIt'
import "../assets/main.scss"

export default {
  components: {
    PostIt,
    DeletePostIt,
    EditPostIt,
    AddPostIt
  }
  
}
</script>
