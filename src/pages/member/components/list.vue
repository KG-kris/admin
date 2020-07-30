<template>
  <div>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status=='1'" type="success">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {requestRoleDelete} from "../../../util/request"
import {successAlert,warningAlert} from "../../../util/alert"
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      //获取角色列表
      requestList: "member/requestList"
    }),
    //删除
    del(id){
      requestRoleDelete({id}).then(res=>{
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
      list: "member/list"
    })
  }
};
</script>
<style scoped>
</style>