<template>
    <div
        @dragstart="onDragStart"
    ></div>

</template>


<script>

export default {
    props: {
        editorMouseDown: {
            type: Boolean,
            default: false,
        }
    },
    setup() {
        
    },
    methods: {
        onDragStart() {
            return false;
        }
        
    }
    
}
</script>


