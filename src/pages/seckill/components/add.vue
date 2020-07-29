<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="80px">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="80px">
          <el-date-picker
            v-model="arr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :change="change(arr)"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="getFirstCate">
            <el-option label="---请选择---" disabled value></el-option>
            <el-option
              v-for="item in classifylist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid" placeholder="请选择" @change="getPro">
            <el-option label="---请选择---" disabled value></el-option>
            <el-option
              v-for="item in cateChildren"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="80px">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option label="---请选择---" disabled value></el-option>
            <el-option
              v-for="item in goods"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  requestActivityAdd,
  requestActivityDetail,
  requestActivityUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      classifylist: "cate/list",
      prolist: "goods/list",
      list: "seckill/list",
    }),
  },
  data() {
    return {
      arr: [],
      cateChildren: [],
      goods: [],
      form: {
        title: "",
        begintime: null,
        endtime: null,
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestCateList: "cate/requestCateList",
      requestGoodsList: "goods/requestGoodsList",
      requestList: "seckill/requestActivityList",
    }),
    empty() {
      this.form = {
        title: "",
        begintime: null,
        endtime: null,
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.arr = [];
      this.cateChildren = [];
      this.goods = [];
    },
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    change(arr) {
      this.form.begintime = new Date(arr[0]).getTime();
      this.form.endtime = new Date(arr[1]).getTime();
    },
    //获取二级分类
    getFirstCate(id) {
      this.classifylist.forEach((item) => {
        if (item.id == id) {
          this.cateChildren = item.children;
        }
      });
    },
    //获取商品
    getPro() {
      this.prolist.forEach((item) => {
        if (
          item.first_cateid == this.form.first_cateid &&
          item.second_cateid == this.form.second_cateid
        ) {
          this.goods.push(item);
        }
      });
    },
    add() {
      requestActivityAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getDetail(id) {
      requestActivityDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.$set(this.arr, 0, new Date(Number.parseInt(this.form.begintime)));
        this.$set(this.arr, 1, new Date(Number.parseInt(this.form.endtime)));
      });
    },
    update() {
      this.form.begintime = new Date(this.arr[0]).getTime();
      this.form.endtime = new Date(this.arr[1]).getTime();
      requestActivityUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.classifylist.length == 0) {
      this.requestCateList();
    }
    if (this.prolist.length == 0) {
      this.requestGoodsList();
    }
  },
};
</script>
<style scoped>
</style>