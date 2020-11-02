<template>
  <div>
    <PostIt
      @postItDragStop="onDragStop"
      @postItDragStart="onDragStart"
    />
    <DeletePostIt 
      :post-it-dragged="postItDragged"
    />
    <EditPostIt
      :post-it-dragged="postItDragged"
    />
    <AddPostIt 
    />
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
  },

  data() {
    return {
      postItDragged: false
    }
  },
  methods: {
    onDragStart() {
      this.postItDragged = true
    },
    onDragStop() {
      this.postItDragged = false
    }
  }
  
}
</script>
