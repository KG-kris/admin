<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" label-width="80px" :rules="rules" >
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" @change="changeFirst()">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" @change="changeSecondId">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in secondCateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="form.goodsid">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
  requestSeckillAdd,
  requestSeckillDetail,
  requestSeckillUpdate
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      menuList: "menu/list",
      cateList:"cate/list",
      secondList:"cate/secondList",
      goodsList:"goods/list"
    })
  },
  components: {},
  data() {
    return {
      time: [],
      form: {
        first_cateid: "",
        second_cateid: "",
        title: "",
        begintime: "",
        endtime: "",
        goodsid: "",
        status: 1
      },
      rulse : {
        title: [
          { required: true, message: "活动名不能为空", trigger: "blur" }
        ]
      },
      secondCateArr:[]
      
    };
  },
  methods: {
    ...mapActions({
      //一级分类
      requestCateList: "cate/requestList",
      requestGoodsList:"goods/requestList",
      requestSeckillList:"seckill/requestList"
    }),
    //修改一级分类
    changeFirst() {
       let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCateArr = this.cateList[index].children;
      if(!bool){
         this.form.second_cateid = "";
      }
    },
    //修改二级分类
    changeSecondId(){
      this.requestGoodsList({fid:this.form.first_cateid,sid:this.form.second_cateid})
    },
    //重置数据
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        title: "",
        begintime: "",
        endtime: "",
        goodsid: "",
        status: 1
      }
      this.time = [];
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
      this.form.begintime=new Date(this.time[0]).getTime()
      this.form.endtime=new Date(this.time[1]).getTime()
       if (this.form.title === "") {
        warningAlert("请输入活动名称");
        return;
      }
      requestSeckillAdd(this.form).then(res => {
        if (res.data.code == 200) {
          this.empty();
          this.cancel();
          successAlert("添加成功");
          this.requestSeckillList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取详情
    getDetail(id) {
      requestSeckillDetail({ id }).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        this.time=[new Date(parseFloat(this.form.begintime)),new Date(parseFloat(this.form.endtime))]
        this.requestCateList({ istree: true, pid: this.form.first_cateid });
        this.requestGoodsList({fid:this.form.first_cateid,sid:this.form.second_cateid})
      });
    },
    //修改
    update() {
     this.form.begintime=new Date(this.time[0]).getTime()
      this.form.endtime=new Date(this.time[1]).getTime()
      requestSeckillUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          this.empty();
          this.cancel();
          successAlert("更新成功");
          this.requestSeckillList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    if (this.cateList.length == 0) {
      this.requestCateList({ istree: true });
    }
  }
};
</script>
<style scoped>
</style>