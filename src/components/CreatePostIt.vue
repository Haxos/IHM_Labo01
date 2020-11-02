<template>
<div>
    <div class="create-postit-container">
        <form>
            <input type="text" id="title" name="title">
            <label for="title">Titre</label>
        </form>
        <CancelButton @canceled="onCancel" />
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
