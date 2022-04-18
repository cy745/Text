<template>
  <div id="float_title" :style="{'--font-size': fontSize,'--offset-left': offsetLeft,'--offset-top': offsetTop}">
    <span><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: "FloatTitle",
  props: {
    fontSize: {
      type: String,
      default: "32px"
    },
    offsetTop: {
      type: String,
      default: "0px"
    },
    offsetLeft: {
      type: String,
      default: "0px"
    }
  }
}
</script>

<style scoped>
#float_title {
  --font-size: 32px;
  --offset-top: 0px;
  --offset-left: 0px;

  top: var(--offset-top);
  left: var(--offset-left);
  position: absolute;
  z-index: 100;
}

#float_title > span {
  line-height: 96px;
  font-size: var(--font-size);
  font-family: "Yu Mincho Demibold", serif;
}
</style>