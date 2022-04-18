<template>
  <div class="user_card">
    <div class="user_avatar"></div>
    <div class="user_infos">
      <p class="user_name">{{ username }}</p>
      <p class="user_intro">{{ userIntro }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    username: {
      type: String,
      default: "Somebody."
    },
    userIntro: {
      type: String,
      default: "Something."
    }
  }
}
</script>

<style scoped>
.user_card {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 20px;
}

.user_avatar {
  width: 64px;
  height: 64px;
  border-radius: 64px;

  background-image: url("../../public/五等分の花嫁_75034219.png");
  background-size: cover;
  background-position: center 40%;
}

.user_infos {
  font-family: "OFL Sorts Mill Goudy TT", serif;
  padding-left: 10px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
}

.user_infos > * {
  margin: 0;
}

.user_name {
  font-size: 16px;
}

.user_intro {
  font-size: 10px;
}
</style>