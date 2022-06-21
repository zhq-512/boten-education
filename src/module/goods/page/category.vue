<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item><span @click="view(null)">顶级分类</span></el-breadcrumb-item>
      <el-breadcrumb-item v-for="obj in parents" :key="obj.id">
        <span @click="view(obj)">{{obj.name}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
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
        label="分类编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名称">
      </el-table-column>
      <el-table-column
        prop="typeId"
        label="模版名称">
        <template slot-scope="obj">
          {{templateMap[obj.row.typeId].name}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="obj">
          <el-button type="info" @click="view(obj.row)" v-if="parents.length<2">查看下级</el-button>
          <el-button type="warning" @click="openDialog(obj.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="type"
      :visible.sync="dialogVisible"
      width="50%">

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 12px; margin-left: 20px">
            <el-breadcrumb-item v-for="obj in parents" :key="obj.id">
              {{obj.name}}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型模版">
          <el-select v-model="form.typeId" placeholder="请选择">
            <el-option
              v-for="item in templates"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>


      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
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
      pid:0,
      templates:[],
      templateMap:{},
      parents:[],
      dialogVisible:false,
      form:{
        parentId:0
      },
      type:''
    }
  },
  methods:{
    async query(){
      if(this.templates.length==0){
        await axios.get("/api/v1/templates").then((res) => {
          var result = res.data;
          if (result.success) {
            this.templates = result.data;
            for (var i in this.templates) {
              var template = this.templates[i];
              this.templateMap[template.id] = template;
            }
          } else {
            this.$message.warning(result.message)
          }
        })
      }

      await axios.get("/api/v1/categories/"+this.pid).then((res)=>{
        var result = res.data;
        if(result.success){
          this.tableData = result.data;
        }else{
          this.$message.warning(result.message)
        }
      })
    },
    view(row){
      if(row==null){
        //返回顶级
        this.pid = 0;
        this.parents = [];
      }else {
        this.pid = row.id;
        var index = this.parents.indexOf(row)
        if(index==0){
          this.parents.splice(index+1,1)
        }else if(index<0){
          this.parents.push(row);
        }else{
          return ;
        }

      }
      this.query();
    },
    openDialog(id){
      if(id==null){
        //新增
        this.type="新增类型"
        this.form = {
          parentId:0
        }

      }else {
        //修改
        this.type ="编辑类型"
        axios.get("/api/v1/category/"+id).then((res)=>{
          var result = res.data;
          if(result.success){
            this.form = result.data;
          }else{
            this.$message.warning(result.message)
          }
        });
      }
      this.dialogVisible = true
    },
    save(){
      if(this.parents.length==0){
        this.form.parentId = 0
      }else{
        var parent = this.parents[this.parents.length-1];
        this.form.parentId = parent.id
      }


      axios.post("/api/v1/categories",this.form).then((res)=>{
        var result = res.data;
        if(result.success){
          this.$message.success("操作成功！")
          this.dialogVisible = false
          this.query()
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
