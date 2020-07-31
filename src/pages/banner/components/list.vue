<template>
  <div>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="title" label="轮播图标题" width="180"></el-table-column>
       <el-table-column label="图片" width="180">
         <template slot-scope="scope">
         <img :src="$imgPre+scope.row.img" alt="">
        </template>
       </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status=='1'" type="success">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
           <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {requestBannerDelete} from "../../../util/request"
import {successAlert,warningAlert} from "../../../util/alert"
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      //获取角色列表
      requestList: "banner/requestList"
    }),
    //删除
    del(id){
      requestBannerDelete({id}).then(res=>{
        if(res.data.code==200){
          successAlert(res.data.msg)
          this.requestList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    },
    //编辑
    edit(id){
      this.$emit("edit",id)
    }
  },
  mounted() {
    this.requestList();
  },
  computed: {
    ...mapGetters({
      list: "banner/list"
    })
  }
};
</script>
<style scoped>
img{
  width: 80px;
  height: 80px;
}
</style>