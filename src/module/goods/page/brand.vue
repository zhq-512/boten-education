<template>
  <div>
    <div class="tools">
      <el-button type="success">新建</el-button>
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
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="品牌名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="firstChar"
        label="首字母">
      </el-table-column>
      <el-table-column
        width="180"
        label="操作">
        <template slot-scope="obj">
          <el-button type="warning" @click="openDialog(obj.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods : {

  },
  created: function () {
    axios.get("/api/v1/brands").then((res)=>{
      var result = res.data;
      if(result.success){
        this.tableData = result.data;
      }else{
        this.$message.warning(result.message)
      }
    })
  }
}
</script>
<style scoped>
.tools{
  margin-bottom: 5px;
}
</style>
