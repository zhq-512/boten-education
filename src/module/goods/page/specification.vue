<template>
  <div>
    <div class="tools">
      <el-button type="success" @click="openDialog(null)">新建</el-button>
      <el-button type="danger" @click="remove">删除</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="specName"
        label="规格名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="optionNames"
        label="规格名称">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="obj">
          <el-button type="warning" @click="openDialog(obj.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-on:current-change="change"
      background
      :page-size="size"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>

    <el-dialog
      :title="type"
      :visible.sync="dialogVisible"
      width="50%">

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specName"></el-input>
        </el-form-item>

        <el-button @click="addOption">新增规格选项</el-button>

        <el-table
          :data="form.options"
          border
          style="width: 100%">
          <el-table-column
            label="规格选项">
            <template slot-scope="obj">
              <el-input v-model="obj.row.optionName"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="排序">
            <template slot-scope="obj">
              <el-input v-model="obj.row.orders"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="obj">
              <el-button type="danger" @click="removeOption(obj.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

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
      total:0,
      page:1,
      size:7,
      dialogVisible:false,
      form:{
        options:[{}]
      },
      type:"",
      selection:[]
    }
  },
  methods:{
    change(page){
      this.page = page;
      this.query()
    },
    query(){
      axios.get("/api/v1/specifications/"+this.page+"/"+this.size).then((res)=>{
        var result = res.data;
        if(result.success){
          var pageResult = result.data;
          this.tableData = pageResult.list;
          this.total = pageResult.total;
        }else{
          this.$message.warning(result.message)
        }
      })
    },
    addOption(){
      this.form.options.push({});
    },
    removeOption(obj){
      if(this.form.options.length==1){
        this.$message.warning("至少保留一个规格参数")
        return ;
      }

      var index = this.form.options.indexOf(obj);
      this.form.options.splice(index,1);
    },
    openDialog(id){
      if(id==null){
        //新建
        this.type="新建规格"

        this.form = {
          "options":[{}]
        }
      }else{
        //编辑
        this.type="编辑规格"

        axios.get("/api/v1/specifications/"+id).then((res)=>{
          var result = res.data;
          if(result.success){
            this.form = result.data;
          }else{
            this.$message.warning(result.message)
          }
        })

      }

      this.dialogVisible=true
    },
    save(){
      axios.post("/api/v1/specifications",this.form).then((res)=>{
        var result = res.data;
        if(result.success){
          this.$message.success("操作成功")
          this.dialogVisible = false
          this.query();
        }else{
          this.$message.warning(result.message)
        }
      })
    },
    handleSelectionChange(val) {
      this.selection = val
    },
    remove(){
      if(this.selection.length==0){
        this.$message.warning("至少勾选一条数据")
        return;
      }

      var ids = [];
      for(var i in this.selection){
        var obj = this.selection[i];
        ids.push(obj.id);
      }
      axios.delete("/api/v1/specifications/delete",{data:ids}).then((res)=>{
        var result = res.data;
        if(result.success){
          this.$message.success("删除规格成功")
          this.query();
        }else{
          this.$message.warning(result.message)
        }
      })

    }
  },
  created() {
    this.query()
  }
}
</script>

<style scoped>
  .tools{
    margin-bottom: 5px;
  }
</style>
