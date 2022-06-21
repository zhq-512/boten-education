<template>
  <div>
    <div class="tools">
      <el-button type="primary" @click="openDialog()" plain>添加数据</el-button>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%">

      <el-table-column
        label="编号"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="名称"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.specName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="规格"
        width="600">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.optionName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="openDialog(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[1, 2, 4, 8]"
      :page-size="pageSize"
      layout="total,sizes, prev, pager, next,jumper"
      :total="total">
    </el-pagination>

    <el-dialog
      :title="type"
      :visible.sync="dialogVisible"
      width="50%">

      <el-form ref="form" :model="form" label-width="80px" hidden>
        <el-form-item label="编号" >
          <el-input v-model="form.id"></el-input>
        </el-form-item>
      </el-form>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specName"></el-input>
        </el-form-item>
      </el-form>

      <el-button type="success" @click="addOption()" plain>新增规格选项</el-button>

      <el-table
        :data="form.options"
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
            <el-button type="danger"
            @click="removeOption(obj)">
              删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
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
      pageSize:8,
      pageNum:1,
      total:0,
      dialogVisible:false,
      form:{
        options:[{}]
      }
    }
  },
  methods : {
    save:function (){
      axios.post('/api/v1/specifications',this.form).then(res=>{
        if(res.data.code==200){
          alert("成功")
          this.dialogVisible=false
        }else {
          alert(res.data.message)
        }
      })
    },
    openDialog:function (id){
      if(id==null){
        this.type="新建规格"
      }else {
        this.type="编辑规格"

        this.$http.get('/api/v1/specifications/'+id).then(res=>{
          if(res.data.code==200){
            if(res.data.code==200){
              this.form=res.data.data
            }else {
              alert(res.data.message)
            }
          }
        })
      }

      this.form={
        "options":[{}]
      }
      this.dialogVisible=true
    },
    removeOption:function (obj){
      if(this.form.options.length==1){
        this.$message.warning("至少保留一个规格参数")
        return ;
      }


      var index=this.form.options.indexOf(obj);
      this.form.options.splice(index,1);
    },
    addOption:function (){
      this.form.options.push({})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize=val
      this.$http.get('/api/v1/specifications/'+this.pageSize+'/'+this.pageNum).then(res=>{
        if(res.data.code==200){
          this.tableData=res.data.data.list
          this.total=res.data.data.total
        }else {
          alert(res.data.message)
        }
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum=val
      this.$http.get('/api/v1/specifications/'+this.pageSize+'/'+this.pageNum).then(res=>{
        if(res.data.code==200){
          this.tableData=res.data.data.list
          this.total=res.data.data.total
        }else {
          alert(res.data.message)
        }
      })
    },
  },
  created: function () {
    axios.get('/api/v1/specifications/'+this.pageSize+'/'+this.pageNum).then(res=>{
      if(res.data.code==200){
        this.tableData=res.data.data.list
        this.total=res.data.data.total
      }else {
        alert(res.data.message)
      }
    })
  }
}
</script>
<style scoped>
.head{
  margin-bottom: 10px;
}
.body{
  margin-bottom: 10px;
}
.tools{
  margin-bottom: 5px;
}
</style>
