<template>
  <div id="main_header" :style="{'--horizontal-padding': horizontalPadding}">
    <div id="left_menu">
      <img src="../../public/menu_line.svg" width="32" height="32" alt="">
      <span @click="$router.push('login')" style="cursor: pointer">
        <UserCard/>
      </span>
    </div>

    <ul id="right_button">
      <li>Article</li>
      <li>Video</li>
      <li>Picture</li>
    </ul>
    <div id="shadow"/>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard";

export default {
  name: "MainHeader",
  components: {UserCard},
  props: {
    horizontalPadding: {
      type: String,
      default: "64px"
    }
  }
}
</script>

<style scoped>
#main_header {
  --horizontal-padding: 64px;
  --header-height: 128px;

  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  padding: 0 var(--horizontal-padding);
  position: fixed;
  z-index: 2000;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: white;
  user-select: none;
  -webkit-user-select: none;
}

#shadow {
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  position: fixed;
  box-shadow: rgba(0, 0, 0, 0.8) 0 0 128px 64px;
}

#left_menu {
  width: fit-content;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

#right_button {
  font-family: "OFL Sorts Mill Goudy TT", serif;

  padding: 0;
  width: fit-content;
  list-style: none;

  display: flex;
  align-items: center;
  justify-content: space-around;
}

#right_button li {
  margin: 0 10px;
  padding: 0 10px;
  cursor: pointer;
  font-size: 20px;

  transition: all .2s ease-in-out;
}

#right_button li:hover {
  color: rgba(255, 255, 255, 0.3);
}
</style>