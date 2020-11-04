<template>
<div>
    <div class="create-postit-container">
        <b-form>
            <b-row>
                <b-form-group
                    label="Titre"
                >
                    <b-input-group>
                        <b-form-input v-model="data.title" class="form-control form-control-lg" type="text" id="title" name="title"/>
                    </b-input-group>
                </b-form-group>
            </b-row>
            <b-row>
                <b-form-group
                    label="Description"
                >
                    <b-input-group>
                        <b-textarea v-model="data.description" class="form-control form-control-lg" type="text" id="title" name="title"/>
                    </b-input-group>
                </b-form-group>
            </b-row>
            <b-row>
                <b-form-group
                    label="Date"
                >
                    <b-input-group>
                        <b-form-input v-model="data.date" class="form-control form-control-lg" type="date" id="title" name="title"/>
                    </b-input-group>
                </b-form-group>
            </b-row>  
        </b-form>
        <CancelButton 
            @canceled="onCancel" />
        <ValidateButton
            @validate="onValidate" />
    </div>
</div>
</template>

<script>

import "../assets/main.scss"
import CancelButton from "./CancelButton"
import ValidateButton from "./ValidateButton"
import moment from "moment"

export default {
    props: {
        postIt: {
            type: Object,
            required: false
        }
    },
    components: {
        CancelButton,
        ValidateButton
    },
    data() {
        return {
            data: {
                title: "",
                description: "",
                date: moment.now(),
                id: null,
                left: 0,
                right: 0,
                bottom: 0,
                top: 0
            }
        }
    },
    mounted() {
        if(this.postIt !== undefined) {
            this.updateDataFromPostIt(this.postIt)
        }
    },
    watch: {
        postIt(newVal) {
            if(newVal) {
                this.updateDataFromPostIt(newVal)
            }
        }
    },
    methods: {
        updateDataFromPostIt(postIt) {
                this.data.title = postIt.title;
                this.data.description = postIt.content;
                this.data.date = moment(postIt.date).format("YYYY-MM-DD");
                this.data.id = postIt.id
                this.data.left = postIt.left
                this.data.right = postIt.right
                this.data.top = postIt.top
                this.data.bottom = postIt.bottom
        },
        onCancel() {
            this.$emit("canceled");
        },
        onValidate() {
            if(this.data.date != undefined) {
                this.data.date = moment(this.data.date)
            }
            this.$emit("validate",this.data);
        }
    },
    computed: {

    }
};
</script>
