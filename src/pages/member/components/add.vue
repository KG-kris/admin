<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" label-width="80px" :rules="rules">
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input v-model="form.password" clearable show-password></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            active-color="#13ce66"
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="!info.isEdit">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  requestMemberDetail,
  requestMemberUpdate
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      menuList: "menu/list"
    })
  },
  components: {},
  data() {
    return {
      form: {
        phone: "",
        nickname: "",
        password: "",
        status: 1
      },
      rules: {
        nickname: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions({
      requestMemberList: "member/requestList"
    }),
    //重置数据
    empty() {
      this.form = {
        phone: "",
        nickname: "",
        password: "",
        status: 1
      };
    },
    //取消
    cancel() {
      this.info.show = false;
      if (this.info.isEdit) {
        this.empty();
      }
    },
    //添加
    add() {
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");

      requestRoleAdd(this.form).then(res => {
        if (res.data.code == 200) {
          this.empty();
          this.cancel();
          successAlert("添加成功");
          this.requestRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取详情
    getDetail(id) {
      requestMemberDetail({ uid: id }).then(res => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    //修改
    update() {
      if (this.form.password === "") {
        warningAlert("密码不能为空");
        return;
      }
      requestMemberUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          this.empty();
          this.cancel();
          successAlert("更新成功");
          this.requestMemberList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>