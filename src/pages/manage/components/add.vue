<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules">
        <el-form-item label="所属角色" label-width="80px">
          <el-select v-model="form.roleid">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in roleList" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  requestManageAdd,
  requestManageDetail,
  requestManageUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  data() {
    return {
      //提交给后端的数据
      form: {
        roleid: "",
        username: "",
        password:"",
        status: 1,
      },
     rules: {
        username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {
    if (this.roleList.length === 0) {
      this.requestRoleList();
    }
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/requestList",
      requestManageList:"manage/requestList",
      requestTotal:"manage/requestTotal"
    }),
    //置空
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password:"",
        status: 1,
      }
    },
    //取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //添加
    add() {
       if (this.form.username === "") {
        warningAlert("用户名不能为空");
        return;
      }
      if ( this.form.password === "") {
        warningAlert("密码不能为空");
        return;
      }
      //发起添加请求
      requestManageAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //清空
          this.empty();
          //弹框消失
          this.cancel();
          //重新获取角色列表数据
          this.requestManageList();
          //重新获取总的数量
          this.requestTotal()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条数据
    getDetail(id) {
      //ajax
      requestManageDetail({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password=""
      });
    },
    //点击了修改
    update() {
        if (this.form.username === "") {
        warningAlert("用户名不能为空");
        return;
      }
      if ( this.form.password === "") {
        warningAlert("密码不能为空");
        return;
      }
      requestManageUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.requestManageList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
};
</script>
<style scoped>
</style>