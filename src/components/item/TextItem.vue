<template>
  <div class="text_item" :style="{
    fontSize:fontSize,
    fontWeight:fontWeight,
    minWidth:minWidth,
    maxWidth:maxWidth,
    minHeight:minHeight,
    maxHeight:maxHeight,
    fontFamily:fontFamily,
    overflow:overflow
  }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TextItem",
  props: {
    fontSize: {
      type: String,
      default: "14px"
    },
    fontWeight: {
      type: String,
      default: "normal"
    },
    minWidth: {
      type: String,
      default: "0px"
    },
    maxWidth: {
      type: String,
      default: "auto"
    },
    minHeight: {
      type: String,
      default: "auto"
    },
    maxHeight: {
      type: String,
      default: "auto"
    },
    fontFamily: {
      type: String,
      default: ""
    },
    overflow: {
      type: String,
      default: "hidden"
    }
  }
}
</script>

<style scoped>
.text_item {
  overflow: hidden;
}
</style>