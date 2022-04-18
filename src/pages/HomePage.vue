<template>
  <div id="home" :style="{'--horizontal-padding': horizontalPadding}">
    <MainHeader :horizontal-padding="horizontalPadding"/>
    <div id="part_1">
      <PictureItem src="./書く読む少女_76862403.png" width="100%" height="50vh" offset-vertical="15%"/>
      <FloatTitle class="main_title" font-size="64px" offset-left="128px" offset-top="calc(50vh - 145px)">
        五等分的<br/>花嫁
      </FloatTitle>
      <div id="part_1_flexbox">
        <div id="part_1_flexbox_text">
          <TextItem font-family="'OFL Sorts Mill Goudy TT', serif" overflow="visible">
            "Furthermore, one should not forget that the structure of the skills represents basic principles of The
            Organization of Drastic Ambience"
          </TextItem>
          <TextItem font-family="霞鹜文楷, serif" font-size="18px" font-weight="bold">
            简介：一直过着贫困生活的高中二年级学生·上杉风太郎，找到了一份条件非常好的家庭教师兼职。
            然而，要教导的学生居然是同级生！而且还是五胞胎！！虽然都是美少女，但同时也是“将要留级”、
            “讨厌学习”的问题学生们！最开始的任务就是要取得这些女孩们的信任……！？
            每天都热闹喧嚣中野家的五姐妹所带来的可爱度500%的五个不一样的恋爱喜剧，就此开幕！！
          </TextItem>
        </div>
        <ScrollSelector margin-left="20px">
          <picture-item v-for="pic of pictureList" width="30vh" height="30vh" :src="pic" :key="pic"/>
        </ScrollSelector>
      </div>
      <div id="part_2">
        test
      </div>
      <div id="part_3">
        test
      </div>
      <MainFooter :horizontal-padding="horizontalPadding"/>
    </div>
  </div>
</template>

<script>
import MainFooter from "@/components/MainFooter";
import TextItem from "@/components/item/TextItem";
import PictureItem from "@/components/item/PictureItem";
import FloatTitle from "@/components/FloatTitle";
import ScrollSelector from "@/components/ScrollSelector";
import MainHeader from "@/components/MainHeader";

export default {
  name: "HomePage",
  components: {MainFooter, TextItem, PictureItem, FloatTitle, ScrollSelector, MainHeader},
  data() {
    return {
      horizontalPadding: "128px",
      pictureList: [
        "./20210630121954Aicy.png",
        "./20210630122105Aicy.png",
        "./20210630122127Aicy.png",
        "./20210630122434Aicy.png",
        "./20210630122504Aicy.png",
        "./SUMMER_TIME_76134052.png",
        "./五等分の花嫁_75034219.png",
      ],
    }
  }
}
</script>

<style scoped>
#home {
  --horizontal-padding: 64px;
}

#part_1_flexbox {
  height: 50vh;
  width: 100%;
  padding: 0 var(--horizontal-padding);

  display: flex;
  align-items: center;
  justify-content: space-between;
}

#part_1_flexbox_text {
  height: 100%;
  overflow: hidden;
  padding: 40px 0;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
}

#part_1_flexbox_text > *:nth-child(1) {
  margin-bottom: 20px;
}

#part_2 {
  width: 100%;
  height: 100vh;
  background-color: #EDEDED;;
}

#part_3 {
  width: 100%;
  height: 100vh;
}
</style>