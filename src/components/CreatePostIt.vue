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
    components: {
        CancelButton,
        ValidateButton
    },
    data() {
        return {
            data: {
                title: "",
                description: "",
                date: moment.now()
            }
        }
    },
    methods: {
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
