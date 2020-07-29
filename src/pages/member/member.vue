<template>
  <div>
    <el-table :data="list" style="width: 100%" border>
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-update :info="info" ref="update"></v-update>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vUpdate from "./components/list";
export default {
  components: {
    vUpdate,
  },
  computed: {
    ...mapGetters({
      list: "member/list",
    }),
  },
  data() {
    return {
      info: {
        show: false,
        uid: null,
      },
    };
  },
  methods: {
    ...mapActions({
      requestList: "member/requestVipList",
    }),
    edit(id) {
      this.info.show = true;
      this.$refs.update.getDetail(id)
    },
  },
  mounted() {
    this.requestList();
  },
};
</script>
<style scoped>
</style>