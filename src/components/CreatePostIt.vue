<template>
<div>
    <div class="create-postit-container">
        <b-form>
            <b-row>
                <b-form-group
                    label="Titre"
                >
                    <b-input-group>
                        <b-form-input class="form-control form-control-lg" type="text" id="title" name="title"/>
                    </b-input-group>
                </b-form-group>
            </b-row>
            <b-row>
                <b-form-group
                    label="Description"
                >
                    <b-input-group>
                        <b-textarea class="form-control form-control-lg" type="text" id="title" name="title"/>
                    </b-input-group>
                </b-form-group>
            </b-row>
            <b-row>
                <b-form-group
                    label="Date"
                >
                    <b-input-group>
                        <b-form-input class="form-control form-control-lg" type="date" id="title" name="title"/>
                    </b-input-group>
                </b-form-group>
            </b-row>  
        </b-form>
        <CancelButton 
            v-shortkey="['esc']"
            @shortkey="onCancel"
            @canceled="onCancel" />
        <ValidateButton/>
    </div>
</div>
</template>

<script>

import "../assets/main.scss"
import CancelButton from "./CancelButton"
import ValidateButton from "./ValidateButton"
export default {
    components: {
        CancelButton,
        ValidateButton
    },
    props: {
        
    },
    methods: {
        onCancel() {
            this.$emit("canceled");
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
