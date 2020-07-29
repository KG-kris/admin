<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column label="规格属性" width="180">
         <template slot-scope="scope">
           <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->

    <el-pagination background layout="prev, pager, next" @current-change="cPage" :page-size="size" :total="total"></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { requestSpecDelete } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "spec/list",
      total:"spec/total",
       size:"spec/size"
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "spec/requestList",
      requestTotal:"spec/requestTotal",
      changePage:"spec/changePage"
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    //删除
    del(id) {
      requestSpecDelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          
          this.requestList();
          this.requestTotal()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改页码
    cPage(a){
        this.changePage(a)
        this.requestList()
    }
  },
  mounted() {
      this.requestTotal();
    this.requestList();
  },
};
</script>
<style scoped>
</style>