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
      :has-post-it-dragged="hasPostItDragged"
      :has-post-it-dropped="hasPostItDropped"
      :has-post-it-edited="hasPostItEdited"
    />
    <EditPostIt
      :post-it-dragged="postItDragged"
      :has-post-it-dragged="hasPostItDragged"
      :has-post-it-dropped="hasPostItDropped"
      @postItIsBeingEdited="onPostItBeingEdited"
    />
    <AddPostIt 
      @postItAdded="addPostIt"
      :post-it-dragged="hasPostItDragged"
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
      hasPostItDragged: false,
      hasPostItDropped: false,
      hasPostItEdited: false,
      postItDragged: {}
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
    onPostItBeingEdited() {
      this.hasPostItEdited = true
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
    onDragStart(element) {
      this.hasPostItEdited = false
      this.hasPostItDropped = false
      this.hasPostItDragged = true
      this.postItDragged = element
    },
    onDragStop(element) {
      this.hasPostItDragged = false
      this.postItDragged = element
      this.hasPostItDropped = true
    }
  }
  
}
</script>
