<template>
  <div id="main_footer" :style="{
    '--horizontal-padding': horizontalPadding,
    '--vertical-padding': verticalPadding,
    minHeight: minHeight,
    background: background,
    color: color
  }">
    <h4>{{ title }}</h4>
    <transition name="fade">
      <p v-if="hitokoto !== null && hitokoto !== ''">{{ hitokoto }}</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MainFooter",
  props: {
    horizontalPadding: {
      type: String,
      default: "64px"
    },
    verticalPadding: {
      type: String,
      default: "64px"
    },
    title: {
      type: String,
      default: "Lalilu"
    },
    minHeight: {
      type: String,
      default: "200px"
    },
    background: {
      type: String,
      default: "#F4F4F4"
    },
    color: {
      type: String,
      default: "black"
    }
  },
  data() {
    return {
      hitokoto: null
    }
  },
  created() {
    this.getHitokoto()
  },
  methods: {
    getHitokoto() {
      fetch("https://international.v1.hitokoto.cn?c=a&encode=json")
          .then((data) => data.json())
          .then((response) => this.hitokoto = (response.hitokoto + "   —— 《" + response.from + "》"))
          .catch((error) => console.log(error))
    }
  }
}
</script>

<style scoped>
#main_footer {
  box-sizing: border-box !important;
  --horizontal-padding: 64px;
  --vertical-padding: 64px;

  width: 100%;
  min-height: 200px;
  padding: var(--vertical-padding) var(--horizontal-padding);

  display: flex;
  flex-direction: column;
}

#main_footer h4 {
  margin: 0;

  font-family: "OFL Sorts Mill Goudy TT", serif;
  letter-spacing: 2px;
  font-size: 36px;
}

#main_footer p {
  margin-top: 10px;

  font-size: small;
  font-family: 霞鹜文楷, serif;
}

</style>