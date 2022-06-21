<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="品牌名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="首字母">
        <el-input v-model="form.firstChar"></el-input>
      </el-form-item>
      <el-button type="primary" round @click="addBrand()">添加</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
name: "add",
  data(){
    return{
      form:{
        name:'',
        firstChar:''
      }
    }
  },
  methods:{
    addBrand:function (){
      this.$http.post("/api/brand/brands",this.form).then((resp)=>{
        if(resp.data.code==20000){
          this.$message.success(resp.data.message);
          this.$router.push("/goods/brand/list");
        }else{
          this.$message.success(resp.data.message);
          this.form={};
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
