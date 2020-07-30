<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="createEditor">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" @change="changeFirstCateId()">
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in secondCateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="80px">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="80px">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品规格" label-width="80px">
          <el-select v-model="form.specsid" @change="changeSpecsId()">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="80px">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in attrsArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="80px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="80px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" label-width="80px">
          <div id="desc"></div>
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
  requestGoodsAdd,
  requestGoodsDetail,
  requestGoodsUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import E from "wangeditor";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      //分类的一级列表
      cateList: "cate/list",
      //规格列表
      specList: "spec/list",
    }),
  },
  data() {
    return {
      //编辑器对象
      editor:null,
      //二级分类的数组
      secondCateArr: [],
      //商品规格属性值
      attrsArr: [],
      //图片地址
      imageUrl: "",
      //提交给后端的数据
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
        description: "",
      },
    };
  },
  mounted() {
    if (this.cateList.length == 0) {
      this.requestCateList();
    }
    //获取所有的规格数据
    this.requestSpecList(true);
  },
  methods: {
    ...mapActions({
      //获取分类列表
      requestCateList: "cate/requestList",
      //获取规格列表
      requestSpecList: "spec/requestList",
      //获取商品总数
      requestGoodsCount:"goods/requestTotal",
       //获取商品列表
      requestGoodsList: "goods/requestList",
    }),

    //修改了一级分类
    changeFirstCateId(bool) {
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCateArr = this.cateList[index].children;
      //传了true,second_cateid就不置空；没传就置空
      if(!bool){
         this.form.second_cateid = "";
      }
     
    },
    //图片发生了修改
    changeImg(e) {
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },

    //商品规格发生了改变
    changeSpecsId(bool) {
      let index = this.specList.findIndex(
        (item) => item.id == this.form.specsid
      );

      this.attrsArr = this.specList[index].attrs;
      if(!bool){
        this.form.specsattr = [];
      }
      
    },
    //创建编辑器
    createEditor() {
      this.editor = new E("#desc");
      this.editor.create();
      this.editor.txt.html(this.form.description)
    },

    //置空
    empty() {
      //二级分类的数组
      this.secondCateArr= []
      //商品规格属性值
      this.attrsArr=[]
      //图片地址
      this.imageUrl= ""
      //提交给后端的数据
      this.form={
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
        description: "",
      }
      this.editor.txt.html('')

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
     
      this.form.description=this.editor.txt.html();
      this.form.specsattr=JSON.stringify(this.form.specsattr)

      //发起添加请求
      requestGoodsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //清空
          this.empty();
          //弹框消失
          this.cancel();
          // //重新获取角色列表数据
          this.requestGoodsCount();
          // //重新获取总的数量
          this.requestGoodsList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条数据
    getDetail(id) {
      //ajax
      requestGoodsDetail({ id: id }).then((res) => {
        // console.log(res.data)
        this.form=res.data.list;
        this.form.id=id;
        this.imageUrl=this.$imgPre+this.form.img;
        //根据一级分类计算出二级分类的数组
        this.changeFirstCateId(true)
        //根据商品规格计算出商品属性
        this.changeSpecsId(true)
        this.form.specsattr=JSON.parse(this.form.specsattr)
        
      });
    },
    //点击了修改
    update() {
       this.form.description=this.editor.txt.html();
      this.form.specsattr=JSON.stringify(this.form.specsattr)

      requestGoodsUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
};
</script>
<style scoped lang="stylus">
.add >>> .el-form-item__content {
  display: flex !important;
}

.add >>> .el-input {
  flex: 1;
}

.add >>> .el-button {
  width: auto;
}

// 穿透
.add >>> .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add >>> .el-upload:hover {
  border: 1px dashed #409eff !important;
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