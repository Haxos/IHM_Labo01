<template>
  <div>
  
    <PostIt
      v-for="postIt in postIts" :key="postIt.id"
      @postItDragStop="onDragStop"
      @postItDragStart="onDragStart"
      :title="postIt.title"
      :content="postIt.description"
      :date="postIt.date"
      :id="postIt.id"
      :leftInit="postIt.left"
      :rightInit="postIt.right"
      :bottomInit="postIt.bottom"
      :topInit="postIt.top"
    />
    <DeletePostIt 
      :post-it-dragged="postItDragged"
      :has-post-it-dragged="hasPostItDragged"
      :has-post-it-dropped="hasPostItDropped"
      :has-post-it-edited="hasPostItEdited"
      @deletePostIt="onDeletePostIt"
    />
    <EditPostIt
      :post-it-dragged="postItDragged"
      :has-post-it-dragged="hasPostItDragged"
      :has-post-it-dropped="hasPostItDropped"
      @postItIsBeingEdited="onPostItBeingEdited"
    />
    <AddPostIt 
      @postItAdded="onProcessPostIt"
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
    onProcessPostIt(el) {
      if(el.id !== null) {
        this.editPostIt(el)
      } else {
        this.addPostIt(el)
      }
    },
    editPostIt(el) {
      for(let i in this.postIts) {
        if(this.postIts[i].id == el.id) {
          this.postIts[i] = el;
        }
      }

      this.updateLocalStorage();
    },
    addPostIt(el) {
      let element = {}
      element.id = Math.floor(Math.random() * 100000)
      element.title = el.title
      element.content = el.content
      element.date = el.date
      element.left = 0
      element.right = 0
      element.top = 0
      element.bottom = 0
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
    onDeletePostIt(element) {
      for(let i in this.postIts) {
        if(this.postIts[i].id == element.id) {
          this.postIts.splice(i, 1);
        }
      }
      this.updateLocalStorage();
    },
    onDragStop(element) {
      this.hasPostItDragged = false
      this.postItDragged = element
      this.hasPostItDropped = true
      for(let i in this.postIts) {
        if(this.postIts[i].id == element.id) {
          this.postIts[i] = element;
        }
      }

      this.updateLocalStorage();
    }
  }
  
}
</script>
