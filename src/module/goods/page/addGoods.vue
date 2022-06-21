<template>
  <div>
  <el-tabs v-model="activeName">
    <el-tab-pane label="基本信息" name="first">

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品分类">
          <el-select @change="change1" v-model="form.goods.category1Id" placeholder="请选择一级分类">
            <el-option
              v-for="item in categories['1']"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="form.goods.category2Id" placeholder="请选择二级分类">
            <el-option
              v-for="item in categories['2']"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="form.goods.category3Id" placeholder="请选择三级分类">
            <el-option
              v-for="item in categories['3']"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

          模版ID：{{form.goods.typeTemplateId}}
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.goods.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select v-model="form.goods.brandId" placeholder="请选择品牌">
            <el-option
              v-for="item in brand"
              :key="item.id"
              :label="item.text"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="副标题">
          <el-input v-model="form.goods.caption"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.goods.price"></el-input>
        </el-form-item>
        <el-form-item label="商品简介">
          <el-input type="textarea" v-model="form.goodsDesc.introduction"></el-input>
        </el-form-item>
        <el-form-item label="包装列表">
          <el-input type="textarea" v-model="form.goodsDesc.packageList"></el-input>
        </el-form-item>
        <el-form-item label="售后服务">
          <el-input type="textarea" v-model="form.goodsDesc.saleService"></el-input>
        </el-form-item>
      </el-form>

    </el-tab-pane>
    <el-tab-pane label="商品图片" name="second">
      <el-button type="success" @click="openDialog">新建</el-button>
      <el-table
          :data="itemImages"
          border
          style="width: 100%">
        <el-table-column
          prop="color"
          label="颜色">
        </el-table-column>
        <el-table-column
          prop="url"
          label="图片">

          <template slot-scope="obj">
            <el-image
              style="width: 100px; height: 100px"
              :src="obj.row.url"
              fit="fill"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
          <template slot-scope="obj">
            <el-button type="danger" @click="removeImage(obj.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="上传商品图片"
        :visible.sync="dialogVisible"
        width="50%">

        <el-form ref="imageForm" :model="imageForm" label-width="80px">
          <el-form-item label="颜色">
            <el-input v-model="imageForm.color"></el-input>
          </el-form-item>
          <el-form-item label="商品图片">
            {{imageForm.url}}
            <el-upload
              class="avatar-uploader"
              action="/api/v1/files"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageForm.url!=''" :src="imageForm.url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveImage">确 定</el-button>
        </span>
      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="拓展属性" name="third">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item :label="item.text" v-for="item in customAttributeItems" :key="item.text">
          <el-input v-model="item.value"></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="商品规格" name="fourth">

      <el-form ref="form" :model="form" label-width="180px">
        <el-form-item v-for="item in spec" :key="item.id" :label="item.specName">
            <el-checkbox v-for="option in item.options" :key="option.id" :label="option.optionName" @change="selectOption(item.specName,option.optionName)"></el-checkbox>
        </el-form-item>
      </el-form>

      <el-table
        :data="sku"
        border
        style="width: 100%">

        <el-table-column
          v-for="item in specificationItems" :key="item.attributeName"
          :label="item.attributeName">

          <template slot-scope="obj">
            {{obj.row.spec[item.attributeName]}}
          </template>

        </el-table-column>




        <el-table-column
          label="价格">
          <template slot-scope="obj">
            <el-input v-model="obj.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="库存">
          <template slot-scope="obj">
            <el-input v-model="obj.row.num"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="是否启用">
          <template slot-scope="obj">
            <el-checkbox></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          label="是否默认">
          <template slot-scope="obj">
            <el-checkbox></el-checkbox>
          </template>
        </el-table-column>
      </el-table>

    </el-tab-pane>
  </el-tabs>
    <el-button type="primary" @click="save">保存</el-button>
  {{form}}
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      activeName: 'first',
      categories:{
        '1':[],
        '2':[],
        '3':[]
      },
      brand:[],
      spec:[],
      customAttributeItems:[],
      form:{
        'goods':{
          'goodsName':'',
          'caption':'',
          'price':0,
          'category1Id':null,
          'category2Id':null,
          'category3Id':null,
          'typeTemplateId':0,
          'brandId':null
        },
        'goodsDesc':{
          'introduction':'',
          'packageList':'',
          'saleService':'',
          'customAttributeItems':'',
          'itemImages':'',
          'specificationItems':''
        },
        'items':[

        ]
      },
      itemImages:[],
      dialogVisible:false,
      imageForm:{
      },
      specificationItems:[],
      sku:[]
    };
  },
  watch:{
    'form.goods.category2Id'(newVal,oldVal){
      this.form.goods.category3Id = null
      if(newVal==null){
        return;
      }
      this.query(newVal,"3")
    },
    'form.goods.category3Id'(newVal,oldVal){
      if(newVal==null){
        this.form.goods.typeTemplateId = 0;
      }else{
        axios.get("/api/v1/category/"+newVal).then((res)=>{
          var result = res.data;
          if(result.success){
            this.form.goods.typeTemplateId = result.data.typeId;
          }else{
            this.$message.warning(result.message)
          }
        });
      }
    },
    'form.goods.typeTemplateId'(newVal,oldVal){
        if(newVal==0){
          this.brand = []
          this.customAttributeItems = []
        }else{
          axios.get("/api/v1/templates/"+newVal).then((res)=>{
            var result = res.data;
            if(result.success){
              var template = result.data;
              this.brand = JSON.parse(template.brandIds)
              var spec = JSON.parse(template.specIds);
              for(var i in spec){
                var obj = spec[i];
                axios.get("/api/v1/specifications/"+obj.id).then((res)=>{
                  var result = res.data;
                  if(result.success){
                    this.spec.push(result.data);
                  }else{
                    this.$message.warning(result.message)
                  }
                })
              }
              this.customAttributeItems = JSON.parse(template.customAttributeItems)
            }else{
              this.$message.warning(result.message)
            }
          })
        }
    },
    'specificationItems':{
      deep:true,
      handler(){
        this.sku = [{'spec':{}}]
        //1、对用户勾选的所有种类的规格遍历，得到每一个规格
        for(var i in this.specificationItems){
          //{ "attributeName": "匹", "attributeValue": [ "1", "2" ] }
          var selectSpec = this.specificationItems[i];

          var newSku = [];
          //2、对选中的规格的每一个规格参数遍历，用每一个规格参数和sku[]做交叉
          for(var j in selectSpec.attributeValue){
            //得到每一个规格参数
            var option = selectSpec.attributeValue[j]
            //3、对之前的交叉结果sku[]遍历，用之前的每一个结果和每个规格参数，生成新对象
            for(var k in this.sku){
              var result = this.sku[k];
              //对原有的交叉结果result进行复制
              var newResult = JSON.parse(JSON.stringify(result));
              newResult.spec[selectSpec.attributeName] = option;
              newSku.push(newResult);
            }

          }
          this.sku = newSku;
        }

      }
    }

  },
  methods: {
    query(pid , arrayName){
      axios.get("/api/v1/categories/"+pid).then((res)=>{
        var result = res.data;
        if(result.success){
          this.categories[arrayName] = result.data
        }else{
          this.$message.warning(result.message)
        }
      })
    },
    change1(obj){
      this.query(obj,"2")
      this.form.goods.category2Id = null
      this.form.goods.category3Id = null
      this.categories["3"] = []
    },
    save(){
      this.form.goodsDesc.customAttributeItems = JSON.stringify(this.customAttributeItems)
      this.form.goodsDesc.itemImages =  JSON.stringify(this.itemImages);
      this.form.goodsDesc.specificationItems = JSON.stringify(this.specificationItems);

      var sku = JSON.parse(JSON.stringify(this.sku));
      for(var i in sku){
        var obj = sku[i];
        obj.spec = JSON.stringify(obj.spec)
      }
      this.form.items = sku;

      axios.post("/api/v1/goods",this.form).then((res)=>{
        var result = res.data;
        if(result.success){
          this.$message.success(result.message)
        }else{
          this.$message.warning(result.message)
        }
      })
    },
    openDialog(){
      this.imageForm = {
        'color':'',
        'url':''
      }
      this.dialogVisible = true
    },
    handleAvatarSuccess(res, file) {
      if(res.success){
        this.imageForm.url = res.data;
      }else{
        this.$message.warning(res.message)
      }
    },
    beforeAvatarUpload(file) {
      //const isJPG = file.type === 'image/jpeg';
      const isJPG = true
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    saveImage(){
      this.itemImages.push(this.imageForm);
      this.dialogVisible = false
    },
    removeImage(row){
      this.itemImages.splice(this.itemImages.indexOf(row),1);
    },
    selectOption(specName,optionName){
      var specExist  = false;
      for(var i in this.specificationItems){
        var specObj = this.specificationItems[i];
        if(specObj.attributeName==specName){
          //规格存在
          var specExist  = true;
          //判断用户勾选的选项是否存在

          var index = specObj.attributeValue.indexOf(optionName)
          if(index<0){
            //当前选中的规格参数不存在
            specObj.attributeValue.push(optionName);
          }else{
            //当前选中的规格参数存在
            specObj.attributeValue.splice(index,1);
            if(specObj.attributeValue.length==0){
              this.specificationItems.splice(i,1);
            }
          }
          return;
        }
      }

      if(!specExist){
        //规格不存在
        this.specificationItems.push({'attributeName':specName,'attributeValue':[optionName]})
      }
    }
  },
  created() {
    this.query(0,"1")
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
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
