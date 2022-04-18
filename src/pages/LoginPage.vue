<template>
  <div id="home_page">
    <div id="background-container">
      <div class="image-background" id="image-bg-1"></div>
      <div class="image-background" id="image-bg-2"></div>
    </div>
    <div id="horizontal-container">
      <br/>
      <form id="form-container">
        <div id="flex-container">
          <div id="vertical-container">
            <div id="user-info">
              <div id="avatar" :style="{backgroundImage: bindImage(userInfo.avatar)}"></div>
              <div id="info" :style="{width:expandWidth}">
                <h2 id="name" ref="name">{{ userInfo.name }}</h2>
                <h3 id="class" ref="class">{{ userInfo.class }}</h3>
              </div>
            </div>
            <label for="studentId">
              <input id="studentId" :class="{error:errorTips.studentIdError}"
                     @input="studentIdInput"
                     v-model="studentId"
                     type="text" autocomplete="off"
                     maxlength="13"
                     placeholder="学号">
            </label>
            <label for="phoneNum">
              <input id="phoneNum" :class="{error:errorTips.phoneNumError}"
                     @input="phoneNumInput" v-model="phoneNum"
                     type="text"
                     autocomplete="off"
                     maxlength="11"
                     placeholder="手机号码">
            </label>
            <label for="password">
              <input id="password" :class="{error:errorTips.passwordError}"
                     @input="passwordInput" v-model="password"
                     type="password" autocomplete="off"
                     maxlength="16"
                     placeholder="密码">
            </label>
            <input type="submit" value="登录" @click="preLogin">
          </div>
          <MainFooter min-height="64px" vertical-padding="32px" :background="'rgba(255, 255, 255, 0.3)'" color="white"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MainFooter from "@/components/MainFooter";
import DataSources from "../../DataSources";

export default {
  name: "LoginPage",
  components: {MainFooter},
  data() {
    return {
      studentId: null,
      phoneNum: null,
      password: null,
      userInfo: {
        name: null,
        class: null,
        avatar: null,
      },
      topShowing: true,
      topChanging: true,
      expandWidth: 0,
      errorTips: {
        studentIdError: false,
        phoneNumError: false,
        passwordError: false,
      },
      debounceStudentId: null,
      debouncePhoneNum: null,
      debouncePassword: null,
      debounceLogin: null,
      imageRandomBox: null
    }
  },
  methods: {
    preLogin() {
      this.initDebounce()
      let permit = true
      if (this.studentId === null || this.studentId.length < 13) {
        this.debounceStudentId.debounce()
        permit = false
      }
      if (this.phoneNum === null || this.phoneNum.length < 11) {
        this.debouncePhoneNum.debounce()
        permit = false
      }
      if (this.password === null || this.password.length < 6) {
        this.debouncePassword.debounce()
        permit = false
      }
      if (permit) {
        if (this.debounceLogin == null)
          this.debounceLogin = this.debounceBlackBox(this.login, null)
        this.debounceLogin.debounce()
      }
    },
    login() {
      fetch("https://localhost:8099/try_login", {
        method: "POST",
        mode: "cors",
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({"username": this.studentId, "password": this.password})
      }).then((response) => response.json())
          .then((json) => {
            if (json.data === true) {
              this.$router.push("/")
            } else {
              this.debounceStudentId.debounce()
              this.debouncePhoneNum.debounce()
              this.debouncePassword.debounce()
            }
          })
          .catch((error) => console.log(error))
    },
    studentIdInput() {
      let name = this.$refs.name
      let classes = this.$refs.class
      let id = parseInt(this.studentId)

      // 查找数据
      let result = DataSources.imageAccountImageMap[id]
      if (result === undefined || result == null)
        result = DataSources.imageAccountImageMap.nobody

      // 绑定数据
      this.userInfo = {
        name: result.name,
        class: result.class,
        avatar: result.avatar
      }

      // 获取 name 和 classes 二者之间的最大宽度
      setTimeout(() => {
        let width = Math.max(this.getActualWidth(name), this.getActualWidth(classes))
        this.expandWidth = width + "px"
      })

      this.password = null
      this.phoneNum = null
    },
    phoneNumInput() {
      if (this.studentId === null || this.studentId.length < 13) {
        this.initDebounce()
        this.phoneNum = null
        this.debounceStudentId.debounce()
      }
    },
    passwordInput() {
      if (this.phoneNum === null || this.phoneNum.length < 11) {
        this.initDebounce()
        this.password = null
        this.debouncePhoneNum.debounce()
      }
    },
    initDebounce() {
      if (this.debounceStudentId == null) this.debounceStudentId = this.debounceBlackBox(
          () => this.errorTips.studentIdError = true,
          () => this.errorTips.studentIdError = false)

      if (this.debouncePhoneNum == null) this.debouncePhoneNum = this.debounceBlackBox(
          () => this.errorTips.phoneNumError = true,
          () => this.errorTips.phoneNumError = false)

      if (this.debouncePassword == null) this.debouncePassword = this.debounceBlackBox(
          () => this.errorTips.passwordError = true,
          () => this.errorTips.passwordError = false)
    },
    getActualWidth(el) {
      if (parseInt(el.clientWidth) === 0) return 0
      let computedStyle = getComputedStyle(el, null);
      return parseInt(el.clientWidth) + parseInt(computedStyle.marginLeft) + parseInt(computedStyle.marginRight)
    },
    bindImage(image) {
      return image != null ? "url(/" + image + ")" : ""
    },
    debounceBlackBox(start, end, delay = 500) {
      let timer = null
      return {
        debounce: () => {
          timer == null && start instanceof Function ? start() : clearTimeout(timer)
          timer = setTimeout(() => {
            if (end instanceof Function) end()
            timer = null
          }, delay)
        },
      }
    },
    // animate() {
    //   setInterval(() => {
    //     this.topChanging = !this.topChanging
    //
    //     setTimeout(() => {
    //       this.topShowing = !this.topShowing
    //     }, 3500)
    //   }, 7000)
    // },
    // changeBG(flag) {
    //   if (flag) {
    //     return this.bindImage(this.initImageRandomBox().get())
    //   }
    // },
    initImageRandomBox() {
      if (this.imageRandomBox == null) {
        this.imageRandomBox = this.randomBlackBox(DataSources.imageSources)
      }
      return this.imageRandomBox
    },
    randomBlackBox(sources) {
      let index = 0
      let array = this.shuffle(sources)

      return {
        get: () => {
          if (index >= array.length) {
            this.shuffle(array)
            index = 0
          }
          return array[index++]
        },
      }
    },
    shuffle(arr) {
      arr.sort(() => 0.5 - Math.random())
      return arr
    }
  }
}
</script>

<style scoped>
#home_page {
  width: 100%;
}

#background-container {
  position: absolute;
  z-index: 20;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#horizontal-container {
  display: flex;
  justify-content: space-between;
}

.image-background {
  opacity: 1;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 5%;
  transform: scale(1.05);

  transition-property: opacity, transform, background-position;
  transition-timing-function: cubic-bezier(1, -1, 0, 1), cubic-bezier(1, -1, 0, 1), ease-in;
}

#image-bg-1 {
  background-image: url("../../public/書く読む少女_76862403.png");
}

#form-container {
  width: 100%;
  height: 100vh;
  max-width: 450px;
}

@media screen and (max-width: 550px) {
  #form-container {
    max-width: 100%;
  }
}

#flex-container {
  height: 100%;
  position: relative;
  z-index: 40;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}

#vertical-container {
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#user-info {
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all .2s ease-out;
}

#info {
  width: 0;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  color: white;
  font-weight: 900;
  letter-spacing: 2px;
  text-stroke: 1px rgba(0, 0, 0, 0.9);
  -webkit-text-stroke: 1px rgba(0, 0, 0, 0.9);

  transition: width .5s ease-out;
}


#info > * {
  width: fit-content;

  margin: 5px 30px !important;

  word-break: keep-all;
  white-space: nowrap;

  transition: all .2s ease-out;
}

#avatar {
  width: 120px;
  height: 120px;
  border-radius: 150px;

  background-image: url("../../public/user-smile-line.svg");
  background-size: cover;
  background-position: center;

  transition: all 0.5s ease-out;
}

#vertical-container > *:nth-child(1) {
  margin-bottom: 20px !important;
}

#vertical-container > *:nth-last-child(1) {
  margin-top: 20px !important;
}

#vertical-container input {
  height: 30px;
  min-width: 200px;
  padding: 5px 20px;
  margin: 10px 0;

  outline: none;
  border: none;
  border-radius: 5px;

  box-sizing: content-box;

  color: white;
  font-size: 20px;
  letter-spacing: 1px;
  background: rgba(255, 255, 255, 0.18);

  transition: all .2s ease-in-out;
}

#vertical-container input:focus {
  background: rgba(255, 255, 255, 0.18) !important;
}

#vertical-container input.error {
  background: rgba(255, 103, 103, 0.75) !important;
}

#vertical-container input::placeholder {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
}

#vertical-container input:placeholder-shown {
  background: rgba(0, 0, 0, 0.18);
}

#vertical-container input[type = 'submit'] {
  height: 50px;
  min-width: 100px;

  border-radius: 25px;

  font-size: 18px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.7);
  background: rgba(255, 255, 255, 0.3);

  transition: all .2s ease-in-out;
}

#vertical-container input[type = 'submit']:hover {
  border-radius: 10px;

  background: rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.7);
}

</style>