<template>
  <div class="picture_item" :style="{
    backgroundImage: 'url(' + src + ')',
    width: width,
    height: height,
    backgroundSize: backgroundSize,
    backgroundPosition: offsetHorizontal + ' ' + offsetVertical
  }"/>
</template>

<script>
export default {
  name: "PictureItem",
  props: {
    src: {
      type: String,
      default: "./SUMMER_TIME_76134052.png"
    },
    width: {
      type: String,
      default: "100px"
    },
    height: {
      type: String,
      default: "100px"
    },
    offsetVertical: {
      type: String,
      default: "center"
    },
    offsetHorizontal: {
      type: String,
      default: "center"
    },
    backgroundSize: {
      type: String,
      default: "cover"
    }
  }
}
</script>

<style scoped>
.picture_item {
  flex-shrink: 0;
  flex-grow: 0;
}
</style>