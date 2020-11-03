<template>
  <div>
  
    <PostIt
      v-for="postIt in postIts" :key="postIt.id"
      @postItDragStop="onDragStop"
      @postItDragStart="onDragStart"
      :title="postIt.title"
      :content="postIt.description"
      :date="postIt.date"
      :x="postIt.x"
      :y="postIt.y"
    />
    <DeletePostIt 
      :post-it-dragged="postItDragged"
    />
    <EditPostIt
      :post-it-dragged="postItDragged"
    />
    <AddPostIt 
      @postItAdded="addPostIt"
      :post-it-dragged="postItDragged"
    />
  </div>
</template>

<script>
import PostIt from './PostIt.vue'
import DeletePostIt from './DeletePostIt'
import EditPostIt from './EditPostIt'
import AddPostIt from './AddPostIt'
import "../assets/main.scss"
import moment from "moment"

export default {
  components: {
    PostIt,
    DeletePostIt,
    EditPostIt,
    AddPostIt
  },

  data() {
    return {
      postIts : [],
      postItDragged: false
    }
  },
  mounted() {
    if(localStorage.postIts) {
      let res = JSON.parse(localStorage.postIts)
      this.postIts = res.map(value => {
        return {
          ...value,
          date: moment(value.date)
        }
      })
    }
  },
  methods: {
    eraseAllPostIt() {
      localStorage.postIts = ""
    },
    addPostIt(el) {
      let element = {}
      element.title = el.title
      element.content = el.content
      element.date = el.date
      element.x = 0
      element.y = 0
      this.postIts.push(element)
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      localStorage.postIts = "";
      localStorage.postIts = JSON.stringify(this.postIts)
    },
    onDragStart() {
      this.postItDragged = true
    },
    onDragStop() {
      this.postItDragged = false
    }
  }
  
}
</script>
