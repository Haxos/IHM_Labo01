<template>
  <div>
    <div class="create-postit-container">
      <b-form>
        <b-row>
          <b-form-group label="Titre">
            <b-input-group>
              <b-form-input
                v-model="data.title"
                class="form-control form-control-lg"
                type="text"
                name="title"
              />
            </b-input-group>
          </b-form-group>
        </b-row>
        <b-row>
          <b-form-group label="Description">
            <b-input-group>
              <b-textarea
                v-model="data.content"
                class="form-control form-control-lg"
                type="text"
                name="content"
              />
            </b-input-group>
          </b-form-group>
        </b-row>
        <b-row>
          <b-checkbox v-model="displayDate" class="checkbox-remainder" :value="true">Définir une date de rappel</b-checkbox>
        </b-row>
        <b-row v-if="displayDate">
          <b-form-group label="Date">
            <b-input-group>
              <b-form-input
                v-model="data.date"
                class="form-control form-control-lg"
                type="date"
                name="date"
              />
            </b-input-group>
          </b-form-group>
        </b-row>
      </b-form>
      <CancelButton @canceled="onCancel" />
      <ValidateButton @validate="onValidate" />
    </div>
  </div>
</template>

<script>
import "../assets/main.scss";
import CancelButton from "./CancelButton";
import ValidateButton from "./ValidateButton";
import moment from "moment";

export default {
  props: {
    postIt: {
      type: Object,
      required: false,
    },
  },
  components: {
    CancelButton,
    ValidateButton,
  },
  data() {
    return {
      displayDate: false,
      data: {
        title: "",
        content: "",
        date: null,
        id: null,
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      },
    };
  },
  mounted() {
    if (this.postIt !== undefined) {
      this.updateDataFromPostIt(this.postIt);
    }
  },
  watch: {
    displayDate(newVal) {
      if(!newVal) {
        this.data.date = null
      }
    },
    postIt(newVal) {
      if (newVal) {
        this.updateDataFromPostIt(newVal);
      }
    },
  },
  methods: {
    updateDataFromPostIt(postIt) {
      this.data.title = postIt.title;
      this.data.content = postIt.content;
      if(postIt.date !== null) {
        this.displayDate = true
        this.data.date = moment(postIt.date).format("YYYY-MM-DD");
      } else {
        this.displayDate = false;
        this.data.date = null
      }
      this.data.id = postIt.id;
      this.data.left = postIt.left;
      this.data.right = postIt.right;
      this.data.top = postIt.top;
      this.data.bottom = postIt.bottom;
      this.data.validateDate = false
    },
    onCancel() {
      this.$emit("canceled");
    },
    onValidate() {
      if (this.data.date != undefined) {
        this.data.date = moment(this.data.date);
      }
      this.$emit("validate", this.data);
    },
  },
  computed: {},
};
</script>
