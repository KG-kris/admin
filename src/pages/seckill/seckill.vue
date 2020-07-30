<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>

    <!-- 添加 -->
    <v-add :info="info" ref="add"></v-add>

    <!-- 列表 -->
    <v-list @edit='edit($event)'></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList
  },
  data() {
    return {
      //添加弹框的信息
      info: {
        show: false,//是否展示
        isEdit: false,//是否是编辑
        title: "添加秒杀",//title
      }
    };
  },
  methods:{
    //添加
    add(){
      this.info.show=true;
      this.info.title="添加秒杀"
      this.info.isEdit=false
    },
    //编辑
    edit(id){
      this.info.show=true;
      this.info.title="编辑秒杀";
      this.info.isEdit=true
      this.$refs.add.getDetail(id)
    }

  }
};
</script>

<style scoped>
</style>