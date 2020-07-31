<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" label-width="80px" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="图片" v-if="form.pid!=0">
          <el-upload
            class="avatar-uploader el-upload"
            :show-file-list="false"
            action="#"
            :on-change="changeImg"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  requestBannerAdd,
  requestBannerDetail,
  requestBannerUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  components: {},
  data() {
    return {
      imgUrl: "", //图片地址
      form: {
        title: "",
        img: null,
        status: 1,
      },
      rules: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions({
      requestBannerList: "banner/requestList",
    }),
    //处理图片
    changeImg(res, file) {
      this.imgUrl = URL.createObjectURL(res.raw);
      this.form.img = res.raw;
    },
    //重置数据
    empty() {
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
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
      var data = new FormData();
      for (var i in this.form) {
        data.append(i, this.form[i]);
      }
      if (this.form.title === "") {
        warningAlert("标题不能为空");
        return;
      }
      if (this.form.img === null) {
        warningAlert("请上传图片");
        return;
      }
      console.log(data);
      requestBannerAdd(data).then((res) => {
        if (res.data.code == 200) {
          this.empty();
          this.cancel();
          successAlert("添加成功");
          this.requestBannerList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取详情
    getDetail(id) {
      requestBannerDetail({ id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$imgPre + this.form.img;
      });
    },
    //修改
    update() {
      var data = new FormData();
      for (var i in this.form) {
        data.append(i, this.form[i]);
      }
      if (this.form.title === "") {
        warningAlert("标题不能为空");
        return;
      }
      if (this.form.img === null) {
        warningAlert("请上传图片");
        return;
      }
      requestBannerUpdate(data).then((res) => {
        if (res.data.code == 200) {
          this.empty();
          this.cancel();
          successAlert("更新成功");
          this.requestBannerList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.el-upload {
  border: 1px dashed #cccccc !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409eff !important;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>