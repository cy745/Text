<template>
  <div id="scroll_container" :class="{vertical:vertical,startMask:startMask,endMask:endMask}"
       :style="{width:width,marginLeft:marginLeft}"
       ref="scrollContainer">
    <div id="scroll_selector" :style="{'--transformX': smoothScrollOffsetX,'--transformY': smoothScrollOffsetY}"
         ref="scrollSelector">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollSelector",
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    startMask: {
      type: Boolean,
      default: true
    },
    endMask: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: "50%"
    },
    marginLeft: {
      type: String,
      default: "0px"
    }
  },
  data() {
    return {
      downX: 0,
      downY: 0,
      scrollOffsetX: 0,
      scrollOffsetY: 0,
      smoothScrollOffsetX: 0,
      smoothScrollOffsetY: 0,

      containerNode: null,
      contentNode: null,
    }
  },
  created() {
    setTimeout(() => {
      this.containerNode = this.$refs.scrollContainer
      this.contentNode = this.$refs.scrollSelector

      this.containerNode.addEventListener("mouseenter", (ev) => {
        ev.target.addEventListener("mousemove", this.movingScroller)
      })
      this.containerNode.addEventListener("mouseleave", (ev) => {
        ev.target.removeEventListener("mousemove", this.movingScroller)
      })
      this.containerNode.addEventListener("touchstart", (ev) => {
        this.downX = ev.touches[0].clientX
        this.downY = ev.touches[0].clientY
        ev.target.addEventListener("touchmove", this.touchMoveScroller)
      })
      this.containerNode.addEventListener("touchend", (ev) => {
        ev.target.removeEventListener("touchmove", this.touchMoveScroller)
      })
      this.scrollRecycle()
    })
  },
  methods: {
    touchMoveScroller(ev) {
      let clientWidth = this.contentNode?.clientWidth
      let clientHeight = this.contentNode?.clientHeight
      let scrollWidth = this.contentNode?.scrollWidth
      let scrollHeight = this.contentNode?.scrollHeight

      let movementX = this.downX - ev.touches[0].clientX
      let movementY = this.downY - ev.touches[0].clientY

      this.scrollOffsetX = this.clamp(0, scrollWidth - clientWidth, this.scrollOffsetX + movementX * 2)
      this.scrollOffsetY = this.clamp(0, scrollHeight - clientHeight, this.scrollOffsetY + movementY * 2)
      this.downX = ev.touches[0].clientX
      this.downY = ev.touches[0].clientY
      ev.preventDefault()
    },
    movingScroller(ev) {
      let clientWidth = this.contentNode?.clientWidth
      let clientHeight = this.contentNode?.clientHeight
      let scrollWidth = this.contentNode?.scrollWidth
      let scrollHeight = this.contentNode?.scrollHeight

      let x = ev.clientX - this.containerNode?.offsetLeft
      let y = ev.clientY - this.containerNode?.offsetTop

      let xPercent = this.clamp(0, 1, (x / clientWidth - 0.5) / 0.6 + 0.5)
      let yPercent = this.clamp(0, 1, (y / clientHeight - 0.5) / 0.6 + 0.5)

      this.scrollOffsetX = (scrollWidth - clientWidth) * xPercent
      this.scrollOffsetY = (scrollHeight - clientHeight) * yPercent
      ev.preventDefault()
    },
    scrollRecycle() {
      this.smoothScrollOffsetX = this.smoothScrollOffsetX + (this.scrollOffsetX - this.smoothScrollOffsetX) * 0.1
      this.smoothScrollOffsetY = this.smoothScrollOffsetY + (this.scrollOffsetY - this.smoothScrollOffsetY) * 0.1

      window?.requestAnimationFrame(this.scrollRecycle)
    },
    clamp(min, max, value) {
      return Math.max(min, Math.min(max, value))
    }
  }
}
</script>

<style scoped>
#scroll_container {
  --linear-gradient-width: 48px;

  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

#scroll_selector {
  --transformX: 0;
  --transformY: 0;

  display: flex;
  overflow: visible;
  flex-direction: row;
  position: relative;

  transform: translateX(calc(var(--transformX) * -1px)) translateY(calc(var(--transformY) * -1px));
}

#scroll_selector > * {
  margin-right: 20px;
}

#scroll_selector > *:nth-child(1) {
  margin-left: 40px;
}

#scroll_selector > *:nth-last-child(1) {
  margin-right: 40px;
}

#scroll_container.startMask::before {
  content: "";
  top: 0;
  left: 0;
  width: 0;
  z-index: 10;
  height: 100%;
  position: absolute;
  pointer-events: none;

  box-shadow: white 0 0 var(--linear-gradient-width) var(--linear-gradient-width);
}

#scroll_container.endMask::after {
  content: "";
  right: 0;
  bottom: 0;
  width: 0;
  z-index: 10;
  height: 100%;
  position: absolute;
  pointer-events: none;

  box-shadow: white 0 0 var(--linear-gradient-width) var(--linear-gradient-width);
}

#scroll_container.vertical {
  width: fit-content;
  height: 70vh;
}

#scroll_container.vertical::before {
  width: 100%;
  height: 0;
}

#scroll_container.vertical::after {
  width: 100%;
  height: 0;
}

.vertical #scroll_selector {
  height: 100%;
  flex-direction: column;
}

.vertical #scroll_selector > * {
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 20px;
}

.vertical #scroll_selector > *:nth-child(1) {
  margin-top: 40px;
}

.vertical #scroll_selector > *:nth-last-child(1) {
  margin-bottom: 40px;
}
</style>