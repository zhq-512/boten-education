<template>
    <div>
      <div class="tools">
        <el-button type="success" @click="openDialog(null)">新建</el-button>
        <el-button type="danger" >删除</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          width="140">
        </el-table-column>
        <el-table-column
          prop="name"
          label="模版名称"
          width="140">
        </el-table-column>
        <el-table-column
          prop="brandIds"
          label="品牌">
          <template slot-scope="obj">
            {{transform(obj.row.brandIds)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="specIds"
          label="规格">
          <template slot-scope="obj">
            {{transform(obj.row.specIds)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="customAttributeItems"
          label="拓展属性">
          <template slot-scope="obj">
            {{transform(obj.row.customAttributeItems)}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="obj">
            <el-button type="warning" @click="openDialog(obj.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="type"
        :visible.sync="dialogVisible"
        width="50%">

        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="模版名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="关联品牌">
            <el-select v-model="brandIds" multiple placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in brands"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联规格">
            <el-select v-model="specIds" multiple placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in specifications"
                :key="item.id"
                :label="item.specName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="拓展属性">
            <el-button @click="addOption">新增拓展属性</el-button>
            <el-table
              :data="customAttributeItems"
              border
              style="width: 100%">
              <el-table-column
                  label="属性名称">
                <template slot-scope="obj">
                  <el-input v-model="obj.row.text"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="obj">
                    <el-button type="danger" @click="removeOption(obj.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>{{form}}
      </span>
      </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      type:"",
      form:{
        id: null,
        name:'',
        brandIds:'',
        specIds:'',
        customAttributeItems:''
      },
      brandIds:[],
      brands:[],
      brandMap:{},
      specIds:[],
      specifications:[],
      specificationMap:{},
      customAttributeItems:[{}]
    }
  },
  methods:{
    transform(param){
      var result = "";
      var array = JSON.parse(param);

      for(var i in array){
        var obj = array[i];
        result += ","+obj.text;
      }
      result = result.substring(1);
      return result;
    },
    openDialog(id){
      if(this.brands.length==0){
        axios.get("/api/v1/brands").then((res)=>{
          var result = res.data;
          if(result.success){
            this.brands = result.data;

            for(var i in this.brands){
              var obj = this.brands[i];
              this.brandMap[obj.id] = obj;
            }

          }else{
            this.$message.warning(result.message)
          }
        })
      }

      if(this.specifications.length==0){
        axios.get("/api/v1/specifications").then((res)=>{
          var result = res.data;
          if(result.success){
            this.specifications = result.data;

            for(var i in this.specifications){
              var obj = this.specifications[i];
              this.specificationMap[obj.id] = obj;
            }

          }else{
            this.$message.warning(result.message)
          }
        })
      }

      if(id==null){
        //新建
        this.type="新建模版"
        this.form = {
          name:'',
          brandIds:'',
          specIds:'',
          customAttributeItems:''
        }
        this.customAttributeItems = [{}]
      }else{
        //编辑
        this.type="编辑模版"
        axios.get("/api/v1/templates/"+id).then((res)=>{
          var result = res.data;
          if(result.success){
            var template = result.data;
            this.form.name = template.name;

            var brandIds = []
            var brandIds0 = JSON.parse(template.brandIds);
            for(var i in brandIds0){
              var obj = brandIds0[i];
              brandIds.push(obj.id);
            }
            this.brandIds = brandIds;

            var specIds = []
            var specIds0 = JSON.parse(template.specIds);
            for(var i in specIds0){
              var obj = specIds0[i];
              specIds.push(obj.id);
            }
            this.specIds = specIds;

            this.customAttributeItems = JSON.parse(template.customAttributeItems);

            this.form.id=template.id;

          }else{
            this.$message.warning(result.message)
          }
        });
      }

      this.dialogVisible=true
    },
    addOption(){
      this.customAttributeItems.push({});
    },
    removeOption(obj){
      if(this.customAttributeItems.length==1){
        this.$message.warning("至少保留一个规格参数")
        return ;
      }

      var index = this.customAttributeItems.indexOf(obj);
      this.customAttributeItems.splice(index,1);
    },
    save(){
      //处理品牌信息
      var brandIds = [];
      for(var i in this.brandIds){
        var id = this.brandIds[i];
        var brand = this.brandMap[id];
        brandIds.push({'id':brand.id,'text':brand.name});
      }
      this.form.brandIds  = JSON.stringify(brandIds)
      //处理规格信息
      var specIds = [];
      for(var i in this.specIds){
        var id = this.specIds[i];
        var spec = this.specificationMap[id];
        specIds.push({'id':spec.id,'text':spec.specName});
      }
      this.form.specIds  = JSON.stringify(specIds)
      //处理拓展属性
      this.form.customAttributeItems = JSON.stringify(this.customAttributeItems);

      axios.post("/api/v1/templates",this.form).then((res)=>{
        var result = res.data;
        if(result.success){
          this.$message.success("操作成功")
          this.dialogVisible = false
          this.query();
        }else{
          this.$message.warning(result.message)
        }
      });
    },
    query(){
      axios.get("/api/v1/templates").then((res)=>{
        var result = res.data;
        if(result.success){
          this.tableData = result.data;
        }else{
          this.$message.warning(result.message)
        }
      })
    }
  },
  created() {
    this.query();
  }
}
</script>

<style scoped>
  .tools{
    margin-bottom: 5px;
  }
</style>
