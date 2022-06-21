<template>
  <div>
    <el-button type="primary" round @click="toAdd()">添加</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="name" label="品牌名称" width="180"></el-table-column>
      <el-table-column prop="firstChar" label="首字母"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" round @click="toEdit(scope.row.id)">编辑</el-button>
          <el-button type="primary" round @click="toDelete(scope.row.id)">删除</el-button>
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
  methods:{
    toAdd:function (){
      this.$router.push("/goods/brand/add");
    },
    toEdit:function (id){
      this.$router.push("/goods/brand/upd?id="+id);
    },
    toDelete:function (id){
      this.$http.delete("/api/brand/brands/"+id).then((resp)=>{
        if(resp.data.code==20000){
          this.$message.success(resp.data.message);
          location.reload();
        }
      })
    }
  },
  created() {
    axios.get("/api/brand/brands").then((resp)=>{
      this.tableData=resp.data.data;
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
</style>
